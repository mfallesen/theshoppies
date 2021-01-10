let movieNominations = [];
let movieIds = [];
const storage = window.localStorage;

// CHECK TO SEE IF YOU HAVE NOMINATIONS AND LOAD ON PAGELOAD IF YOU DO.
if (storage.movieNominations) {
    movieNominations = JSON.parse(storage.getItem('movieNominations') || '[]')
    window.onload = renderNominations();
}


const searchBtn = document.getElementById('searchForMovie')

// DEBOUNCE FUNCTION TO CONTROL SEARCH AS USER TYPES
const debounce = (callback, delay) => {
    let timeout = null
    return (...args) => {
        const next = () =>
            callback(...args);
        clearTimeout(timeout);
        timeout = setTimeout(next, delay)
    }
}

// ASYNC FUNCTION TO WAIT FOR API RESPONSE BEFORE DOING SOMETHING WITH THE RETURN DATA
async function findMovie(event) {
    event.preventDefault()

    // SET SEARCH RESULT DIV TO EMPTY AND POPULATE WITH RESULTS.
    const resultBox = document.getElementById('movie-results')
    resultBox.innerHTML = "";

    let movie = document.getElementById("searchBox").value
    const query_url = `http://www.omdbapi.com/?apikey=2afe3024&s=${movie}&type=movie`


    fetch(query_url)
        .then(response => response.json())
        .then((data) => {
            let options = data.Search;

            if (options != undefined) {
                // CLEAR EXISTING ID LIST
                movieIds = [];

                movieNominations = JSON.parse(storage.getItem('movieNominations') || '[]')
                console.log(movieNominations);

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
                    storage.setItem('movieIds', JSON.stringify(movieIds));

                    // CHECK FOR EXISTING POSTER AND REPLACE WITH DEFAULT MISSING IMAGE IF NONE
                    if (poster === 'N/A') {
                        poster = "./assets/images/picture-not-available-clipart-12.jpg"
                    }

                    console.log(movieDBId);
                    // CREATE NEW MOVIE CARD
                    const newCard = `<div class="flex-center card movie-card" data-identifier='${movieDBId}'>
                                        <h3 id="movieNo">${title}</h2>
                                        <p id="movieYear">${year}</p>
                                        <img src="${poster}" alt="${title} poster" id="moviePoster">
                                        <button id="${cardId}">Nominate me!</button>
                                    </div>`

                    resultBox.insertAdjacentHTML('beforeend', newCard);

                    // CREATE EVENT LISTENER FOR THE NEW BUTTON
                    const nominateButton = document.getElementById(`${cardId}`)
                    nominateButton.addEventListener('click', nominate)

                    const comparisonIdentifier = resultBox.lastChild.dataset.identifier;

                    // DISABLE NOMINATION BUTTON ON PAGE LOAD IF MOVIE HAD BEEN NOMINATED
                    function findNominated() {
                        for (let k = 0; k < movieNominations.length; k++) {
                            if (comparisonIdentifier === movieNominations[k].movieID) {
                                nominateButton.setAttribute("class", "disabled");
                                nominateButton.setAttribute("disabled", "")
                            }
                        }
                    }
                    findNominated();
                }
            } else {
                // DISPLAY ONLY IF NO MOVIE IS FOUND
                const noMovie = `<div class="flex-center no-movie ">
                                    <h2>Sorry we cant seem to find the movie you're looking for. Please enjoy this gif of nicholas Cage instead
                                    </h2>
                                    <img src="https://www.placecage.com/gif/300/300" alt="Nick Cage Placeholder">
                                </div>`

                resultBox.insertAdjacentHTML('beforeend', noMovie)
            }

            movieNominations = JSON.parse(storage.getItem('movieNominations') || '[]')
        })
        .catch((err) => {
            console.error("Error: ", err);
        })
}

// NOMINATION FUNCTIONS
function nominate() {

    // BUILD OBJECT TO STORE AS NOMINATION
    movieNominations = JSON.parse(storage.getItem('movieNominations') || '[]')
    const nominee = this.parentElement;
    const nomineeTitle = nominee.getElementsByTagName('h3')[0].childNodes[0].data;
    const nomineeYear = nominee.getElementsByTagName('p')[0].childNodes[0].data;
    const nomineePoster = nominee.getElementsByTagName('img')[0].currentSrc;
    const nomineeButtonID = nominee.getElementsByTagName('button')[0].id;
    const nomineeID = nomineeButtonID.charAt(nomineeButtonID.length - 1);

    const movieID = movieIds[nomineeID];

    const nomineeCard = {
        title: nomineeTitle,
        year: nomineeYear,
        poster: nomineePoster,
        movieID: movieID,
    }

    // CHECK TO SEE IF USER ALREADY HAS 5 NOMINATIONS 
    if (movieNominations.length > 4) {
        // DISPLAY BANNER TO USER
        document.getElementById('nominationLimitBanner').classList.remove('hidden')
    } else {
        // ADD NOMINATED CARD TO ARRAY
        movieNominations.push(nomineeCard)
        
        renderNominations();

        storage.setItem('movieNominations', JSON.stringify(movieNominations))

        // DISABLE NOMINATION BUTTON ON MOVIE
        nominee.getElementsByTagName('button')[0].setAttribute("class", "disabled")
        nominee.getElementsByTagName('button')[0].setAttribute("disabled", "")
    }
}

function renderNominations() {

    const nominationCards = document.getElementById('movieNominationCards')
    nominationCards.innerHTML = '';

    // LOOP THROUGH NOMINATED MOVIES AND DISPLAY THEM TO USER
    for (let n = 0; n < movieNominations.length; n++) {
        // ADD NOMINEE CARDS TO THE DOM
        const addNomineeCard =
            `<div class="flex-center nomination-card card">
            <h2 id="movieNominationNo">${movieNominations[n].title}</h2>
            <p id="movieNominationNoYear">${movieNominations[n].year}</p>
            <button id='${movieNominations[n].movieID}'>Remove Nomination</button>
            </div>`

        nominationCards.insertAdjacentHTML('beforeend', addNomineeCard)

        // GENERATE EVENT LISTENERS TO  REMOVE NOMINATIONS
        const nominationEvent = document.getElementById(movieNominations[n].movieID)
        nominationEvent.addEventListener('click', function () {

            console.log("id number: ", movieNominations[n].movieID);
            
            // REMOVE FROM MOVIENOMINATIONS 
            const filtered = document.getElementById(movieNominations[n].movieID)
            
            if (filtered.id === movieNominations[n].movieID) {
                movieNominations.splice(n, 1);   
            }

            // REMOVE FROM DOM
            const deNominated = document.getElementById(`${movieNominations[n].movieID}`).parentElement
            deNominated.parentNode.removeChild(deNominated);

            storage.setItem('movieNominations', JSON.stringify(movieNominations))
        })
    }
}


// the debounced Event handler that works on in the Search field
const searchBox = document.getElementById('searchBox')
const debouncedHandler = debounce(findMovie, 1000)
searchBox.addEventListener('input', debouncedHandler)
