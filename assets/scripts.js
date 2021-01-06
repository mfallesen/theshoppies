let movieNominations = [];
let movieIds = [];


const searchBtn = document.getElementById('searchForMovie')

const debounce = (callback, delay) => {
    let timeout = null
    return (...args) => {
        const next = () =>
            callback(...args);
        clearTimeout(timeout);
        //1.   
        timeout = setTimeout(next, delay)
    }
}

async function findMovie(event) {
    event.preventDefault()

    const resultBox = document.getElementById('movie-results')
    resultBox.innerHTML = "";

    let movie = document.getElementById("searchBox").value
    const query_url = `http://www.omdbapi.com/?apikey=2afe3024&s=${movie}&type=movie`


    fetch(query_url)
        .then(response => response.json())
        .then((data) => {
            let options = data.Search;
            console.log(options);

            if (options != undefined) {
                // CLEAR EXISTING ID LIST
                movieIds = [];

                // LOOP THROUGH OPTIONS AND DISPLAY A CARD FOR EACH
                for (let i = 0; i < options.length; i++) {
                    
                    // DATA USED FOR CARD CONSTRUCTION
                    const cardId = 'nominateMovie' + i;
                    const title = options[i].Title;
                    const year = options[i].Year;
                    let poster = options[i].Poster;
                    
                    // DATA USED TO TRACK NOMINATIONS
                    const movieDBId = options[i].imdbID
                    movieIds.push(movieDBId)


                    // CHECK FOR EXISTING POSTER AND REPLACE WITH DEFAULT MISSING IMAGE IF NONE
                    if (poster === 'N/A') {
                        poster = "./assets/images/picture-not-available-clipart-12.jpg"
                    }


                    let button = '';
                    if (movieNominations.movieID === movieDBId) {
                        button = `<button id="${cardId}" class="disabled" disabled>Nominate me!</button>`
                    } else {
                        button = `<button id="${cardId}">Nominated!</button>`
                    }
                    
                    
                    
                    
                    
                    
                    // CREATE NEW MOVIE CARD
                    const newCard = `<div class="flex-center card movie-card">
                                        <h3 id="movieNo">${title}</h2>
                                        <p id="movieYear">${year}</p>
                                        <img src="${poster}" alt="${title} poster" id="moviePoster">
                                        ${button}
                                    </div>`

                    resultBox.insertAdjacentHTML('beforeend', newCard);

                    // CREATE EVENT LISTENER FOR THE NEW BUTTON
                    const nominateButton = document.getElementById(`${cardId}`)
                    nominateButton.addEventListener('click', nominate)

                }
                console.log(movieIds);
            } else {
                // DISPLAY ONLY IS NO MOVIE IS FOUND
                const noMovie = `<div class="flex-center no-movie ">
                                    <h2>Sorry we cant seem to find the movie you're looking for. Please enjoy this gif of nicholas Cage instead
                                    </h2>
                                    <img src="https://www.placecage.com/gif/300/300" alt="Nick Cage Placeholder">
                                </div>`

                resultBox.insertAdjacentHTML('beforeend', noMovie)
            }

        })
        .catch((err) => {
            console.error("Error: ", err);
        })
}

// Nomination functions
function nominate() {
    const nominee = this.parentElement;
    const nomineeTitle = nominee.getElementsByTagName('h3')[0].childNodes[0].data;
    const nomineeYear = nominee.getElementsByTagName('p')[0].childNodes[0].data;
    const nomineePoster = nominee.getElementsByTagName('img')[0].currentSrc;
    const nomineeButtonID = nominee.getElementsByTagName('button')[0].id;
    const nomineeID = nomineeButtonID.charAt(nomineeButtonID.length - 1);

    const movieID = movieIds[nomineeID];
    
    console.log('nominee: ', nominee);
    console.log(movieID);
    // console.log(nomineeTitle);
    // console.log(nomineeYear);
    // console.log(nomineePoster);

    const nomineeCard = {
        title: nomineeTitle,
        year: nomineeYear,
        poster: nomineePoster,
        movieID: movieID,
    }

    movieNominations.push(nomineeCard)

    nominee.getElementsByTagName('button')[0].setAttribute("class", "disabled")
    nominee.getElementsByTagName('button')[0].setAttribute("disabled", "")

    console.log(nominee.getElementsByTagName('button'))



    console.log(movieNominations);
}


const searchBox = document.getElementById('searchBox')




// the debounced Event handler that works on in the Search field
const debouncedHandler = debounce(findMovie, 1000)
searchBox.addEventListener('input', debouncedHandler)
