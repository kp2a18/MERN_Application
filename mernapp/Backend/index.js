/*const express = require('express')
const app = express()
const port = 5000
const mongoDB=require("./db")

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})*/


// index.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoDB = require('./db');
const cors = require('cors');

const app = express();
const port = 5000;

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow connections from this origin
    methods: ["GET", "POST"], // Allow specific methods
    allowedHeaders: ["Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"],
    credentials: true // Allow credentials
  }
});

// Use CORS middleware for Express
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());

// Connect to MongoDB
mongoDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData")(io));
app.use('/api', require("./Routes/reviews"));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




