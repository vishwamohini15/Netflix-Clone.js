
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