const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(__dirname));

app.use(bodyParser.json()); // support json encoded bodies

var movies = [
    {
        "id": 1,
        "title": "The Shawshank Redemption",
        "year": 1994,
        "country": "United States",
        "rating": 9.3,
        "genres": [
            "Crime",
            "Drama"
        ]
    },
    {
        "id": 2,
        "title": "The Godfather",
        "year": 1972,
        "country": "United States",
        "rating": 9.2,
        "genres": [
            "Crime",
            "Drama"
        ]
    },
    {
        "id": 3,
        "title": "The Dark Knight",
        "year": 2008,
        "country": "United Kingdom",
        "rating": 9,
        "genres": [
            "Action",
            "Crime",
            "Drama",
            "Thriller"
        ]
    },
    {
        "id": 4,
        "title": "The Lord of the Rings: The Return of the King",
        "year": 2003,
        "country": "New Zealand",
        "rating": 8.9,
        "genres": [
            "Adventure",
            "Drama",
            "Fantasy"
        ]
    },
    {
        "id": 5,
        "title": "The Lion King",
        "year": 1994,
        "country": "United States",
        "rating": 8.5,
        "genres": [
            "Animation",
            "Adventure",
            "Drama"
        ]
    },
    {
        "id": 6,
        "title": "Raiders of the Lost Ark",
        "year": 1981,
        "country": "United States",
        "rating": 8.5,
        "genres": [
            "Action",
            "Adventure"
        ]
    }
];

// the "index" route, which serves the Angular app
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
});

// the GET "movies" API endpoint
app.get('/api/movies', function (req, res) {
    console.log(req.query);

    var foundedMovies = findMovies(req.query.searchPhrase);
    res.send(foundedMovies);
});

// POST endpoint for search in "movies"
app.post('/api/search', function (req, res) {
    console.log(req.body);

    var foundedMovies = findMovies(req.body.searchPhrase);
    res.send(foundedMovies);
});

function findMovies(searchPhrase) {
    if (searchPhrase == null) {
        return movies;
    }

    var foundedMovies = [];
    movies.forEach(movie => {
        if (movie.title.toLowerCase().includes(searchPhrase)) {
            foundedMovies.push(movie);
        }
    });
    return foundedMovies;
}

// HTTP listener
app.listen(3000, function () {
    console.log('Example listening on port 3000!');
});
module.exports = app;

