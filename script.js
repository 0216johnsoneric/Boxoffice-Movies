$(document).ready(() => {

    // VARIABLES
    // OMBD SEARCH AND IMDB SEARCH API KEYS
    const apiOMDB1 = "bead26a4&s=";
    const apiOMDB2 = "bead26a4&i=";
    //  theMovieDB Query API KEY / IMAGE URL
    const apiTMDB = "aaea85d9555b588ecf30aa20af8cc8de&query=";
    const imageUrl = "https://image.tmdb.org/t/p/w500";


    // SEARCH FORM EVENT LISTENERS FOR MOVIE AND TVSHOWS
    $('#searchMovieForm').on('submit', (event) => {
        event.preventDefault();
        let searchMovie = $('#searchMovie').val();
        getMovies(searchMovie);

    });

    $('#searchTvForm').on('submit', (event) => {
        event.preventDefault();
        let searchTv = $('#searchTv').val();
        getTvShows(searchTv);

    });


    // iOMDB/iMDB getMovies Function containing AJAX call for iOMDB and nested AJAX call for iMDB
    function getMovies(searchMovie) {
        console.log(searchMovie);

        $.ajax({
            url: "https://www.omdbapi.com/?apikey=" + apiOMDB1 + searchMovie,
            method: "GET",
        })
            .then((response) => {
                console.log(response);
                let movies = response.Search;
                let output = '';
                // new outputFail//
                let outputFail = "";

                $.each(movies, (index, movie) => {
                    // Only Render movie data with valid poster path === true
                    if (movie.Poster) {

                        let imdbId = movie.imdbID
                        $.ajax({
                            url: "https://www.omdbapi.com/?apikey=" + apiOMDB2 + imdbId,
                            method: "Get",
                        })
                            .then((response2) => {
                                console.log(response2);
                                //Add Outputfail //
                                outputFail += `
                        <div class="text-center">
                        <h4 style="text-align:center;color:black;margin-top:3px"><strong>${movie.Title} is Not Available</strong></h4>
                        <a href="https://imdb.com/title/${response2.imdbID}" target="_blank" class="button primary">IMDB Website</a>
                        </div>
                        `
                              // End of Outputfail // 
                                output += `
                        <div class="col-md-3">
                            <div class="text-center">
                                <h2>${movie.Title}</h2>
                                <img src=${movie.Poster} data-movie-id=${movie.imdbID}/>
                                <br></br>
                           <div class="col-md-6">
                            <ul class="list-group">
                                <li class="list-group-item"><strong>Genre:</strong> ${response2.Genre}</li>
                                <li class="list-group-item"><strong>Rated:</strong> ${response2.Rated}</li>
                                <li class="list-group-item"><strong>IMDB Rating:</strong> ${response2.imdbRating}</li>
                                <li class="list-group-item"><strong>Plot:</strong> ${response2.Plot}</li>
                            </ul>
                            </div>
                            <div class="links">
                            
                            <a href="https://imdb.com/title/${response2.imdbID}" class="button primary">IMDB Website</a> | | |
                            <a href="index.html" class="button primary">Home Page</a>
                            </div>
                            <hr>
                            <br></br>
                            </div>
                        </div> 
                        `;
                                $('#movies').html(output);
                            });
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // theMovieDB API KEY to Query TV Shows
    function getTvShows(searchTv) {
        console.log(searchTv);
        $.ajax({
            url: "https://api.themoviedb.org/3/search/tv?api_key=" + apiTMDB + searchTv,
            method: "GET",
        })
            .then((data) => {
                console.log(data);
                let tvs = data.results;
                let output = '';
                $.each(tvs, (index, tv) => {
                    if (tv.poster_path) {
                        output += `
                <div class="col-md-3">
                    <div class="lists text-center">
                        <br></br>
                    <h2>${tv.name}</h2>
                    <img src=${imageUrl + tv.poster_path} data-movie-id=${tv.id} />
                    <br></br>
                    <div class="col-md-6">
                        <ul class="list-group">
                            <li class="list-group-item"><strong>TMDB Rating:</strong> ${tv.vote_average}</li>
                            <li class="list-group-item"><strong>Description:</strong> ${tv.overview}</li>
                        </ul>
                    </div>
                    <div class="links">
                        <a href="index.html" class="button primary">Home Page</a>
                    </div>
                    </div>
                </div> 
                `;

                    }

                });
                $('#tvshows').html(output);
            })
            .catch((err) => {
                console.log(err);
            });

    }


});



