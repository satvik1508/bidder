require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connect');
const routes = require('./routes/userRoute');
const itemRoute = require('./routes/itemRoute');
const getItems = require('./routes/getItem');
const bidRoute = require('./routes/bidRoute');
const socketIo = require('socket.io'); 
const http = require('http')

const server = http.createServer(app);
const io = socketIo(server , {
    cors: {
        origin: "http://localhost:5173"

    }
})

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/v1', routes)
app.use('/api/v1', itemRoute)
app.use('/api/v1', getItems)
app.use('/api/v1', bidRoute)

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const port = 3000;

io.on('connection' , (socket) => {
    console.log('NEw connection');

    socket.on('disconnect', () => {
        console.log('User disconnected')
    });

    socket.on('newBid', (data) => {
        console.log(`Received newBid event with data:`, data);
        console.log(`New bid placed: ${data.bidAmount} on item ${data.productName}`);
        // Emit the event to notify all connected admins
        io.emit('newBid', data);
    });
});




const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL)
        server.listen(port,() => console.log(`server is listening on port ${port}`));
    } catch (error) {
        console.log(error)
    }
}

start();