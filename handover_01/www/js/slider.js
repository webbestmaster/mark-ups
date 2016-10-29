(function (win, doc) {

    var desctopWidth = 1200;

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

        var curState = doc.documentElement.clientWidth >= desctopWidth ? 'desktop' : 'mobile';

        if (prevState === curState) { // do not anything if state is equal
            return;
        }

        initDoubleSwiper();

        prevState = curState;

        if (curState === 'desktop') {
            destroy();
            return;
        }

        var nodes = $('.js-horizontal-scroll, .js-horizontal-scroll--centered-slides');

        swipers = Array.prototype.map.call(nodes, function (node) {

            var $node = $(node);

            if ($node.hasClass('js-horizontal-scroll')) {
                return new Swiper($node, cfg.normal);
            }

            if ($node.hasClass('js-horizontal-scroll--centered-slides')) {
                return new Swiper($node, cfg.centered);
            }

        });

    }

    function destroy() {
        swipers.forEach(function (swiper) {
            swiper.destroy(false, true);
        });
    }

    var doubleSwipers = [];

    function initDoubleSwiper() {

        doubleSwipers.forEach(function (swiper) {
            swiper.destroy(false, true);
        });

        var platform = doc.documentElement.clientWidth >= desctopWidth ? 'desktop' : 'mobile',
            nodes = $('.js-double-horizontal-scroll--centered-slides');


        if (platform === 'mobile') {
            doubleSwipers = Array.prototype.map.call(nodes, function (node) {
                var $node = $(node);
                return new Swiper($node, cfg.centered);
            });
        }

        if (platform === 'desktop') {
            doubleSwipers = Array.prototype.map.call(nodes, function (node) {
                var $node = $(node);
                return new Swiper($node, cfg.double);
            });
        }

/*
        switch (platform) {

            case 'desktop':

                break;

            case 'mobile':

                break;

            default:
                console.log('WAT?!');

        }
*/



    }

    $(window).on('load resize', init);

}(window, window.document));
