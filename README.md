# Weather-App

This project is a Weather App that allows users to search for weather information of different cities. Users can enter a city name or use their current location to retrieve the weather data.

## HTML Structure

The HTML file contains the basic structure of the web page. It includes the following elements:

- Top banner: Displays the app logo, heading, search input, search button, and language options.
- Ajax section: Displays the weather information of the searched cities in a grid layout.
- Footer: Displays the attribution for the app.

## CSS Styling

The CSS file (style.css) provides custom styling for various elements in the project. Here are some key styling features:

- Background colors: Defines custom background colors for different sections of the app.
- Typography: Sets font styles, sizes, and colors for the text content.
- Layout: Defines the positioning and spacing of elements, including flexbox and grid layouts.
- Responsive design: Includes media queries to adjust the layout for different screen sizes.

## JavaScript Functionality

The JavaScript file (app.js) provides the dynamic functionality of the Weather App. It includes the following features:

- Form submit: Handles the form submission event to retrieve weather data based on the user's input.
- Location button: Allows users to retrieve weather data based on their current location.
- Language button: Enables users to switch between different languages (English and German).
- API integration: Makes requests to the OpenWeatherMap API to fetch weather data for the specified cities.
- Display data: Renders the retrieved weather data on the web page, including city name, temperature, weather description, and weather icon.
- Error handling: Displays appropriate error messages if the city is not found or an error occurs during the API request.

## API Key

The Weather App uses the OpenWeatherMap API to retrieve weather data. To run the app, you need to obtain an API key from OpenWeatherMap and replace the `apiKey` variable in the JavaScript file (app.js) with your own API key.

## Usage

1. Enter a city name in the search input and click the "Search" button to retrieve the weather data for that city.
2. Click the location button to retrieve the weather data based on your current location.
3. Use the language button to switch between English and German.
4. The weather data for each city will be displayed in the Ajax section in a grid layout.
5. To remove a city from the list, click the "X" button next to the city name.

