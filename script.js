$(document).ready(() => {
    const apiMovieKey = "aaea85d9555b588ecf30aa20af8cc8de";
    const imageUrl = "https://image.tmdb.org/t/p/w500";

    $('#searchForm').on('submit', (event) => {
        event.preventDefault();
        let searchMovie = $('#searchMovie').val();
        getMovies(searchMovie);
        
    });

    function getMovies(searchMovie) {
        console.log(searchMovie);
        $.ajax({
            url: "https://api.themoviedb.org/3/search/movie?api_key=aaea85d9555b588ecf30aa20af8cc8de&query=" + searchMovie,
            // url: "https://api.themoviedb.org/3/movie/now_playing?api_key=aaea85d9555b588ecf30aa20af8cc8de",
            method: "GET",
            }) 
            .then((response) => {
                console.log(response);
                let movies = response.results;
                let output = '';
            $.each(movies, (index, movie) => {

                // Only Render movie data with valid poster path === true
                if(movie.poster_path){
                output += `
                <div class="col-md-3">
                    <div class="lists text-center">
                    <br></br>
                    
                    <h2>${movie.title}</h2>
                    <br></br>
                    <img src=${imageUrl + movie.poster_path} data-movie-id=${movie.id}/>
                    <h4>Rating:</h4>
                    <h5>${movie.vote_average}</h5>
                    <h4>Description:</h4>
                    <h5>${movie.overview}</h5>
                    <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
                    <br></br>
                   </div>
                </div> 
                `;
                }

            });
            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
        // searchMovie.val = " ";
    }
    
});