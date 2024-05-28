document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "0d1b40070a5089b9dc46350c7832f42f";
    const apiUrl = "https://api.themoviedb.org/3";

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    const movieImage = document.getElementById("movie-image");
    const movieDescription = document.getElementById("movie-description");

    function fetchMovieDetails(movieId) {
        fetch(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(movie => {
                movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                movieDescription.innerHTML = `
                    <h2>${movie.title}</h2>
                    <p>${movie.overview}</p>
                `;

                movieImage.addEventListener("click", () => {
                    window.location.href = `https://www.youtube.com/results?search_query=${movie.title} trailer`;
                });

                movieImage.addEventListener("mouseover", () => {
                    // Optionally, you can implement a hover play effect if you have the trailer URL
                    // Example:
                    // movieImage.src = "trailer_url_here";
                });
            })
            .catch(error => console.error("Error fetching movie details:", error));
    }

    fetchMovieDetails(movieId);
});
