require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connect');
const routes = require('./routes/userRoute');
const itemRoute = require('./routes/itemRoute');

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/v1',routes)
app.use('/api/v1', itemRoute)

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const port = 3000;


const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,() => console.log(`server is listening on port ${port}`));
    } catch (error) {
        console.log(error)
    }
}

start();