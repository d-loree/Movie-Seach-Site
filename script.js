const APIKEY = "" // Add your TMDB API key here. Get one at: https://developer.themoviedb.org/reference/intro/getting-started

const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" + APIKEY + "&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=' + APIKEY + '&query="';

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK);
function returnMovies (url)
{
    fetch(url)
        .then(res => res.json())
        .then(function(data) {
            console.log(data.results);
            data.results.forEach(element => { // For each movie found in search result, setup the structure of the movie card and displa them all
                const div_card = document.createElement("div");
                div_card.setAttribute("class", "movie-card");

                const div_row = document.createElement("div");
                div_row.setAttribute("class", "row");

                const div_column = document.createElement("div");
                div_column.setAttribute("class", "column");

                const image = document.createElement("img");
                image.setAttribute("class", "thumbnail");
                image.setAttribute("id", "image");
                
                const link = document.createElement("a");
                link.href = `https://www.themoviedb.org/movie/${element.id}`;
                link.target = "_blank";
                

                const title = document.createElement("h3");
                title.setAttribute("id", "title");

                const center = document.createElement("div");

                title.innerHTML = `${element.title}`;
                image.src = IMG_PATH + element.poster_path;

                center.appendChild(image);
                div_card.appendChild(center);
                div_card.appendChild(title);
                link.appendChild(div_card);
                div_column.appendChild(link);
                div_row.appendChild(div_column);

                main.appendChild(div_row);
            });
        })
}

// When user enters a search term, clear all movies currenly being displayed, then print the earch results
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = "";

    const searchItem = search.value;

    // If search item returns true, display the movies related to the search term
    if (searchItem)
    {
        returnMovies(SEARCHAPI + searchItem); // Submit the search on the TMDB API with the search item
        search.value = ""; // Reset search form
    }

})