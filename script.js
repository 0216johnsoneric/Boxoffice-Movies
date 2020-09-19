$(document).ready(() => {

    // VARIABLES
    // iOMBD SEARCH AND iMDB SEARCH API KEYS
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

    $('#searchActorForm').on('submit', (event) => {
        event.preventDefault();
        let searchActor = $('#searchActor').val();
        getActors(searchActor);

    });


    // iOMDB/iMDB getMovies Function containing AJAX call for iOMDB and nested AJAX call for iMDB
    function getMovies(searchMovie) {
        console.log(searchMovie);
        $.ajax({
            url: "http://www.omdbapi.com/?apikey=" + apiOMDB1 + searchMovie,
            method: "GET",
        })
            .then((response) => {
                console.log(response);
                let movies = response.Search;
                let output = '';

                $.each(movies, (index, movie) => {
                // Only Render movie data with valid poster path === true
                    if (movie.Poster) {
                        let imdbId = movie.imdbID
                        $.ajax({
                            url: "http://www.omdbapi.com/?apikey=" + apiOMDB2 + imdbId,
                            method: "Get",
                        })
                        .then((response2) => {
                        console.log(response2);

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
                            
                            <a href="http://imdb.com/title/${response2.imdbID}" target="_blank" class="button primary">IMDB Website</a> | | |
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
                    </div>
                </div> 
                `;

            }

        });
        $('#tvshows').html(output);
        })
        .catch ((err) => {
        console.log(err);
        });

    }

    function getActors(searchActor) {
        console.log(searchActor);
        $.ajax({
            url: "https://api.themoviedb.org/3/search/person?api_key=" + apiTMDB + searchActor,
            method: "GET",
        })
            .then((newdata) => {
                console.log(newdata);
                let actors = newdata.results;
                let output = '';
                $.each(actors, (index, actor) => {
                    // if (actor.poster_path) {
                        output += `
                <div class="col-md-3">
                    <div class="lists text-center">
                        <br></br>
                    <h2>${actor.name}</h2>
                
                    <img src=${imageUrl + actor.profile_path} data-movie-id=${actor.id} />
                    
                    <h2>${actor.known_for.title}</h2>
                    
                    </div>
                </div> 
                `;

                    // }

                });
                $('#actors').html(output);
            })
            .catch((err) => {
                console.log(err);
            });

    }

    
                      

});



