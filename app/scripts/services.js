angular.module('starter.services', [])

.factory('Appartments', function($http) {
    var parseUrl = 'https://www.parse.com/1/classes/stablizedApartments'

    return {
        reverseGeoCode: function(lat, long) {
            var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyBn-ZMKZmQh-FuxUIRzuJyiwlogyrST32Q"
            return $http.get(url).then(function(data) {
                return data.data.results;
            })
        },
        appartmentsByZipcoder: function(zip) {
            var request = {
                method: 'GET',
                url: parseUrl + "?where={%22zipcode%22:" + zip + "}",
                headers: {
                    "X-Parse-Application-Id": "aY1KJaBSFnxfXXaQCKJGDWAPw4k9KLDjH6RulRV1",
                    "X-Parse-REST-API-Key": "XuFYeds4TwGXWJoeNWF4KGRzM0TyhwwtkCqZnWPq"
                }
            }
            return $http.get(parseUrl + "?where={%22zipcode%22:" + zip + "}", {
                headers: {
                    "X-Parse-Application-Id": "aY1KJaBSFnxfXXaQCKJGDWAPw4k9KLDjH6RulRV1",
                    "X-Parse-REST-API-Key": "XuFYeds4TwGXWJoeNWF4KGRzM0TyhwwtkCqZnWPq"
                }
            }).then(function(data) {
                return data.data.results;
            })
        },
        zillow: function() {
            var par = JSON.stringify({
                address: "766 east 9 street",
                city: '',
                state: 'NY',
                zip: '11230'
            })
            return $http.get('https://whispering-bastion-1938.herokuapp.com/api/zillows?param=' + par).then(function(data) {
                console.log(data.data)
            })
        }
    };
})
