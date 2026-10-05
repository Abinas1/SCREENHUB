const axios = require('axios');
const env = require('dotenv');

const dns = require('dns');

env.config();

dns.setDefaultResultOrder('ipv4first');


const importMovies = async () => {
    try {
        const response = await axios.get(
            "https://api.themoviedb.org/3/discover/movie",
            {
                params: {
                    language: "en-US",
                    with_original_language: "hi",
                    primary_release_year: 2026,
                    page: 1,
                    sort_by: "popularity.desc"
                },
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
                }
            }
        );

        console.log(response.data.results);
    }
    catch (error) {
        console.log("Message:", error.message);
        console.log("Code:", error.code);
        console.log("Response:", error.response?.data);
        console.log("Status:", error.response?.status);
    }
};

importMovies();