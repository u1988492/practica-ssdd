// cliente API para hacer las llamadas REST al servidor 
class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl || config.defaultServerUrl;
        this.logEntries = [];
    }

    // Guardar la URL base para las llamadas a la API 
    setBaseUrl(url) {
        this.baseUrl = url;
    }

    // Obtener URL base 
    getBaseUrl() {
        return this.baseUrl;
    }

    // Hacer petición HTTP a la API
    async request(method, endpoint, data = null) {
        const url = `${this.baseUrl}${endpoint}`;
        const startTime = new Date();
        
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }
        
        try {
            // Guardar la petición
            this.logApiCall(method, url, data);
            
            // Hacer la petición
            const response = await fetch(url, options);
            
            // Analizar la respuesta JSON
            const responseData = await response.json();
            
            // Comprobar si la petición ha sido exitosa
            if (!response.ok) {
                throw new Error(responseData.message || 'Ha fallado la petición a la API');
            }
            
            return responseData;
        } catch (error) {
            this.logApiError(method, url, error.message);
            throw error;
        }
    }

    // Guardar una llamada a la API en la consola y el array de log
    logApiCall(method, url, data) {
        const logEntry = {
            time: new Date(),
            method: method,
            url: url,
            data: data,
            type: 'request'
        };
        
        this.logEntries.push(logEntry);
        console.log(`API ${method} Request:`, url, data || '');
        
        // Mostrar en la UI del log
        this.updateLogDisplay();
    }

    // Loggear error de la API
    logApiError(method, url, errorMessage) {
        const logEntry = {
            time: new Date(),
            method: method,
            url: url,
            error: errorMessage,
            type: 'error'
        };
        
        this.logEntries.push(logEntry);
        console.error(`API Error (${method} ${url}):`, errorMessage);
        
        // Mostrar en la UI del log
        this.updateLogDisplay();
    }

    // Actualizar el display del log en la UI
    updateLogDisplay() {
        const logContainer = document.getElementById('apiLog');
        if (!logContainer) return;
        
        // Borrar el container del log
        logContainer.innerHTML = '';
        
        // Agregar entradas del log en orden cronológico inverso 
        for (let i = this.logEntries.length - 1; i >= 0; i--) {
            const entry = this.logEntries[i];
            const logEntry = document.createElement('div');
            logEntry.className = `log-entry ${entry.type}`;
            
            // Formato de tiempo
            const time = entry.time.toLocaleTimeString();
            
            // Crear el mensaje del log basado en el tipo de entrada
            if (entry.type === 'request') {
                logEntry.innerHTML = `
                    <span class="log-time">${time}</span>
                    <span class="log-method ${entry.method.toLowerCase()}">${entry.method}</span>
                    <span class="log-url">${entry.url}</span>
                    ${entry.data ? `<div class="log-data">Data: ${JSON.stringify(entry.data)}</div>` : ''}
                `;
            } else if (entry.type === 'error') {
                logEntry.innerHTML = `
                    <span class="log-time">${time}</span>
                    <span class="log-method error">ERROR</span>
                    <span class="log-url">${entry.method} ${entry.url}</span>
                    <div class="log-error">Error: ${entry.error}</div>
                `;
            }
            
            logContainer.appendChild(logEntry);
        }
    }

    // Borrar el log
    clearLog() {
        this.logEntries = [];
        this.updateLogDisplay();
    }

    // Probar la conexion al servidor 
    async testConnection() {
        try {
            await this.getAllUsers();
            return true;
        } catch (error) {
            return false;
        }
    }

    // Metodos de usuario de la API
    async getAllUsers() {
        return this.request(config.methods.GET, config.endpoints.users);
    }

    async getUserById(userId) {
        return this.request(config.methods.GET, `${config.endpoints.users}/${userId}`);
    }

    async createUser(userData) {
        return this.request(config.methods.POST, config.endpoints.users, userData);
    }

    async updateUser(userId, userData) {
        return this.request(config.methods.PUT, `${config.endpoints.users}/${userId}`, userData);
    }

    async deleteUser(userId) {
        return this.request(config.methods.DELETE, `${config.endpoints.users}/${userId}`);
    }

    // Metodo de calculadora de la API
    async calculate(operation, x, y) {
        return this.request(config.methods.POST, config.endpoints.calculate, {
            operation: operation,
            x: Number(x),
            y: Number(y)
        });
    }
}

// Crear instancia global para el cliente de la API
const apiClient = new ApiClient(config.defaultServerUrl);