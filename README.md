# The Shoppies
## Content
1. Description
2. Usage
3. Further Development 
4. Technologies
5. License 
6. Contributing

## Descripton
  This is an application developed for the Shopify 2021 Front End Developer Internship Application. It has been build entirely using HTML, CSS and JavaScript without any existing frameworks or libraries. The Idea was to challenge myself to solve issues that might arise from writing just a pure vanilla JS application. The page uses browser locaalstorage to keep track of a users actions and displays choices across multiple searches. The decision was also made to include an automatic search versus using a button click event to search 

## Usage
  This application is very simple to use. The User types in the name of the movie (or search term) to find a movie from OMBDAPI's movie database and the page will conduct the search for the user after one second of inactivity in the input field. There is a limit of 10 results per request (due to limitations by OMBDAPI) so the more narrow a search the more likely the chance of finding the requested movie. Once the movie has been selected it will be placed towards the top of the page where the user can keep track of the movies they have nominate. There is a hard limit of 5 nominations per user and a banner will display telling the user that they have surpassed the nomination limit. Should a user want to change their mind about a selection they can click the Remove Nomination button and it will remove the movie from both the div and the localstorage. 

## Further Development
  This application can be improved in many different ways. The first being to allow the user how they want to search. If they want the site to do the search for them without pushing a button or enter key or if they prefer using it manually. The easiest way of doing this would be a simple toggle switch or checkbox. 

  Another implementation that would be nice to have is to allow the user to create a "watchlist" of movies. The results from the searches can often return interesting movie titles that the user may want to save to watch later. This could be implemented by adding a small icon in a corner of the card that adds the selected movie to a localstorage item that the user will have access to unless they clear their localstorage. The user could then access their watchlist by opening a sidebar that displays all of the infomration for the movie. The sidebar would also allow the user to remove a movie from ther watch list or marking the movie as watched which would reflect on the movie searches. 
  
  As a final addition to the page adding a button to determine the Shoppies winner would be an interactive addition. This would be implemented by storing a few random movies in addition to nominations from each search into localstorage and then randomly picking a winner based on the existing movies that exist in localstorage. The winner could then displayed to the user with the option to start from scratch. 
  
## Technologies Demonstrated

  This Application was built using standard HTML5, CSS3, and JavaScript.
  
## License 

  This application is released under MIT licence. Please credit the author if you utilize part of all of this application as a courtesy.
  
## Contributing
  
  If you would like to contribute to this then please do so by creating an issue with a related pull request that will be reviewed. 
  
