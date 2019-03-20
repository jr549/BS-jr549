﻿document.getElementById("txtZip").focus();
var app = angular.module('weather', []);
app.controller('weatherCtrl', function ($scope, $http) {
    $scope.user = { zip: { required: true, maxlength: 5, minlength: 5, invalid: false } }
    $scope.GetIt = function () {
        var zip = document.getElementById("txtZip").value;
        var url = "http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=0r7BwLqbTB0spDaXXbBbaQHCivpAjbMW&q=" + zip;
        var city = "", state = "", error = "", locationKey="";

        $http.get(url).then(function (response) {

            try {
                //city = response.data.location.city;
                city = response.data[0].LocalizedName;
                //state = response.data.location.state;
                state = response.data[0].AdministrativeArea.LocalizedName;
                locationKey = response.data[0].Key;
                // $scope.geoLookup = response.data.location;
                $scope.geoLookup = response.data[0];
                //url = "https://api.wunderground.com/api/c155ff36ff80f3df/conditions/q/" + state + "/" + city + ".json";
                url = "http://dataservice.accuweather.com/currentconditions/v1/" + locationKey + "?apikey=0r7BwLqbTB0spDaXXbBbaQHCivpAjbMW&details=true"
                
                $http.get(url).then(function (response) {
                    $scope.conditions = response.data[0];                   
                    var pressureTrendText = "";                   
                    $scope.pressureTrend = pressureTrendText;
                    var path = "content/sunny.png";
                    //var currCond = response.data.current_observation.weather;
                    var currCond = $scope.conditions.WeatherText;
                    if (currCond.toLowerCase() == "cloudy")
                        path = "content/partly_cloudy.png";
                    else if (currCond.toLowerCase() == "mostly cloudy")
                        path = "content/mostly_cloudy.png";
                    else if (currCond.toLowerCase() == "scattered clouds")
                        path = "content/partly_cloudy.png";
                    else if (currCond.toLowerCase().indexOf("overcast") !== -1)
                        path = "content/cloudy.png";                    
                    else if (currCond.toLowerCase().indexOf("sunny") !== -1)
                        path = "content/sunny.png";
                    else if (currCond.toLowerCase().indexOf("clear") !== -1)
                        path = "content/sunny.png";
                    else if (currCond.toLowerCase().indexOf("showers") !== -1)
                        path = "content/showers.png";
                    else if (currCond.toLowerCase().indexOf("rain") !== -1)
                        path = "content/showers.png";
                    else if (currCond.toLowerCase().indexOf("drizzle") !== -1)
                        path = "content/showers.png";
                    else if (currCond.toLowerCase().indexOf("snow") !== -1)
                        path = "content/snowy.png";
                    else if (currCond.toLowerCase().indexOf("flurries") !== -1)
                        path = "content/snowy.png";
                    else if (currCond.toLowerCase().indexOf("wintry") !== -1)
                        path = "content/snowy.png";
                    else if (currCond.toLowerCase().indexOf("tstms") !== -1)
                        path = "content/thunderstorms.png";
                    else if (currCond.toLowerCase().indexOf("thunderstorms") !== -1)
                        path = "content/thunderstorms.png";
                    else if (currCond.toLowerCase().indexOf("wind") !== -1)
                        path = "content/windy.png";
                    else if (currCond.toLowerCase().indexOf("blustery") !== -1)
                        path = "content/windy.png";
                    else if (currCond.toLowerCase().indexOf("breezy") !== -1)
                        path = "content/windy.png";

                    $scope.path = path;
                    document.getElementById("imagePath").setAttribute("src", path);
                    document.getElementById("divCurrent").classList.add("show");
                }), function (error) {
                    $scope.jsonx = response.statusText;
                };
            }
            catch (error) {
                $scope.geoLookup = response.data.response.error;
                document.getElementById("divCurrent").classList.remove("show");
            }

        }), function (error) {
            $scope.jsonx = response.statusText;
        };
    }
});
