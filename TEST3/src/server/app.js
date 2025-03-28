import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import moviesData from './data/movies.js'; // Ensure this path is correct

const PORT = 3022;

// Initialize express server
const server = express();

// Middleware to parse JSON requests
server.use(express.json());

// Get the directory name from the module URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'client' directory
server.use(express.static(path.join(__dirname, '../client')));

// Serve static files from the 'node_modules' directory
server.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));

// Ignore the favicon request
server.get('/favicon.ico', (req, res) => res.status(204));

// Create a router instance
const router = express.Router();

// Route to serve the main HTML file
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Movies API endpoint
router.get('/api/movies', (req, res) => {
    let { rating, genre } = req.query;
    let filteredMovies = [...moviesData];

    // Filter by rating if the 'rating' parameter exists
    if (rating) {
        const parsedRating = parseFloat(rating);
        if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 10) {
            return res.status(400).json({ error: 'Rating must be a number between 1 and 10.' });
        }
        filteredMovies = filteredMovies.filter(movie => movie.rating >= parsedRating);
    }

    // Filter by genre if the 'genre' parameter exists
    if (genre) {
        const lowerCaseGenre = genre.toLowerCase();
        filteredMovies = filteredMovies.filter(movie => movie.genre.toLowerCase() === lowerCaseGenre);
        if (filteredMovies.length === 0) {
            return res.status(404).json({ error: `No movies found in the ${genre} genre.` });
        }
    }

    // Sort the movies by rating in descending order
    filteredMovies.sort((a, b) => b.rating - a.rating);

    // Log the filtered movies
    console.log('Filtered Movies:', filteredMovies);

    // Return the filtered (or full) list of movies as JSON
    res.json(filteredMovies);
});

// Use the router
server.use(router);

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
