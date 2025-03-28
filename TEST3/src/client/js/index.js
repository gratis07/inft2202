async function fetchMovies(genre = null, rating = null) {
    try {
        let url = '/api/movies';
        const params = [];
        if (genre) params.push(`genre=${encodeURIComponent(genre)}`);
        if (rating) params.push(`rating=${encodeURIComponent(rating)}`);
        if (params.length) url += `?${params.join('&')}`;

        const response = await fetch(url);

        if (!response.ok) {
             Error(`There is no movie in the databsae that match the filter: ${response.statusText}`);
        }

        const movies = await response.json();
        console.log('Fetched movies:', movies); // Debug log to verify data
        return movies;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

function insertMoviesIntoTable(tableRef, movies) {
    const tbody = tableRef.querySelector('tbody');
    tbody.innerHTML = '';

    movies.forEach(movie => {
        const row = tbody.insertRow();

        const titleCell = row.insertCell(0);
        titleCell.textContent = movie.title;

        const genreCell = row.insertCell(1);
        genreCell.textContent = movie.genre;

        const releaseDateCell = row.insertCell(2);
        const releaseDate = new Date(movie.release_date * 1000);
        releaseDateCell.textContent = `${releaseDate.toLocaleDateString()} ${releaseDate.toLocaleTimeString()}`;

        const directorCell = row.insertCell(3);
        directorCell.textContent = movie.director;

        const ratingCell = row.insertCell(4);
        ratingCell.textContent = movie.rating;

        // Apply Bootstrap classes based on the rating
        if (movie.rating <= 2) {
            row.classList.add('table-danger');
            console.log(`Setting Bootstrap class table-danger for movie: ${movie.title}`);
        } else if (movie.rating > 2 && movie.rating <= 5) {
            row.classList.add('table-warning');
            console.log(`Setting Bootstrap class table-warning for movie: ${movie.title}`);
        } else if (movie.rating > 5 && movie.rating <= 8) {
            row.classList.add('table-info');
            console.log(`Setting Bootstrap class table-info for movie: ${movie.title}`);
        } else if (movie.rating > 8) {
            row.classList.add('table-success');
            console.log(`Setting Bootstrap class table-success for movie: ${movie.title}`);
        }
    });
}

function updateFooter() {
    const footer = document.querySelector('footer .text-body-secondary');
    const currentYear = new Date().getFullYear();
    footer.textContent = `Gratis Jacob - ${currentYear}`;
}

async function handleDropdownChange() {
    const genre = document.querySelector('#genre-selector').value;
    const rating = document.querySelector('#rating-selector').value;
    const table = document.querySelector('table');
    const errorMessage = document.querySelector('.alert');

    try {
        const movies = await fetchMovies(genre, rating);
        if (movies.length > 0) {
            insertMoviesIntoTable(table, movies);
            table.classList.remove('d-none');
            errorMessage.classList.add('d-none');
        } else {
            table.classList.add('d-none');
            errorMessage.classList.remove('d-none');
        }
    } catch (error) {
        table.classList.add('d-none');
        errorMessage.textContent = `Error: ${error.message}`;
        errorMessage.classList.remove('d-none');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#genre-selector').addEventListener('change', handleDropdownChange);
    document.querySelector('#rating-selector').addEventListener('change', handleDropdownChange);

    handleDropdownChange();
    updateFooter();
});
