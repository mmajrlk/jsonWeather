var weatherAPI = '6b21291040346db93ca363242f3dfc26';
var weatherURL = 'http://api.openweathermap.org/data/2.5/weather';
var weatherUnits;
var weatherSuffix;

//Hide JavaScript Error message



function printErrorMessage(message){
	$('.errorMessage').text(message).hide().slideDown();
}

function clearErrorMessage(){
	$('.errorMessage').text('').slideUp();
}

clearErrorMessage();

//Check if they have GPS
if (!Modernizr.geolocation) {
	$('.gpsIntro').hide();
	$('.gpsForm').hide();
}

//On GPS click
$('.locationGPS').on('click', function() {
	//Try to get corrd from their GPS
	navigator.geolocation.getCurrentPosition(gpsSuccess,gpsFail);
	//hide location form and replace with 'Checking location...'
});

function gpsSuccess (position){
	var locationData = [position.coords.latitude, position.coords.longitude];
	weatherUnits = $('input:radio[name=measureSystem]:checked').val();
	//Sucess run findWeather([lat, long], true) with corrd
	findWeather(locationData, true);
}

function gpsFail (message){
	if (message.code === 1){
		printErrorMessage('To find your GPS information please allow this page access to your GPS.');
	} else {
		printErrorMessage('There was an error getting your GPS data. Please try again.');
	}
}
	
		
		//Error something went wrong. Sorry we couldn't get your corrd, try again
		//Error they cancled. You need to let us use your GPS for this feature to work.

//On submit button click
$('.locationZipcodeSubmit').on('click', function() {
	var zipcode = $('.locationZipcode').val();
	weatherUnits = $('input:radio[name=measureSystem]:checked').val();
	//Check to see if anything has been entered in the box
	if (zipcode) {
		//Sucess run findWeather([code], false) with zip
		findWeather(zipcode, false);
	} else {
		//Error Please add a zip code to the box.
		printErrorMessage('Please add a zipcode.');
	}
	
});

//fucntion findWeather (locationData, GPS)
function findWeather (locationData, GPS) {

	//hide form and display loading text

	//If GPS
	if (GPS) {
		//store lat and long in a var
		var weatherAPIData = {
			lat: locationData[0],
			lon: locationData[1],
			units: weatherUnits,
			APPID: weatherAPI
		}

	} else {
		//add that var to the weather api and send
		var weatherAPIData = {
			zip: locationData+',us',
			units: weatherUnits,
			APPID: weatherAPI
		}
	}

	console.log(weatherURL);

	$.getJSON(weatherURL, weatherAPIData, function(data) {
			printWeather(data);
		}).fail( function(){
			//hide loading text
			//bring back location form
			printErrorMessage('There was a problem getting your weather information. Please try again.');
		});
		//deactivate fields and new location buttons and loading icon?
		//success printWeather()
		//errors?
}

function printWeather(data) {
	setSuffix();
	console.log(data);
	//hide form fields
	//get weather icon and translate to our icon set
	var weatherIcon = 'wi wi-owm-' + data.weather[0].id;
	//build out each part of weather data
	$('i.wi').removeClass().addClass(weatherIcon);
	$('.locationName').text(data.name);
	$('.coord .data0').text(data.coord.lon+weatherSuffix.none);
	$('.coord .data1').text(data.coord.lat+weatherSuffix.none);
	$('.description .data0').text(data.weather[0].main);
	$('.description .data1').text(data.weather[0].description);
	$('.currentTemp .data0').text(data.main.temp+weatherSuffix.temp);
	$('.maxMinTemp .data0').text(data.main.temp_max+weatherSuffix.temp);
	$('.maxMinTemp .data1').text(data.main.temp_min+weatherSuffix.temp);
	$('.wind .data0').text(data.wind.speed+weatherSuffix.dist);
	$('.wind .data1').text(data.wind.deg);
	if (data.rain){$('.rainAmount .data0').text(data.rain['1h']+weatherSuffix.amnt);}else{$('.rainAmount .data0').text('0');}
	if (data.snow){$('.snowAmount .data0').text(data.snow['1h']+weatherSuffix.amnt);}else{$('.snowAmount .data0').text('0');}
	$('.updateTime .data0').text(new Date(data.dt).toLocaleTimeString());

	//print data to weather container
	//add update or new location below weather container
		//on update click
			//findWeahter (locationData, GPS)
		//on new location click
			//clear weather container and update/newlocaiton buttons
			//display form fields
}

//Sets suffix based on units used.
function setSuffix() {
	if (weatherUnits === 'metric'){
		weatherSuffix = {
			none: '\xB0',
			temp: '\xB0C',
			dist: 'kph',
			amnt: 'cm'
		}
	} else {
		weatherSuffix = {
			none: '\xB0',
			temp: '\xB0F',
			dist: 'mph',
			amnt: 'in'
		}
	}
}

