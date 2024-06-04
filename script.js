const apikey = "21602ccfbd8724381bbf934528e4c414";
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "http://image.tmdb.org/t/p/w500";

const apipaths = {
    fetchALLcategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMovieList: (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending:`${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`
};

// Boots up the app
function init() {
    fetchTrendingMovies()
    fetchAndBuildAllSection();
}

function fetchTrendingMovies(){
    fetchAndbuildMovieSection(apipaths.fetchTrending,'Trending Now')
    .then(list=>{
        const randomIndex=parseInt(Math.random()*list.length)
        buildbannersection(list[randomIndex])
    }).catch(err=>{
        console.error(err);
    })

}

function buildbannersection(movie){
    const bannercont=document.getElementById("banner-section")
    bannercont.style.background=`url('${imgPath}${movie.backdrop_path}')`

    const div=document.createElement("div")
    div.innerHTML=`

          <h2 class="banner_title">${movie.title} </h2>
          <p class="banner_info">Trending in movies | ${movie.released_date}</p>
          <p class="banner_overview">${movie.overview}</p>
          <div class="action-button-cout">
               <button class="action-button"><img src="play.svg" alt="">play</button>
               <button class="action-button"> <img src="more-info.svg" alt="">more info</button>

          </div>
    `
    div.className="banner-container container"
    bannercont.append(div)
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

function fetchAndbuildMovieSection(fetchurl, categoryName) {
    console.log(fetchurl,categoryName);
    return fetch(fetchurl)
        .then(res => res.json())
        .then(res => {
            const movies = res.results;
            if (Array.isArray(movies) && movies.length) {
                buildMoviesSection(movies.slice(0,6), categoryName);
            }
            return movies;
        })
        .catch(err => console.error(err));
}

function buildMoviesSection(list, categoryName) {
    const moviescont = document.getElementById("movies-cont");

    const moviesListHtml = list.map(item => {
        return `<img class="movies-item" src="${imgPath}${item.backdrop_path}" alt="${item.title}">`;
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
div.innerHTML="movies-section"

    div.innerHTML = moviesSectionHtml;
    moviescont.appendChild(div);
}

window.addEventListener("load", function () {
    init();
    window.addEventListener("scroll",function(){
        const headerel=document.getElementById("header")
        if(window.scroll >5){
            headerel.classList.add('black-bg')
        }else{
             headerel.classList.remove('black-bg')
        }
    })
});
















// style="background-image: url(https://dnm.nflximg.net/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABSt4vkNvQJLEHIvahew_Bc7K1CqoMo3IxYp9r_I7JyZGYuOr7orF-km4BHNSThwHersdVyESIlqCLiQ1zlP824-DloIzKyzco-xQ11W1SWzDPI47w-mCAB0uSQNo_tRj-8RXew.jpg?r=d50)"