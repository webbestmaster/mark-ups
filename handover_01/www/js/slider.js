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
            centeredSlides: true // diff of normal
        }
    };

    function init() {

        var curState = doc.documentElement.clientWidth >= desctopWidth ? 'desctop' : 'mobile';

        if (prevState === curState) { // do not anything if state is equal
            return;
        }

        prevState = curState;

        if (curState === 'desctop') {
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

    $(window).on('load resize', init);

}(window, window.document));
