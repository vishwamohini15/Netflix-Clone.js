
const apikey="21602ccfbd8724381bbf934528e4c414"
const apiEndpoint="https://api.themoviedb.org/3"
const imgPath="http://image.tmdb.org/t/p/w500/your_poster_path"

const apipaths={
     fetchALLcategories:`${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
     fetchMovieList: (id)=>`${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`

}

//boots up the app
function init(){
fetchAndBuildAllSection()
}

function fetchAndBuildAllSection(){
     fetch(apipaths.fetchALLcategories)
.then(res=>res.json())
.then(res => {
     const categories=res.genres
     if(Array.isArray(categories) && categories.length ){
          categories.slice(0,2).forEach(category => {
               fetchAndbuildMovieSection(
                    apipaths.fetchMovieList(category.id),category
               )    
          })
     }
     // console.table(movies)
})
.catch(err=>console.error(err))
}
function fetchAndbuildMovieSection(fetchurl,category){
console.log(fetchurl,category)
fetch(fetchurl)
.then(res=>res.json())
.then(res=>{
     // console.table(res.results)
     const movies=res.results;
     if(Array.isArray(movies) && movies.length){
          buildMoviesSection(movies,category.name)
     }
})
.catch(err=>console.error(err))
}
function buildMoviesSection(list, categoryName){
console.log(list,categoryName);

const moviescont=document.getElementById("movies-cont")

const moviesListHtml=list.map(item=>{
     return`
     <img class="movies-section" src="${imgPath}${item.backdrop_path}" alt="${item.title}">

     `
}).join('')

const moviesSectionHtml=`
<h2  class="movies-section-heading">${categoryName} <span class="explore-nudge">Explore All</span></h2>
<div class="movies-row">
${moviesListHtml}
</div>
`
console.log(moviesSectionHtml);

const div=document.createElement("div")
// div.innerHTML="movies-section"
div.innerHTML=moviesSectionHtml
moviescont.appendChild(div)

}

window.addEventListener("load",function(){
     init()
})




















// https://api.themoviedb.org/3/genre/movie/list?api_key=21602ccfbd8724381bbf934528e4c414















// const apikey = "21602ccfbd8724381bbf934528e4c414";
// const apiEndpoint = "https://api.themoviedb.org/3";
// const imgPath = "http://image.tmdb.org/t/p/w500";

// const apipaths = {
//     fetchALLcategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
//     fetchMovieList: (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
//     fetchTrending:`${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`,
//     searchOnYoutube: (query)=>`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyDfavzsdKtigGNJeIyi65SpIbhAADjbIXQ`
// };

// // Boots up the app
// function init() {
//     fetchTrendingMovies()
//     fetchAndBuildAllSection();
// }

// function fetchTrendingMovies(){
//     fetchAndbuildMovieSection(apipaths.fetchTrending,'Trending Now')
//     .then(list=>{
//         const randomIndex=parseInt(Math.random()*list.length)
//         buildbannersection(list[randomIndex])
//     }).catch(err=>{
//         console.error(err);
//     })

// }

// function buildbannersection(movie){
//     const bannercont=document.getElementById("banner-section")
//     bannercont.style.background=`url('${imgPath}${movie.backdrop_path}')`

//     const div=document.createElement("div")
//     div.innerHTML=`

//           <h2 class="banner_title">${movie.title} </h2>
//           <p class="banner_info">Trending in movies | ${movie.released_date}</p>
//           <p class="banner_overview">${movie.overview}</p>
//           <div class="action-button-cout">
//                <button class="action-button"><img src="play.svg" alt="">play</button>
//                <button class="action-button"> <img src="more-info.svg" alt="">more info</button>

//           </div>
//     `
//     div.className="banner-container container"
//     bannercont.append(div)
// }

// function fetchAndBuildAllSection() {
//     fetch(apipaths.fetchALLcategories)
//         .then(res => res.json())
//         .then(res => {
//             const categories = res.genres;
//             if (Array.isArray(categories) && categories.length) {
//                 categories.forEach(category => {
//                     fetchAndbuildMovieSection(apipaths.fetchMovieList(category.id), category.name);
//                 });
//             }
//         })
//         .catch(err => console.error(err));
// }

// function fetchAndbuildMovieSection(fetchurl, categoryName) {
//     console.log(fetchurl,categoryName);
//     return fetch(fetchurl)
//         .then(res => res.json())
//         .then(res => {
//             const movies = res.results;
//             if (Array.isArray(movies) && movies.length) {
//                 buildMoviesSection(movies.slice(0,6), categoryName);
//             }
//             return movies;
//         })
//         .catch(err => console.error(err));
// }

// function buildMoviesSection(list, categoryName) {
//     const moviescont = document.getElementById("movies-cont");

//     const moviesListHtml = list.map(item => {
//         return 
//         `<div class="movies-item" onmouseover="searchMovieTrailer('${item.title}')">
//         <img class="movies-item-img" src="${imgPath}${item.backdrop_path}" alt="${item.title}" >;
//         <iframe width="254" height="250"
//  src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"></iframe>
//         </div>`
//     }).join('');

//     const moviesSectionHtml = `
//         <div class="movies-section">
//             <h2 class="movies-section-heading">${categoryName} <span class="explore-nudge">Explore All</span></h2>
//             <div class="movies-row">
//                 ${moviesListHtml}
//             </div>
//         </div>
//     `;

//     const div = document.createElement("div");
// div.innerHTML="movies-section"

//     div.innerHTML = moviesSectionHtml;
//     moviescont.appendChild(div);
// }

// function searchMovieTrailer(movieName){
//     if(!movieName) return;

// fetch(apipaths.searchOnYoutube(movieName))
// .then(res =>res.json())
// .then(res =>{
//     // console.log(res.items[0]);
//     const bestResult=res.items[0]
//     const youtubeUrl=`https://www.youtube.com/watch?v=${bestResult.id.videoId}`
//     console.log(youtubeUrl);
//     window.open(youtubeUrl,'_blank')
// })
// .catch (err=>console.log(err));
// }
// window.addEventListener("load", function () {
//     init();
//     window.addEventListener("scroll",function(){
//         const headerel=document.getElementById("header")
//         if(window.scroll >5){
//             headerel.classList.add('black-bg')
//         }else{
//              headerel.classList.remove('black-bg')
//         }
//     })
// });






// style="background-image: url(https://dnm.nflximg.net/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABSt4vkNvQJLEHIvahew_Bc7K1CqoMo3IxYp9r_I7JyZGYuOr7orF-km4BHNSThwHersdVyESIlqCLiQ1zlP824-DloIzKyzco-xQ11W1SWzDPI47w-mCAB0uSQNo_tRj-8RXew.jpg?r=d50)"

/*
body{
     background-color: rgb(12, 12, 12);
     padding: 0;
     margin: 0;
     font-family:  Helvetica, Arial, sans-serif;
}

#header{
     /* background-color: rgb(120, 117, 114); */
     background-color: rgb(108, 104, 104);
     position: fixed;
     z-index: 100;
     left: 0;top: 0;
     width: 100%;
transform: background-color ease 500ms;
}
.black-bg{
     background-color: #fff;
}

.container{
     width: 100%;
     max-width: 1250px;
     margin: 0 auto;
}
::-webkit-scrollbar{
     display: none;
}
.header-cont{
display: flex;
flex-direction: row;
justify-content: space-between;
}

.right-cont img{
     margin-right: 22px;
}
.left-cont, .right-cont{
     display: flex;
 flex-direction: row;    
 align-items: center;
}
.header-brand{
     max-width: 110px;
     background-color: rgba(255, 217, 0, 0.087);
}
.main-nav{
     list-style: none;
     display: inline-flex;
     flex-direction: row;
     /* display: none; */
}
.right-cont img{
     margin-right: 22px;
}
.nav-item{
     /* color: white; */
     margin-right: 20px;
     color: #e5e5e5;
opacity: .83;
}
.nav-item.active{
     color: white;
     opacity: 1;
     font-weight: 600;
}
.right-cont img{
     max-width: 40px;
     cursor: pointer;
}
/* ..movies section.... */
.movies-section{
margin: 41px 0;
}
.movies-section-heading{
font-size: 20px;
font-weight: 700;
line-height: 1.2;
color: white;
cursor: pointer;
margin-bottom: 10px;
}

.explore-nudge{
color: #54b9c5;
font-size: 13px;
display: none;
}
.movies-section-heading:hover .explore-nudge{
display: inline-block;
}
.movies-row{
     display: flex;
     flex-direction: row;
     align-items: center;
     flex-wrap: nowrap;
     overflow-x: auto;
     /* overflow-y: hidden; */
     /* justify-content: center; */
}
.movies-item{
width: 245px;
object-fit: contain;
border-radius: 4px;
margin-right: 6px;
position: relative;
}
.movies-item-img{
     width: inherit;
}
.movies-item iframe{
     position: absolute;
     top: 0;left: 0;
     width: 100%;
     height: 100%;
     z-index: 10;
     display: none;
     border: none;
     outline: none;
}
.movies-item:hover{
     display: block;
}
.movies-item:hover{
transform: scale(1.2);
transition: transform linear 0.3s;
}

/* ...banner section... */
/* .banner-section{
     display: flex;
     align-items: center;
     justify-content: center;
     height: 80vh;
     width: 100vh;
     padding-top: 70px;
} */
.banner-section{
     background-repeat: no-repeat;
     background-size: contain;
     width: 100%;
     min-height: 80vh;
     position: relative;
     padding-top: 80px;
}
.banner-container{
     display: flex;
     flex-direction: column;
   
     
}
.banner_title{
     color: white;
     font-style: 78px;
     line-height: 1.2;
     margin: 0;
     margin-bottom: 16px;
}
.banner_info{
margin-bottom: 14px;
font-size: 22px;
font-weight: 700;
line-height: 1.5;
color: white;

}
.banner_overview{
font-size: 16.4px;
color: white;
line-height: 1.3;
max-width: 50%;
margin-left: 0;
}
.action-button-cout{
display: flex;
flex-direction: row;
align-items: center;
}
.action-button{
background-color: #fff;
margin-right: 11px;
padding: 8px 23px;
border-radius: 4px;
flex-direction: row;
font-size: 16px;
font-weight: 700;
align-items: center;
cursor: pointer;
}
.action-button:last-child{
background-color: gray;
}

.banner_fadebottom{
     height: 120px;
     background: linear-gradient(180deg,
     transparent,
     rgba(37,37,37,.6)
     #141414
     );
     position: absolute;
     left: 0;
     bottom: 0;
     width: 100%;

}
@media (max-width:767px) {

     .main-nav{
          display: none;
     }
     .banner-container{
          max-width: 100%;
          
     }
.banner_overview .banner_info{
min-width: 100%;
}
}

// here new js..................

/*
const apikey = "21602ccfbd8724381bbf934528e4c414";
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "http://image.tmdb.org/t/p/w500";

const apipaths = {
    fetchALLcategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMovieList: (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending: `${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`,
    searchOnYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyDfavzsdKtigGNJeIyi65SpIbhAADjbIXQ`
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
    console.log(document.getElementById(iframId).iframId);
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


*/

/*
body {
     background-color: rgb(12, 12, 12);
     padding: 0;
     margin: 0;
     font-family: Helvetica, Arial, sans-serif;
 }
 
 #header {
     background-color: rgb(120, 117, 114);
 }
 
 .container {
     width: 100%;
     max-width: 1250px;
     margin: 0 auto;
 }
 
 .header-cont {
     display: flex;
     flex-direction: row;
     justify-content: space-between;
 }
 
 .right-cont img {
     margin-right: 22px;
 }
 
 .left-cont, .right-cont {
     display: flex;
     flex-direction: row;    
     align-items: center;
 }
 
 .header-brand {
     max-width: 110px;
     background-color: rgba(255, 217, 0, 0.087);
 }
 
 .main-nav {
     list-style: none;
     display: inline-flex;
     flex-direction: row;
 }
 
 .right-cont img {
     margin-right: 22px;
 }
 
 .nav-item {
     margin-right: 20px;
     color: #e5e5e5;
     opacity: .83;
 }
 
 .nav-item.active {
     color: white;
     opacity: 1;
     font-weight: 600;
 }
 
 .right-cont img {
     max-width: 40px;
     cursor: pointer;
 }
 
 .movies-section {
     margin-bottom: 20px;
 }
 
 .movies-section-heading {
     font-size: 20px;
     font-weight: 700;
     line-height: 1.2;
     color: white;
     cursor: pointer;
     margin-bottom: 10px;
 }
 
 .explore-nudge {
     color: #54b9c5;
     font-size: 13px;
     display: none;
 }
 
 .movies-section-heading:hover .explore-nudge {
     display: inline-block;
 }
 
 .movies-row {
     display: flex;
     flex-direction: row;
     align-items: center;
 }
 
 .movies-item {
     width: 245px;
     object-fit: contain;
     border-radius: 4px;
     margin-right: 6px;
 }
 
 .movies-item:hover {
     transform: scale(1.2);
     transition: transform linear 0.3s;
 }
 
 .banner-content {
     padding: 20px;
     color: white;
     text-align: left;
     background: rgba(0, 0, 0, 0.5);
     border-radius: 5px;
 }
 
 .banner_title {
     font-size: 36px;
     font-weight: 700;
 }
 
 .banner_info, .banner_overview {
     margin-top: 10px;
 }
 
 .action-button-cont {
     margin-top: 20px;
 }
 
 .action-button {
     display: inline-flex;
     align-items: center;
     padding: 10px 20px;
     margin-right: 10px;
     background-color: rgba(255, 255, 255, 0.3);
     border: none;
     border-radius: 5px;
     cursor: pointer;
     font-size: 16px;
     color: white;
 }
 
 @media (max-width: 767px) {
     .main-nav {
         display: none;
     }
 }
 
*/



