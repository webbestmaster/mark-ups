(function (win, doc) {

    "use strict";

    function initMap() {
        var map = new google.maps.Map(doc.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
    }

    win.initMap = initMap;

}(window, window.document));
