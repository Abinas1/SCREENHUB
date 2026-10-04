const axios = require('axios');
const env = require('dotenv');
env.config();
const importMovies  = async() => {
    try{
        const response = await axios.get(
            "https://api.themoviedb.org/3/discover/movie",
        {
            params: {language: "en_US",
                page: 1,
                sort_by : "popularity_desc"
            },
            headers : {
                Authorization: "Bearer ${process.env.TMDB_ACCESS_TOKEN"
            }
        })
        console.log(response.data.results);
    }
    catch(error){
        console.log(error);
    }
}

importMovies();