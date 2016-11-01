(function (win, doc) {

    "use strict";

    var DESKTOP = 'desktop';
    var TABLET = 'tablet';
    var MOBILE = 'mobile';

    var DESKTOP_WIDTH = 1200;
    var TABLET_WIDTH = 768;

    function getPlatform() {
        
        var width = doc.documentElement.clientWidth;

        if (width >= DESKTOP_WIDTH) {
            return DESKTOP;
        }

        if (width >= TABLET_WIDTH) {
            return TABLET;
        }

        return MOBILE;

    }

    var swipers = [];

    var prevState;

    var cfg = {
        normal: {
            scrollbar: '.swiper-scrollbar',
            scrollbarHide: true,
            slidesPerView: 'auto',
            spaceBetween: 0,
            grabCursor: false,
            preventClicks: false
        },
        centered: {
            scrollbar: '.swiper-scrollbar',
            scrollbarHide: true,
            slidesPerView: 'auto',
            spaceBetween: 0,
            grabCursor: false,
            preventClicks: false,
            // diff of normal
            centeredSlides: true
        },
        double: {
            scrollbar: '.swiper-scrollbar',
            scrollbarHide: true,
            slidesPerView: 'auto',
            spaceBetween: 0,
            grabCursor: false,
            preventClicks: false,
            // diff of normal
            nextButton: '.horizontal-slider__right-arrow',
            prevButton: '.horizontal-slider__left-arrow'
        }
    };

    function init() {

        var curState = getPlatform();

        if (prevState === curState) { // do not anything if state is equal
            return;
        }

        prevState = curState;

        initDoubleSwiper();

        destroy();

        if (curState === DESKTOP) {
            return;
        }

        var nodes = $('.js-horizontal-scroll, .js-horizontal-scroll--centered-slides');

        swipers = Array.prototype.map.call(nodes, function (node) {

            var $node = $(node);

            $node.addClass('added-swiper');

            if ($node.hasClass('js-horizontal-scroll')) {
                return new Swiper($node, cfg.normal);
            }

            if ($node.hasClass('js-horizontal-scroll--centered-slides')) {

                if (curState === TABLET) {
                    return new Swiper($node, cfg.normal);
                }

                if (curState === MOBILE) {
                    return new Swiper($node, cfg.centered);
                }

            }

        });

    }

    function destroy() {
        swipers.forEach(function (swiper) {
            swiper.wrapper.parent().removeClass('added-swiper');
            swiper.destroy(false, true);
        });
    }

    var doubleSwipers = [];

    function initDoubleSwiper() {

        doubleSwipers.forEach(function (swiper) {
            swiper.wrapper.parent().removeClass('added-swiper');
            swiper.destroy(false, true);
        });

        var platform = getPlatform(),
            nodes = $('.js-double-horizontal-scroll--centered-slides');

        if (platform === DESKTOP) {
            doubleSwipers = Array.prototype.map.call(nodes, function (node) {
                var $node = $(node);
                $node.addClass('added-swiper');
                return new Swiper($node, cfg.double);
            });
        }

        if (platform === TABLET) {
            doubleSwipers = Array.prototype.map.call(nodes, function (node) {
                var $node = $(node);
                $node.addClass('added-swiper');
                return new Swiper($node, cfg.normal);
            });
        }

        if (platform === MOBILE) {
            doubleSwipers = Array.prototype.map.call(nodes, function (node) {
                var $node = $(node);
                $node.addClass('added-swiper');
                return new Swiper($node, cfg.centered);
            });
        }


    }

    $(window).on('load resize', init);

}(window, window.document));
