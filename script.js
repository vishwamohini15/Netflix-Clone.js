const apikey = "7fad363f58889077cd601fe2d0ed4fb7";
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "http://image.tmdb.org/t/p/w500";

const apipaths = {
    fetchALLcategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMovieList: (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending: `${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`,
    searchOnYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=YOUR_YOUTUBE_API_KEY`
};

// Boots up the app
function init() {
    fetchTrendingMovies();
    fetchAndBuildAllSection();
}

function fetchTrendingMovies() {
    fetchAndbuildMovieSection(apipaths.fetchTrending, 'Trending Now')
        .then(list => {
            const randomIndex = parseInt(Math.random() * list.length);
            buildBannerSection(list[randomIndex]);
        }).catch(err => {
            console.error(err);
        });
}

function buildBannerSection(movie) {
    const bannerCont = document.getElementById("banner-section");
    bannerCont.style.backgroundImage = `url('${imgPath}${movie.backdrop_path}')`;

    const div = document.createElement("div");
    div.innerHTML = `
        <h2 class="banner_title">${movie.title}</h2>
        <p class="banner_info">Trending in movies | ${movie.release_date}</p>
        <p class="banner_overview">${movie.overview}</p>
        <div class="action-button-cont">
            <button class="action-button"><img src="play.svg" alt="">Play</button>
            <button class="action-button"><img src="more-info.svg" alt="">More Info</button>
        </div>
    `;
    div.className = "banner-container container";
    bannerCont.append(div);
}

function fetchAndBuildAllSection() {
    fetch(apipaths.fetchALLcategories)
        .then(res => res.json())
        .then(res => {
            const categories = res.genres;
            if (Array.isArray(categories) && categories.length) {
                categories.forEach(category => {
                    fetchAndbuildMovieSection(apipaths.fetchMovieList(category.id), category.name);
                });
            }
        })
        .catch(err => console.error(err));
}

function fetchAndbuildMovieSection(fetchUrl, categoryName) {
    return fetch(fetchUrl)
        .then(res => res.json())
        .then(res => {
            const movies = res.results;
            if (Array.isArray(movies) && movies.length) {
                buildMoviesSection(movies.slice(0, 6), categoryName);
            }
            return movies;
        })
        .catch(err => console.error(err));
}

function buildMoviesSection(list, categoryName) {
    const moviesCont = document.getElementById("movies-cont");

    const moviesListHtml = list.map(item => {
        return `
        <div class="movies-item" onmouseenter="searchMovieTrailer('${item.title}','yt${item.id}')">
            <img class="movies-item-img" src="${imgPath}${item.backdrop_path}" alt="${item.title}">
            <div class="ifreame-wrap" id="yt${item.id}></div>
        </div>`;
    }).join('');

    const moviesSectionHtml = `
        <div class="movies-section">
            <h2 class="movies-section-heading">${categoryName} <span class="explore-nudge">Explore All</span></h2>
            <div class="movies-row">
                ${moviesListHtml}
            </div>
        </div>
    `;

    const div = document.createElement("div");
    div.innerHTML = moviesSectionHtml;
    moviesCont.appendChild(div);
}

function searchMovieTrailer(movieName,iframId) {
    // console.log(document.getElementById(iframId).iframId);
    if (!movieName) return;

    fetch(apipaths.searchOnYoutube(movieName))
        .then(res => res.json())
        .then(res => {
            const bestResult = res.items[0];
            const elements=document.getElementById(iframId)
            console.log(elements,iframId);
            // const youtubeUrl = `https://www.youtube.com/watch?v=${bestResult.id.videoId}`;
            // console.log(youtubeUrl);
            // window.open(youtubeUrl, '_blank');
            const div=document.createElement('div')
            div.innerHTML=`<iframe width="420" height="315"src="https://www.youtube.com/embed/${bestResult.id.videoId}?autoplay=1&controls=0">
            </iframe>`

            elements.append(div)
        })
        .catch(err => console.log(err));
}

window.addEventListener("load", function () {
    init();
    window.addEventListener("scroll", function () {
        const headerEl = document.getElementById("header");
        if (window.scrollY > 5) {
            headerEl.classList.add('black-bg');
        } else {
            headerEl.classList.remove('black-bg');
        }
    });
});
