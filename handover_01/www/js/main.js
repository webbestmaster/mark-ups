(function (win, doc) {

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

    win.addEventListener('load', function () {
        bindScrollToNode();
    }, false);

}(window, window.document));
