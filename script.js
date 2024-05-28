document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "0d1b40070a5089b9dc46350c7832f42f";
    const apiUrl = "https://api.themoviedb.org/3";
    let currentPage = 1;

    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const moviesGrid = document.getElementById("movies-grid");
    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");
    const currentPageSpan = document.getElementById("current-page");

    const loginButton = document.getElementById("login-button");
    const signupButton = document.getElementById("signup-button");
    const loginModal = document.getElementById("login-modal");
    const signupModal = document.getElementById("signup-modal");
    const loginClose = document.getElementById("login-close");
    const signupClose = document.getElementById("signup-close");
    const loginSubmit = document.getElementById("login-submit");
    const signupSubmit = document.getElementById("signup-submit");

    loginButton.addEventListener("click", () => {
        loginModal.style.display = "block";
    });

    signupButton.addEventListener("click", () => {
        signupModal.style.display = "block";
    });

    loginClose.addEventListener("click", () => {
        loginModal.style.display = "none";
    });

    signupClose.addEventListener("click", () => {
        signupModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = "none";
        }
        if (event.target === signupModal) {
            signupModal.style.display = "none";
        }
    });

    loginSubmit.addEventListener("click", () => {
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;
        if (username && password) {
            alert("Logged in as " + username);
            loginModal.style.display = "none";
        } else {
            alert("Please fill in all fields.");
        }
    });

    signupSubmit.addEventListener("click", () => {
        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;
        if (username && password) {
            alert("Signed up as " + username);
            signupModal.style.display = "none";
        } else {
            alert("Please fill in all fields.");
        }
    });

    searchButton.addEventListener("click", () => {
        const query = searchInput.value;
        if (query) {
            fetchMovies(query, currentPage);
        }
    });

    prevPageButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            const query = searchInput.value;
            if (query) {
                fetchMovies(query, currentPage);
            } else {
                fetchPopularMovies(currentPage);
            }
        }
    });

    nextPageButton.addEventListener("click", () => {
        currentPage++;
        const query = searchInput.value;
        if (query) {
            fetchMovies(query, currentPage);
        } else {
            fetchPopularMovies(currentPage);
        }
    });

    function fetchMovies(query, page) {
        fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                displayMovies(data.results);
                currentPageSpan.textContent = page;
            })
            .catch(error => console.error("Error fetching movies:", error));
    }

    function fetchPopularMovies(page) {
        fetch(`${apiUrl}/movie/popular?api_key=${apiKey}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                displayMovies(data.results);
                currentPageSpan.textContent = page;
            })
            .catch(error => console.error("Error fetching popular movies:", error));
    }

    function displayMovies(movies) {
        moviesGrid.innerHTML = "";
        movies.forEach(movie => {
            const movieItem = document.createElement("div");
            movieItem.classList.add("grid-item");
            movieItem.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h2>${movie.title}</h2>
                <p>Rating: ${movie.vote_average}</p>
                <button onclick="redirectToMovie(${movie.id})">Play Now</button>
            `;
            moviesGrid.appendChild(movieItem);
        });
    }

    window.redirectToMovie = function (movieId) {
        window.location.href = `movie.html?id=${movieId}`;
    };

    // Fetch initial popular movies
    fetchPopularMovies(currentPage);

    // Show or hide the footer based on scroll position
    function toggleFooterVisibility() {
        const footer = document.querySelector("footer");
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            footer.style.display = "block";
        } else {
            footer.style.display = "none";
        }
    }

    // Add event listener for scroll events
    window.addEventListener("scroll", toggleFooterVisibility);

    // Initially hide the footer
    toggleFooterVisibility();
});
