// Configuracion para el cliente de la REST API 
const config = {
    // Url por defecto (actualizarla con la IP de la VM)
    defaultServerUrl: 'http://localhost:3000',
    
    // endpoints API 
    endpoints: {
        users: '/api/users',
        calculate: '/api/calculate'
    },
    
    // métodos HTTP
    methods: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
    }
};