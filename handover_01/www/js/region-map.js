var dataFromSetver = {
    "data": [
        {
            "lat": -25.363,
            "lng": 131.044,
            "country": "South Korea",
            "point": "Jeju Island",
            "description": "Sun bathe peer out window, chatter at birds, lure them to mouth but purr while eating chew iPad power cord.",
            "page-url": "#",
            "preview": "img/promo-map/jeju-island.jpg",
            "inner-cards": [
                {
                    "img": "path-to-img",
                    "header": "Seoul",
                    "description": "Tropical Fruit World"
                },
                {
                    "img": "path-to-img",
                    "header": "Seoul",
                    "description": "Tropical Fruit World"
                },
                {
                    "img": "path-to-img",
                    "header": "Seoul",
                    "description": "Tropical Fruit World"
                }
            ]
        },
        {
            "lat": -25.363 + 1,
            "lng": 131.044 + 1,
            "country": "South Korea 2",
            "point": "Jeju Island 2",
            "description": "Sun!!! bathe peer out window, chatter at birds, lure them to mouth but purr while eating chew iPad power cord.",
            "page-url": "#",
            "preview": "img/promo-map/kyoto.jpg",
            "inner-cards": [
                {
                    "img": "path-to-img",
                    "header": "Seoul",
                    "description": "Tropical Fruit World"
                },
                {
                    "img": "path-to-img",
                    "header": "Seoul",
                    "description": "Tropical Fruit World"
                },
                {
                    "img": "path-to-img",
                    "header": "Seoul",
                    "description": "Tropical Fruit World"
                }
            ]
        },
        {
            "lat": -25.363 + 0.5,
            "lng": 131.044 + 0.5,
            "country": "South Korea 2",
            "point": "Jeju Island 2",
            "description": "Sun bathe peer out window, chatter at birds, lure them to mouth but purr while eating chew iPad power cord.",
            "page-url": "#",
            "preview": "img/promo-map/jeju-island.jpg",
            "inner-cards": [
                {
                    "img": "path-to-img",
                    "header": "Seoul",
                    "description": "Tropical Fruit World"
                },
                {
                    "img": "path-to-img",
                    "header": "Seoul",
                    "description": "Tropical Fruit World"
                },
                {
                    "img": "path-to-img",
                    "header": "Seoul",
                    "description": "Tropical Fruit World"
                }
            ]
        }

    ],
    "meta": {
        "name": "Ebash karty, bleat\'!!!"
    }
};


(function (win, doc) {

    "use strict";

    var map;
    
    var pathToMapPoint = 'i/map/map-point.svg';

    function RegionMap() {

        var mapNode = doc.querySelector('.js-google-promo-map');

        if (!mapNode) {
            return;
        }

        this._mapNode = mapNode;

        this._mapData = dataFromSetver;

        this._map = new google.maps.Map(mapNode, {
            center: this._mapData.data[0],
            zoom: 8
        });

        this._markers = [];

        this._addStyle();
        this._addMarkers();

    }

    RegionMap.prototype._addStyle = function () {

        var style = doc.createElement('style');

        style.innerText = this._mapData.data
                .map(function (marker) {
                    return 'img[src="' + marker.preview + '"]';
                })
                .join(', ') + ' { border-radius: 50%; }';

        doc.head.appendChild(style);

    };

    RegionMap.prototype._addMarker = function (pointData) {

        var regionMap = this,
            map = regionMap._map,
            marker = new google.maps.Marker({
                position: {lat: pointData.lat, lng: pointData.lng},
                // map: map,
                draggable: false,
                icon: pathToMapPoint,
                optimized: false
                // title: pointData.point
            });

/*
        google.maps.event.addDomListener(window, 'load', function () {
            var $markerWrapper = $('div[title="' + pointData.point + '"]');

            $markerWrapper
                .removeAttr('title')
                .attr('data-point-name', pointData.point);

        });
*/

        google.maps.event.addDomListener(marker, 'mouseover', function () {

            var mapNode = this._mapNode;

            marker.set('icon', pointData.preview);

            win.util.waitFor(function () {
                return $('img[src="' + pointData.preview + '"]', mapNode).length;
            }, 1000).then(function () {
                $('img[src="' + pointData.preview + '"]', mapNode).parent().each(function () {
                    $(this).addClass('map-point-hovered');
                });
            }).catch(function () {
                console.log('--- can not find image ---');
            });

        });

        google.maps.event.addDomListener(marker, 'mouseout', function () {

            $('.map-point-hovered').removeClass('map-point-hovered');

            var $imgs =  $('img[src="' + pointData.preview + '"]');

            if ($imgs.parent().hasClass('map-point-clicked')) {
                return;
            }

            marker.set('icon', pathToMapPoint);

        });

        google.maps.event.addDomListener(marker, 'click', function () {

            regionMap._markers.forEach(function (marker) {
                marker.set('icon', pathToMapPoint);
            });

            $('.map-point-clicked').removeClass('map-point-clicked');
            $('.map-point-hovered').removeClass('map-point-hovered');

            marker.set('icon', pointData.preview);

            $('img[src="' + pointData.preview + '"]').parent().each(function () {
                $(this).addClass('map-point-clicked');
            });

        });

        marker.setMap(map);

        return marker;

    };

    RegionMap.prototype._addMarkers = function () {

        var regionMap = this,
            mapData = regionMap._mapData;

        this._markers = mapData.data.map(regionMap._addMarker, this);

    };


    /*
     RegionMap.prototype._bindPointEvents = function () {

     var regionMap = this,
     points = regionMap._points;

     points.forEach(function (point) {

     google.maps.event.addListener(point, 'mouseover', function () {

     $('div[data-point-name="' + point.title + '"]').animate({opacity: 0.1});

     });


     });

     };
     */

    /*   function addMarkersToMap() {

     var image = 'i/poi';

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
     */
    win.initMap = function () {
        new RegionMap();
    };

}(window, window.document));
