$(document).ready(() => {
    // const apiKey = "bead26a4";

    $('#searchForm').on('submit', (event) => {
        event.preventDefault();
        let searchText = $('#searchText').val();
        getMovies(searchText);
        
    });
});

function getMovies(searchText) {
    console.log(searchText);
    $.ajax({
        url: "https://api.themoviedb.org/3/movie/now_playing?api_key=aaea85d9555b588ecf30aa20af8cc8de",
        method: "GET",
        }) 
        .then((response) => {
            console.log(response);
            let movies = response.results;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                <div class="col-md-3">
                    <div class="lists text-center">
                    <br></br>
                    <h4>Title:</h4>
                    <h5>${movie.title}</h5>
                    <h4>Rating:</h4>
                    <h5>${movie.vote_average}</h5>
                    <h4>Description:</h4>
                    <h5>${movie.overview}</h5>
                    <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
                    <br></br>
                   </div>
                </div> 
                `;
            });
            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}
