
// be sure to replace the search term with the input field value
const query_url = `http://www.omdbapi.com/?apikey=2afe3024&s=Matrix&type=movie`

const searchBtn = document.getElementById('searchForMovie')

async function findMovie(event) {
    event.preventDefault()
    console.log("Click");
    fetch(query_url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((err) => {
        console.error("Error: ", err);
    } )
}

searchBtn.onclick = findMovie;