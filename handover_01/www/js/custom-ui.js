(function(win, doc) {

    'use strict';

    $(win).on('load', function() {

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

    });

}(window));