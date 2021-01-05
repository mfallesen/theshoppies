
// be sure to replace the search term with the input field value


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

//   const debounce = (callback, time) => {
//     let interval;
//     return (...args) => {
//       clearTimeout(interval);
//       interval = setTimeout(() => {
//         interval = null;
//         callback(...args);
//       }, time);
//     };
//   };

async function findMovie(event) {
    event.preventDefault()

    const resultBox = document.getElementById('movie-results')
    resultBox.innerHTML = "";

    let movie = document.getElementById("searchBox").value
    const query_url = `http://www.omdbapi.com/?apikey=2afe3024&s=${movie}&type=movie`


    fetch(query_url)
        .then(response => response.json())
        .then((data) => {
            // console.log(data);
            let options = data.Search;
            // console.log(options);

            if (options != undefined) {

                // loop through options and make cards for each
                for (let i = 0; i < options.length; i++) {

                    const title = options[i].Title;
                    const year = options[i].Year;
                    let poster = options[i].Poster;

                    if (poster === 'N/A') {
                        poster = "./assets/images/picture-not-available-clipart-12.jpg"
                    }

                    console.log(resultBox);

                    const newCard = `<div class="flex-center card movie-card">
                                        <h3 id="movieNo">${title}</h2>
                                        <p id="movieYear">${year}</p>
                                        <img src="${poster}" alt="${title} poster" id="moviePoster">
                                        <button id="nominateMovie">Nominate me!</button>
                                    </div>`

                    resultBox.insertAdjacentHTML('beforeend', newCard);

                }
            } else {
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

let searchBox = document.getElementById('searchBox')


const debouncedHandler = debounce(findMovie, 1000)





searchBox.addEventListener('input', debouncedHandler)








// function bounce(evt) {
//     debounce(findMovie(evt), 1000);
// }


// , (evt) => {
//     console.log("eventlistener fire");
//     debounce(findMovie(evt), 1000);
// }
// searchBtn.onclick = findMovie;