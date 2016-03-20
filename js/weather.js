var weatherAPI = '6b21291040346db93ca363242f3dfc26';

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
	console.log(zipcode);
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

	var weatherURL;
	//hide form and display loading text

	//If GPS
	if (GPS) {
		//store lat and long in a var
		var gpsLat = locationData[0];
		var gpsLong = locationData[1];
		weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat='+gpsLat+'&lon='+gpsLong+'&APPID='+weatherAPI;

	} else {
		//add that var to the weather api and send
		weatherURL = 'http://api.openweathermap.org/data/2.5/weather?zip='+locationData+',us&APPID='+weatherAPI;
	}

	console.log(weatherURL);

	$.post(weatherURL, function(data) {
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
	console.log(data);
	//hide form fields
	//parse JSON data
	//get weather icon and translate to our iconset
	//build out each part of weather data
$('.locationName').text(data.name);
$('.coord').text('(lon: '+data.coord.log+' lat: '+data.coord.lat+')');
$('.description .data').text(data.name);
$('.currentTemp .data').text(data.name);
$('.maxMinTemp .data').text(data.name);
$('.wind .data').text(data.name);
$('.rainSnow .data').text(data.name);
$('.updateTime .data').text(data.name);

	//print data to weather container
	//add update or new location below weather container
		//on update click
			//findWeahter (locationData, GPS)
		//on new location click
			//clear weather container and update/newlocaiton buttons
			//display form fields
}

