const apiMovieKey = "aa555cd280msh51f717ae40f3c1bp121d34jsn1b21ee396616";
const apiMovieApp = "25896a7c65mshe2ebaa88e6c4e04p18b8a6jsne556cdf570ee";
var apiTheMovieDb = "aaea85d9555b588ecf30aa20af8cc8de";


// var savedMovies;
// var lastMovieSearched;
// var movies = [];

// var boxoffice settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://movies-tvshows-data-imdb.p.rapidapi.com/?page=1&type=get-boxoffice-movies",
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
//         "x-rapidapi-key": "aa555cd280msh51f717ae40f3c1bp121d34jsn1b21ee396616"
//     }
// }

// $.ajax(settings).done(function(response) { console.log(response); });



var nowPlaying = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/movie/now_playing?" +
        "api_key=" +
        apiTheMovieDb,
    "method": "GET",
}

// $.ajax(nowPlaying).done(function(response) { console.log(response); });

function createMovie(movieObj) {
    console.log(movieObj)

    let div = $("div").addClass("card");

    let h2 = $("h2");
    h2.text = movieObj.title;

    let img = $("img");
    img.src = movieObj.poster_path;
    img.addClass("movie-poster");

    // let p = document.createElement("p")
    // p.innerText = `${movieObj.vote_average}`
    $("#movie-list").append(div);
    div.append(h2, img);

    // div.append(h2, img, p)
    // getMovieDiv().append(div);
}

// function getMovieDiv() {
//     return document.getElementById("movie-list")
// }

function getMovies() {
    console.log("movietest")
    $.ajax({
        url: "https://api.themoviedb.org/3/movie/now_playing?api_key=aaea85d9555b588ecf30aa20af8cc8de",
        method: "GET",
    })
        .then(function (responce) {
        })

}

// if(localStorage.getItem("movies")) {
//     savedMovies = JSON.parse(localStorage.getItem("movies"));
//     // console.log(savedMovies);
//     for(var i = 0; i < savedMovies.length; i++) {
//         lastMovieSearched = savedMovies.length - 1;
//         var lastCity = savedMovies[lastMovieSearched];
//     }
// }
// else {
//     movies;
// }

// $.ajax({ 
//     url: "https://movies-tvshows-data-imdb.p.rapidapi.com/?page=1&type=get-boxoffice-movies", 
//     method: "GET", })
//     .then(function(response) { 
//     console.log(response); 
    // lat = response.coord.lat; 
    // lon = response.coord.lon; 

    // add movie data to movies array and save in localStorage   
    // movies.push(movies);
    // localStorage.setItem("movies", JSON.stringify(movies));

    // list cities searched
//     var movieList = $("<li > ");
//     movieList.addClass("list-group-item city-item");
//     movieList.text(response.name);
//     movieList.attr("lat", response.coord.lat);
//     movieList.attr("lon", response.coord.lon);
//     movieList.css("background-color", "lightgray");
//     movieList.css("color", "blue");
//     $("#movie-list").prepend(movieList);

//     });