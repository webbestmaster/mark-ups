(function(win, doc) {

    'use strict';


    $(win).on('load', function() {
        // scroll to node on click
        function onClickScrollToNode(e) {

            var node = e.currentTarget,
                selector = '.' + node.getAttribute('data-js-scroll-to'),
                targetNode = doc.querySelector(selector);

            targetNode.scrollIntoView();

        }

        var $nodes = $('.js-scroll-to-node');

		$nodes.each(function() {
			$(this).on('click', onClickScrollToNode)
		});

    });

}(window, window.document));
