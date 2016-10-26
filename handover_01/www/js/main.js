(function(win, doc) {

    'use strict';

    function bindScrollToNode() {

        function onClickScrollToNode(e) {

            e.preventDefault();

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
        bindScrollToNode();
        $(".js-deals-form-section__select").selectmenu();
        $(".js-deals-form-section__checkboxradio").checkboxradio();

        $("#range_25").ionRangeSlider({
            type: "double",
            min: 1000,
            max: 2000,
            grid: false
        });

    }, false);

}(window, window.document));