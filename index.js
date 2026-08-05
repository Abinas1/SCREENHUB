const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');
env.config();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/home', (req,res) => {
    console.log('Hitting /home route');
    return res.json({
        sucess: true,
        message : 'Fetched Sucessfully'
    })
});

async function startServer() {

    try{
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();