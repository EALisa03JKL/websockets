const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200', // URL del frontend
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// API Endpoint
app.post('/api/message', (req, res) => {
  const { message } = req.body;
  
  // Verificar que message está definido
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  console.log(`Message received: ${message}`);

  // Emitir el mensaje a través de WebSocket
  io.emit('newMessage', message);

  // Enviar la respuesta HTTP al cliente
  res.status(200).json({ message: `Server received: ${message}` });
});

// WebSocket
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
