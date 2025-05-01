// Logica de la aplicacion principal para el cliente de la REST AP
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar los elementos de la UI 
    const serverUrlInput = document.getElementById('serverUrl');
    const testConnectionButton = document.getElementById('testConnection');
    const connectionStatus = document.getElementById('connectionStatus');
    const refreshUsersButton = document.getElementById('refreshUsers');
    const userListElement = document.getElementById('userList');
    const userForm = document.getElementById('userForm');
    const userIdInput = document.getElementById('userId');
    const userNameInput = document.getElementById('userName');
    const userRoleInput = document.getElementById('userRole');
    const saveUserButton = document.getElementById('saveUser');
    const clearFormButton = document.getElementById('clearForm');
    const operationXInput = document.getElementById('operationX');
    const operationSelect = document.getElementById('operation');
    const operationYInput = document.getElementById('operationY');
    const calculateButton = document.getElementById('calculate');
    const calculationResult = document.getElementById('calculationResult');
    const clearLogButton = document.getElementById('clearLog');

    // Preparar URL inicial del servidor desde config 
    serverUrlInput.value = apiClient.getBaseUrl();

    // Probar la conexion
    testConnectionButton.addEventListener('click', async () => {
        // Actualizar cliente de API con la URL actual del servidor 
        apiClient.setBaseUrl(serverUrlInput.value);
        
        try {
            const connectionSuccessful = await apiClient.testConnection();
            
            if (connectionSuccessful) {
                connectionStatus.textContent = 'Conectado';
                connectionStatus.className = 'connected';
                // Cargar datos iniciales
                loadUsers();
            } else {
                connectionStatus.textContent = 'Fallo la conexion';
                connectionStatus.className = 'disconnected';
            }
        } catch (error) {
            connectionStatus.textContent = 'Fallo la conexion';
            connectionStatus.className = 'disconnected';
            console.error('Error de test de conexion:', error);
        }
    });

    // Cargar y mostrar usuarios
    async function loadUsers() {
        try {
            const users = await apiClient.getAllUsers();
            displayUsers(users);
        } catch (error) {
            console.error('Error cargando usuarios:', error);
        }
    }

    // Mostrar usuarios en la UI 
    function displayUsers(users) {
        userListElement.innerHTML = '';
        
        if (users.length === 0) {
            userListElement.innerHTML = '<p>No se han encontrado usuarios.</p>';
            return;
        }
        
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <div class="user-info">
                    <h4>${user.name}</h4>
                    <p>Role: ${user.role}</p>
                    <p>ID: ${user.id}</p>
                </div>
                <div class="user-actions">
                    <button class="edit-user" data-id="${user.id}">Editar</button>
                    <button class="delete-user" data-id="${user.id}">Borrar</button>
                </div>
            `;
            
            userListElement.appendChild(userCard);
            
            // Add event listeners for edit and delete buttons
            userCard.querySelector('.edit-user').addEventListener('click', () => {
                loadUserForEditing(user.id);
            });
            
            userCard.querySelector('.delete-user').addEventListener('click', () => {
                deleteUser(user.id);
            });
        });
    }

    // Cargar un usuario para editarlo 
    async function loadUserForEditing(userId) {
        try {
            const user = await apiClient.getUserById(userId);
            
            // Popular forumlario con los datos del usuario 
            userIdInput.value = user.id;
            userNameInput.value = user.name;
            userRoleInput.value = user.role;
            
            // Actualizar el boton de guardado 
            saveUserButton.textContent = 'Actualizar usuario';
        } catch (error) {
            console.error('Error cargando la informacion del usuario para editar:', error);
        }
    }

    // Eliminar un usuario 
    async function deleteUser(userId) {
        if (confirm(`Estas seguro de que quieres eliminar al usuario con ID ${userId}?`)) {
            try {
                await apiClient.deleteUser(userId);
                loadUsers(); // Recargar la list de usuarios 
            } catch (error) {
                console.error('Error eliminando al usuario:', error);
            }
        }
    }

    // Borrar el formulario de usuario 
    function clearUserForm() {
        userForm.reset();
        userIdInput.value = '';
        saveUserButton.textContent = 'Guardar usuario';
    }

    // Event listeners
    refreshUsersButton.addEventListener('click', loadUsers);
    
    clearFormButton.addEventListener('click', clearUserForm);
    
    // Envio de formulario para crear/actualizar usuario
    userForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const userData = {
            name: userNameInput.value,
            role: userRoleInput.value
        };
        
        try {
            if (userIdInput.value) {
                // Actualizar usuario existente 
                await apiClient.updateUser(userIdInput.value, userData);
            } else {
                // Crear nuevo usuario
                await apiClient.createUser(userData);
            }
            
            // Borrar usuario del formulario y recargar usuarios 
            clearUserForm();
            loadUsers();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    });
    
    // Funcionalidad de calculadora 
    calculateButton.addEventListener('click', async () => {
        const x = operationXInput.value;
        const y = operationYInput.value;
        const operation = operationSelect.value;
        
        if (!x || !y) {
            calculationResult.textContent = 'Por favor introduce los valores de X e Y';
            return;
        }
        
        try {
            const result = await apiClient.calculate(operation, x, y);
            
            // Mostrar resultado
            calculationResult.textContent = `Resultado: ${result.result}`;
        } catch (error) {
            calculationResult.textContent = `Error: ${error.message}`;
            console.error('Error de calculo:', error);
        }
    });
    
    // Borrar boton de log
    clearLogButton.addEventListener('click', () => {
        apiClient.clearLog();
    });
    
    // Ejecutar test de conexion inicial
    testConnectionButton.click();
});