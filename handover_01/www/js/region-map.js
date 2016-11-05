(function (win, doc) {

    "use strict";

    var dataFromSetver = {
        "data": [
            {
                "lat": -25.363,
                "lng": 131.044,
                "country": "South Korea",
                "point": "Jeju Island",
                "description": "Sun bathe peer out window, chatter at birds, lure them to mouth but purr while eating chew iPad power cord.",
                "page-url": "#link-to-region3",
                "preview": "img/promo-map/jeju-island.jpg",
                "inner-cards": [
                    {
                        "img": "img/promo-map/point-preview.jpg",
                        "header": "Seoul",
                        "description": "Tropical Fruit World"
                    },
                    {
                        "img": "img/promo-map/point-preview.jpg",
                        "header": "Seoul",
                        "description": "Tropical Fruit World"
                    },
                    {
                        "img": "img/promo-map/point-preview.jpg",
                        "header": "Seoul",
                        "description": "Tropical Fruit World"
                    }
                ]
            },
            {
                "lat": -25.363 + 1,
                "lng": 131.044 + 1,
                "country": "South Korea 2",
                "point": "South Korea 2",
                "description": "Sun!!! bathe peer out window, chatter at birds, lure them to mouth but purr while eating chew iPad power cord.",
                "page-url": "#link-to-region2",
                "preview": "img/promo-map/kyoto.jpg",
                "inner-cards": [
                    {
                        "img": "img/promo-map/point-preview.jpg",
                        "header": "Seoulssdf",
                        "description": "Tropical Fruit Worldasf"
                    },
                    {
                        "img": "img/promo-map/point-preview.jpg",
                        "header": "Seoulsfsa",
                        "description": "Tropical Fruit Worldasf"
                    },
                    {
                        "img": "img/promo-map/point-preview.jpg",
                        "header": "Seoulsfas",
                        "description": "Tropical Fruit Worldsaf"
                    }
                ]
            },
            {
                "lat": -25.363 + 0.5,
                "lng": 131.044 + 0.5,
                "country": "South Korea 2",
                "point": "Jeju Island 2",
                "description": "Sun bathe peer out window, chatter at birds, lure them to mouth but purr while eating chew iPad power cord.",
                "page-url": "#link-to-region1",
                "preview": "img/promo-map/jeju-island.jpg?ee",
                "inner-cards": [
                    {
                        "img": "img/promo-map/point-preview.jpg",
                        "header": "Seoul",
                        "description": "Tropical Fruit World"
                    },
                    {
                        "img": "img/promo-map/point-preview.jpg",
                        "header": "Seoul",
                        "description": "Tropical Fruit World"
                    },
                    {
                        "img": "img/promo-map/point-preview.jpg",
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

    var cardTemplate = [

        '<div class="point-card js-point-card">',

            '<a class="point-card__close js-point-card__close" href="#"></a>',
            '<h3 class="point-card__header">{{= it.country }}</h3>',
            '<h4 class="point-card__local-header">{{= it.point }}</h4>',
            '<p class="point-card__local-description">{{= it.description }}</p>',

            '<div class="scroll-area">',
                '<div class="scroll-area__content">',
                    '{{~ it[\'inner-cards\'] :item }}',
                    '<div class="region-preview-item">',
                        '<img src="{{= item.img }}" alt="" class="region-preview-item__image">',
                        '<h3 class="region-preview-item__header">{{= item.header }}</h3>',
                        '<p class="region-preview-item__paragraph">{{= item.description }}</p>',
                    '</div>',
                    '{{~}}',
                '</div>',
            '</div>',

            '<a href="{{= it[\'page-url\'] }}" class="card-go-to">',
                '<span class="card-go-to__text card-go-to__text--go-to">go to</span>',
                '<span class="card-go-to__text">Jeju Island</span>',
            '</a>',

        '</div>'

    ].join('');

    var cardTemplateFn = doT.compile(cardTemplate);

    // var map;

    var pathToMapPoint = 'i/map/map-point.svg';

    function RegionMap() {

        var regionMap = this,
            mapNode = doc.querySelector('.js-google-promo-map');

        if (!mapNode) {
            return;
        }

        regionMap._mapNode = mapNode;

        regionMap._mapData = dataFromSetver;

        regionMap._map = new google.maps.Map(mapNode, {
            center: regionMap._mapData.data[0],
            zoom: 8
        });

        regionMap._markers = [];

        regionMap._addStyle();
        regionMap._addMarkers();

        regionMap._map.addListener('click', function() {
            regionMap.hideAll();
        });

        if (!mapNode.classList.contains('js-do-not-click')) {
            google.maps.event.addListenerOnce(regionMap._map, 'tilesloaded', function(){
                $('[title="' + regionMap._mapData.data[0].point + '"]').trigger('click');
            });
        }

    }

    RegionMap.prototype.hideAll = function () {

        var regionMap = this;

        regionMap._markers.forEach(function (marker) {
            marker.set('icon', pathToMapPoint);
        });

        $('.map-point-clicked').removeClass('map-point-clicked');

        regionMap.hideCard();

    };

    RegionMap.prototype._addStyle = function () {

        var style = doc.createElement('style'),
            data = this._mapData.data;

        style.innerText = data
                .map(function (marker) {
                    return 'img[src="' + marker.preview + '"]';
                })
                .join(', ') + ' { border-radius: 50%; filter: grayscale(100%); border: 4px solid #fff !important; } '; // FUUUUCKKK!!!!!!

        style.innerText += data
                .map(function (marker) {
                    return 'img[src="' + marker.preview + '"] + .region-map-point__title';
                })
                .join(', ') + ' { display: block; } '; // FUUUUCKKK!!!!!!

        doc.head.appendChild(style);

    };

    RegionMap.prototype.showCard = function (point) {

        var regionMap = this,
            data = regionMap._mapData.data,
            cardData = {},
            html;

        regionMap.hideCard();

        data.every(function (item) {
            if (item.point === point) {
                cardData = item;
                return false;
            }
            return true;
        });

        html = cardTemplateFn(cardData);

        $('.js-promo-map').append(html).find('.js-point-card__close').on('click', function (e) {
            e.preventDefault();
            regionMap.hideAll();
        });

    };

    RegionMap.prototype.hideCard = function () {
        $('.js-point-card').remove();
    };

    RegionMap.prototype._addMarker = function (pointData) {

        var regionMap = this,
            mapNode = regionMap._mapNode,
            map = regionMap._map,
            marker = new google.maps.Marker({
                position: {lat: pointData.lat, lng: pointData.lng},
                // map: map,
                draggable: false,
                icon: pathToMapPoint,
                optimized: false,
                title: pointData.point
            });

        google.maps.event.addDomListenerOnce(win, 'load', function onLoad() {
            $('img[src="' + pathToMapPoint + '"]').parent().addClass('region-map-point');
        });

        google.maps.event.addDomListener(marker, 'mouseover', function () {

            marker.set('icon', pointData.preview);

            win.util.waitFor(function () {
                return $('img[src="' + pointData.preview + '"]', mapNode).length;
            }).then(function () {
                $('img[src="' + pointData.preview + '"]', mapNode).each(function () {
                    var $parent = $(this).parent();
                    if ($parent.find('.region-map-point__title').length) {
                        return;
                    }
                    $parent.append('<span class="region-map-point__title">' + pointData.point + '</span>');
                });
            }).catch(function (e) {
                console.log(e);
                console.log('can not load img');
            });

        });

        google.maps.event.addDomListener(marker, 'mouseout', function () {

            var $imgs = $('img[src="' + pointData.preview + '"]');

            if ($imgs.parent().hasClass('map-point-clicked')) {
                return;
            }

            marker.set('icon', pathToMapPoint);

        });

        google.maps.event.addDomListener(marker, 'click', function () {

            regionMap.hideAll();

            marker.set('icon', pointData.preview);

            regionMap.showCard(marker.title);

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
