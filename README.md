## This is my solution for the take-home Identifix code challenge.
*After downloading and extracting the zip, run an "npm install" to get Bootstrap and jQuery and put them in their right places.*

#### The challenge was to create a simple app that uses the CarQuery API to run a search of car model trims. After perusing the documentation and running some experiments, I got the API to return data with a keyword search. I built the app from there, using jQuery to append the data to the DOM.

#### Issues:
- **Handling situations in which the API returned null or "" for vehicle attributes.** For these, I simply ran a check on them before appending. If there was nothing in the category, I appended an empty string.
- **Figuring out how to best calculate horsepower, since it wasn't one of the parameters given by CarQuery.** In my search through Wikipedia and other such sites, I found algebra to convert Newton-meters to HP, but RPMs were needed and they weren't necessarily defined. I eventually landed on a <a href="http://www.caranddriver.com/columns/larry-webster-horsepower-confusion-and-resolution-column">Car and Driver</a> article which taught me about the unit, Pferdestärke (PS) which is provided by CarQuery. One PS is equal to 0.9863 HP. I applied this to the Chevrolet Corvette from the example, which has a rating of 650HP, and came up with 641hp, quite different from the example of 449hp. I chalked this up to the example using a different source, which was more or less confirmed by a search for Chevrolet's published statistics.
- **Handling errors from the server.** The documentation didn't give me any guidance, so I simply put all my code in a .done and added a .fail to the .getJSON.
- **Dealing with engine naming conventions.** For this I checked to see if the engine type was "V or W" and put no space after it in those cases, otherwise, a space. If there are other engine types that don't need a space between the type and the number of cylinders, I don't know about them yet.