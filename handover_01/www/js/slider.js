(function(win, doc) {

	win.bestApp = win.bestApp || {};

	var desctopWidth = 1200;

	function SliderMasrer() {


	}

	SliderMasrer.prototype.bindEventListeners = function () {

		$(window).on('resize', this.onRsize);

	} 

	SliderMasrer.prototype.initialize = function (selectors) {

		selectors.forEach(this.initializeSelector, this);

	}

	SliderMasrer.prototype.initializeSelector = function(selector) {

		var nodes = $('selector');

		nodes.each(function() {
			var node = $(this);
		});


	} 	

	SliderMasrer.prototype.onRsize = function() {

		var width = doc.documentElement.clientWidth;

		if (width < desctopWidth) {
			// init sliders
		} else {
			// destroy sliders
		}



	} 	

	win.bestApp.SliderMasrer = SliderMasrer;

}(window, window.document));
