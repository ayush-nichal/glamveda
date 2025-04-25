var google;

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    // var myLatlng = new google.maps.LatLng(40.71751, -73.990922);
    var myLatlng = new google.maps.LatLng(18.485786447799935, 73.8542070946499);
    // 39.399872
    // -8.224454
    
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 17,

        // The latitude and longitude to center the map (always required)
        center: myLatlng,

        // How you would like to style the map. 
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            }
        ]
    };

    

    // Ensure the map element exists
    var mapElement = document.getElementById('map');
    if (!mapElement) {
        console.error('Map element with ID "map" not found.');
        return;
    }

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    
    var addresses = ['New York'];

    for (var x = 0; x < addresses.length; x++) {
        $.getJSON(
            'https://maps.googleapis.com/maps/api/geocode/json?address=' + addresses[x] + '&key=AIzaSyBzHJwb3WCtlractWN07moDF0a88savtVA',
            null,
            function (data) {
                if (data.status === 'OK') {
                    var p = data.results[0].geometry.location;
                    var latlng = new google.maps.LatLng(p.lat, p.lng);
                    new google.maps.Marker({
                        position: latlng,
                        map: map,
                        icon: undefined
                    });
                } else {
                    console.error('Geocoding API error:', data.status, data.error_message);
                }
            }
        ).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Failed to fetch geocoding data:', textStatus, errorThrown);
        });
    }
}

google.maps.event.addDomListener(window, 'load', init);