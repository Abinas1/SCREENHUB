const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');
const Movie = require('./models/movie.model');
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
        /*
        await Movie.create({
            name: 'Inception',
            description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
            casts: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
            trailerUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
            language: 'English',
            releaseDate: new Date('2010-07-16'),
            director: 'Christopher Nolan',
            releaseStatus: 'RELEASED'
        });
        */
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();