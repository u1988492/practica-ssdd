// Configuracion para el cliente de la REST API 
const config = {
    // Url por defecto (actualizarla con la IP de la VM)
    defaultServerUrl: 'http://192.168.56.103:3000',
    
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