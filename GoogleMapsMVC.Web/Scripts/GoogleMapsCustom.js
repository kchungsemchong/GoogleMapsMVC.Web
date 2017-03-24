
var btnSave = document.getElementById('btnSave');
var txtLatitude = document.getElementById('txtLatitude');
var txtLongitude = document.getElementById('txtLongitude');

function initMap() {
    var input = document.getElementById('txtLocation');
    var userPosition;

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12
    });
    var marker = new google.maps.Marker({
        map: map
    });

    var infoWindowDefault = new google.maps.InfoWindow({ map: map });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindowDefault.setPosition(userPosition);
            infoWindowDefault.setContent('You are here.');
            map.setCenter(userPosition);
            marker.setPosition(userPosition)
        }, function () {
            handleLocationError(true, infoWindowDefault, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindowDefault, map.getCenter());
    }


    // Option to set for autocomplete
    var options = {
        types: ['address']
    };

    var autocomplete = new google.maps.places.Autocomplete(input);
    var infowindow = new google.maps.InfoWindow();

    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);

        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);


        var address = '';
        if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');

        }

        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);

        if (place.geometry.location) {
            txtLatitude.value = place.geometry.location.lat();
            txtLongitude.value = place.geometry.location.lng();
        }

        btnSave.disabled = false;
        btnSave.classList.add('btn-success');
    });

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
    }

    if (txtLatitude.value === '' && txtLongitude.value === '') {
        btnSave.disabled = true;
        btnSave.classList.add('btn-danger');
    }

}