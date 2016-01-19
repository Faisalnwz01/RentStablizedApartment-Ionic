angular.module('starter.controllers', [])

.controller('GradesCtrl', function($scope,
    currentLocation,
    $ionicLoading,
    Appartments,
    $cordovaGeolocation,
    $document,
    $ionicModal,
    $mdToast,
    $ionicPopup,
    $cordovaScreenshot,
    NgMap,
    $filter,
    lodash) {
    //set the api key for the google maps
    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBn-ZMKZmQh-FuxUIRzuJyiwlogyrST32Q";
    //on load revers geocode the lat long to zipcode and get all the appartments from data base
    Appartments.reverseGeoCode(currentLocation.lat, currentLocation.long).then(function(dat) {
        var currentLocationData = dat;
        var zipcode = currentLocationData[0].address_components[7].long_name;
        Appartments.appartmentsByZipcoder(zipcode).then(function(data) {
            $scope.appartments = data;
            console.log(data)
        });
    });


    //show dialog for the single restranuant
    $scope.showAptDialog = function(apt) {
        $scope.selectedAppt = apt;
        $ionicModal.fromTemplateUrl('templates/singlecuisine.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.singleApartment = modal;
            $scope.singleApartment.show();
        });
        var par = JSON.stringify({
            address: {
                address: apt.address,
                city: '',
                state: 'NY',
                zip: apt.zipcode
            },
            apiName: 'GetDeepSearchResults'})
        Appartments.zillow(par).then(function(data) {
            console.log(data)
            $scope.zillowData = data;
        })
    };

    $scope.closeSingleApartment = function() {
        $scope.singleApartment.hide();
        //remove from the dom to destory the map and avoid memory leak :-)
        $scope.singleApartment.remove();
    };
})
