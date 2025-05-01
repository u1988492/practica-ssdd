// Aplicación del servidor REST API 
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Activar CORS para comunicación client-server 
app.use(express.json()); // Analizar cuerpos de peticion JSON 

// Datos de ejemplo; en una aplicación real, se utilizaría una base de datos
const users = [
  { id: 1, name: 'Alicia', role: 'Admin' },
  { id: 2, name: 'Marcos', role: 'User' },
  { id: 3, name: 'Juan', role: 'User' }
];

// REST API endpoints
// GET - Obtener todos los usuarios
app.get('/api/users', (req, res) => {
  console.log('peticion GET recibida para todos los usuarios');
  res.json(users);
});

// GET - Obtener un usuario específico
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  console.log(`peticion GET request recibid para el usuario con ID: ${userId}`);
  
  const user = users.find(u => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

// POST - Crear un nuevo usuario
app.post('/api/users', (req, res) => {
  console.log('peticion POST recibida para crear un usuario');
  console.log('Cuerpo de peticion:', req.body);
  
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    role: req.body.role || 'User'
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - Actualizar un usuario
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  console.log(`peticion PUT request recibida para actualizar usuario con ID: ${userId}`);
  
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    const updatedUser = {
      id: userId,
      name: req.body.name || users[userIndex].name,
      role: req.body.role || users[userIndex].role
    };
    
    users[userIndex] = updatedUser;
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

// DELETE - Eliminar un usuario
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  console.log(`peticion DELETE recibida para usuario con ID: ${userId}`);
  
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    res.json(deletedUser);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

// Calcular endpoint - demuestra una llamada a una función
app.post('/api/calculate', (req, res) => {
  console.log('peticion POST recibida para calculo');
  console.log('Cuerpo de peticion:', req.body);
  
  const { operation, x, y } = req.body;
  let result;
  
  switch (operation) {
    case 'add':
      result = x + y;
      break;
    case 'subtract':
      result = x - y;
      break;
    case 'multiply':
      result = x * y;
      break;
    case 'divide':
      if (y === 0) {
        return res.status(400).json({ error: 'No se puede dividir por cero' });
      }
      result = x / y;
      break;
    default:
      return res.status(400).json({ error: 'Operacion invalida' });
  }
  
  res.json({
    operation,
    x,
    y,
    result
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('API endpoints available:');
  console.log(`  GET    http://localhost:${PORT}/api/users`);
  console.log(`  GET    http://localhost:${PORT}/api/users/:id`);
  console.log(`  POST   http://localhost:${PORT}/api/users`);
  console.log(`  PUT    http://localhost:${PORT}/api/users/:id`);
  console.log(`  DELETE http://localhost:${PORT}/api/users/:id`);
  console.log(`  POST   http://localhost:${PORT}/api/calculate`);
});