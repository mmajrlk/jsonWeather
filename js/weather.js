api key 6b21291040346db93ca363242f3dfc26


http://api.openweathermap.org/data/2.5/weather?zip=53220,us&APPID=6b21291040346db93ca363242f3dfc26



//Hide JavaScript Error message

//Check if they have GPS
	//If so display use GPS button

//On GPS click
	//Try to get corrd from their GPS
		//Sucess run findWeather([lat, long], true) with corrd
		//Error something went wrong. Sorry we couldn't get your corrd, try again
		//Error they cancled. You need to let us use your GPS for this feature to work.

//On submit button click
	//Check to see if anything has been entered in the box
	//Sucess run findWeather([code], false) with zip
	//Error Please add a zip code to the box.

//fucntion findWeather (locationData, GPS)
	//If GPS
		//store lat and long in a var
		//add that var to the weather api and send
			//deactivate fields and new location buttons and loading icon?
		//success printWeather() and activate fields and buttons;
		//errors?
	//No GPS
		//store zip in a var
		//add that var to the weather api and send
			//deactivate fields and new location buttons and loading icon?
		//success printWeather() and activate fields and buttons;
		//errors?

//function printWeather(JSON)
	//hide form fields
	//parse JSON data
	//get weather icon and translate to our iconset
	//build out each part of weather data
	//print data to weather container
	//add update or new location below weather container
		//on update click
			//findWeahter (locationData, GPS)
		//on new location click
			//clear weather container and update/newlocaiton buttons
			//display form fields
