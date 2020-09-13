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

// function movieSelected(id) {
//     sessionStorage.setItem('movieId', id);
//     window.location = 'movie.html';
//     return false;
// }

// function getMovie() {
//     let movieId = sessionStorage.getItem('movieId');

//     axios.get('http://www.omdbapi.com?i=' + movieId)
//         .then((response) => {
//             console.log(response);
//             let movie = response.data;

//             let output = `
//         <div class="row">
//           <div class="col-md-4">
//             <img src="${movie.Poster}" class="thumbnail">
//           </div>
//           <div class="col-md-8">
//             <h2>${movie.Title}</h2>
//             <ul class="list-group">
//               <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
//               <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
//               <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
//               <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
//               <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
//               <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
//               <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
//             </ul>
//           </div>
//         </div>
//         <div class="row">
//           <div class="well">
//             <h3>Plot</h3>
//             ${movie.Plot}
//             <hr>
//             <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
//             <a href="index.html" class="btn btn-default">Go Back To Search</a>
//           </div>
//         </div>
//       `;

//             $('#movie').html(output);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }
