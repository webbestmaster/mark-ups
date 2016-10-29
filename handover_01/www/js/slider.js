(function(win, doc) {

	var desctopWidth = 1200;

	var swipers;

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

		destroy();

		if (doc.documentElement.clientWidth >= desctopWidth) {
			return;
		}

		var nodes = $('.js-horizontal-scroll, .js-horizontal-scroll--centered-slides');

		nodes.each(function() {
			var $node = $(this),
				swiper;

			if ($node.hasClass('js-horizontal-scroll')) {
				swiper = new Swiper($node, cfg.normal);
			}

			if ($node.hasClass('js-horizontal-scroll--centered-slides')) {
				swiper = new Swiper($node, cfg.centered);
			}

			return swiper && swipers.push(swiper);

		});
	}

	function destroy() {
		swipers = swipers || [];
		swipers.forEach(function(swiper) {
			swiper.destroy(false, true);
		});
	}

	$(window).on('load resize', init);


}(window, window.document));
