document.getElementById("txtZip").focus();
var app = angular.module('weather', []);
app.controller('weatherCtrl', function ($scope, $http) {
    $scope.user = { zip: { required: true, maxlength: 5, minlength: 5, invalid: false } }
    $scope.GetIt = function () {
        var zip = document.getElementById("txtZip");
        var url = "https://api.wunderground.com/api/c155ff36ff80f3df/geolookup/q/" + zip.value + ".json";
        var city = "", state = "", error = "";

        $http.get(url).then(function (response) {

            try {
                city = response.data.location.city;
                state = response.data.location.state;
                $scope.geoLookup = response.data.location;
                url = "https://api.wunderground.com/api/c155ff36ff80f3df/conditions/q/" + state + "/" + city + ".json";
                $http.get(url).then(function (response) {
                    $scope.conditions = response.data.current_observation;
                    var pressureTrendSymbol = response.data.current_observation.pressure_trend;
                    var pressureTrendText = "rising";
                    if (pressureTrendSymbol == "-") pressureTrendText = "falling";
                    $scope.pressureTrend = pressureTrendText;
                    var path = "content/sunny.png";
                    var currCond = response.data.current_observation.weather;
                    if (currCond == "Partly Cloudy")
                        path = "content/partly_cloudy.png";
                    else if (currCond == "Mostly Cloudy")
                        path = "content/mostly_cloudy.png";
                    else if (currCond == "Scattered Clouds")
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