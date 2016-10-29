(function(win, doc) {

    win.bestApp = win.bestApp || {};

    'use strict';

    function bindScrollToNode() {

        function onClickScrollToNode(e) {

            var node = e.currentTarget,
                selector = '.' + node.getAttribute('data-js-scroll-to'),
                targetNode = doc.querySelector(selector);

            targetNode.scrollIntoView();

        }

        var selector = '.js-scroll-to-node',
            nodes = doc.querySelectorAll(selector),
            node,
            i, len;

        for (i = 0, len = nodes.length; i < len; i += 1) {
            nodes[i].addEventListener('click', onClickScrollToNode, false);
        }

    }

    win.addEventListener('load', function() {
        bindScrollToNode(); // scroll to node on click

        $('.js-deals-form-section__select').selectmenu(); // custom dropdown
        $('.js-deals-form-section__checkboxradio').checkboxradio(); // custom checkbox

        $('.js-irs-range-input').ionRangeSlider({ // custion range slider
            type: 'double',
            min: 1000,
            max: 2700,
            to: 2000,
            force_edges: true,
            prefix: '$'
        });

        var swiper = new Swiper('.js-horizontal-scroll', {
            scrollbar: '.swiper-scrollbar',
            scrollbarHide: true,
            slidesPerView: 'auto',
            spaceBetween: 0,
            grabCursor: false,
            preventClicks: false
        });


    }, false);

}(window, window.document));