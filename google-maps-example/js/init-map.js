(function (win, doc) {

    "use strict";

    var map;

    var myLatLng = {lat: -25.363, lng: 131.044};

    function initMap() {
        map = new google.maps.Map(doc.getElementById('map'), {
            center: myLatLng,
            zoom: 8
        });


        addPointsToMap();


    }

    function addPointsToMap() {

        var image = 'i/beachflag.png';

        var marker = new google.maps.Marker({
            position: myLatLng,
            // map: map,
            draggable: true,
            icon: image,
            optimized: false,
            title: 'Hello World!'
        });

        google.maps.event.addListener(marker,'mouseover',function(){
            $('img[src="'+this.icon+'"]').stop().animate({opacity:1});
        });

        google.maps.event.addListener(marker,'mouseout',function(){
            $('img[src="'+this.icon+'"]').stop().animate({opacity:.5});
        });

        marker.setMap(map);

        map.panTo({lat: -25.363 + 1, lng: 131.044 + 1});

        // to remove
        // marker.setMap(null);

    }

    win.initMap = initMap;

}(window, window.document));
