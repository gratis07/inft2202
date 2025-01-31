import { movies } from './data/movies.js';

// Function to get pinned movies from local storage
function getPinnedMoviesFromStorage() {
    const pinnedMovies = localStorage.getItem("pinnedMovies");
    return pinnedMovies ? JSON.parse(pinnedMovies) : [];
}

// Function to save pinned movies to local storage
function savePinnedMoviesToStorage(pinnedMovies) {
    localStorage.setItem("pinnedMovies", JSON.stringify(pinnedMovies));
}

// Function to insert movies into a table
function insertMoviesIntoTable(eleTable, movies, isPinnedTable = false) {
    if (!eleTable) {
        console.error("Table element not found!");
        return;
    }

    const tbody = eleTable.querySelector('tbody');
    if (!tbody) {
        console.error("Tbody element not found!");
        return;
    }

    tbody.innerHTML = "";

    if (movies.length === 0) {
        console.log("No movies to display");
        return;
    }

    eleTable.classList.remove('d-none');

    movies.sort((a, b) => b.rating - a.rating);

    const pinnedMovies = getPinnedMoviesFromStorage();

    movies.forEach(movie => {
        const row = document.createElement("tr");

        // Set row background color based on rating
        row.style.backgroundColor = getColorByRating(movie.rating);

        // Insert cells for each attribute of the movie
        const titleCell = document.createElement("td");
        titleCell.textContent = movie.title;
        row.appendChild(titleCell);

        const genreCell = document.createElement("td");
        genreCell.textContent = movie.genre;
        row.appendChild(genreCell);

        const dateCell = document.createElement("td");
        const date = new Date(movie.datetime * 1000);
        dateCell.textContent = date.toLocaleDateString("en-US");
        row.appendChild(dateCell);

        const directorCell = document.createElement("td");
        directorCell.textContent = movie.director;
        row.appendChild(directorCell);

        const ratingCell = document.createElement("td");
        ratingCell.textContent = movie.rating;
        row.appendChild(ratingCell);

        // Create a button cell
        const buttonCell = document.createElement("td");
        const button = document.createElement("button");
        const icon = document.createElement("i");

        if (isPinnedTable) {
            // For the "Favourites" table, add a trash icon for removing
            icon.classList.add("fas", "fa-trash"); // Font Awesome trash icon
            button.appendChild(icon);
            button.classList.add("btn", "btn-danger");
            button.addEventListener("click", () => {
                const updatedPinnedMovies = pinnedMovies.filter(pinnedMovie => pinnedMovie.title !== movie.title);
                savePinnedMoviesToStorage(updatedPinnedMovies);
                location.reload();
            });
        } else {
            // For the "Movie Database" table, add a thumbtack icon for pinning
            const isPinned = pinnedMovies.some(pinnedMovie => pinnedMovie.title === movie.title);
            icon.classList.add("fas", "fa-thumbtack"); // Font Awesome thumbtack icon
            button.appendChild(icon);
            button.classList.add("btn", "btn-primary");
            button.disabled = isPinned; // Disable the button if the movie is already pinned
            button.addEventListener("click", () => {
                if (!isPinned) {
                    pinnedMovies.push(movie);
                    savePinnedMoviesToStorage(pinnedMovies);
                    location.reload();
                }
            });
        }

        buttonCell.appendChild(button);
        row.appendChild(buttonCell);
        tbody.appendChild(row);
    });
}

// Function to determine row color by rating
function getColorByRating(rating) {
    if (rating <= 2) return "#ff4d4d"; // Red
    if (rating > 2 && rating <= 5) return "#ffa500"; // Orange
    if (rating > 5 && rating <= 8) return "#4682b4"; // Blue
    return "#32cd32"; // Green
}

// Main execution
document.addEventListener("DOMContentLoaded", () => {
    const allMoviesTable = document.querySelector("#all-movies-container table");
    const pinnedMoviesTable = document.querySelector("#pinned-movies-container table");

    insertMoviesIntoTable(allMoviesTable, movies);

    const pinnedMovies = getPinnedMoviesFromStorage();
    console.log("Pinned movies:", pinnedMovies);

    insertMoviesIntoTable(pinnedMoviesTable, pinnedMovies, true);

    const pinnedMessage = document.querySelector("#pinned-movies-container .alert");
    pinnedMessage.classList.toggle("d-none", pinnedMovies.length !== 0);
});