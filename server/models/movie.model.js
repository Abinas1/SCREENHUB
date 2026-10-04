const mongoose = require('mongoose');
/*Definition of the Movie schema resources will be stored in the database */

const movieSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    casts:{
        type: [String],
        required: true
    },
    trailerUrl:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true,
        default: 'English'
    },
    releaseDate:{
        type: Date,
        required: true
    },
    director:{
        type: String,
        required: true
    },
    releaseStatus:{
        type: String,
        required: true,
        default: "RELEASED"
    }
}, {timestamps: true});

const Movie = mongoose.model('Movie', movieSchema); // creates a movie model.

module.exports = Movie;