(function (win, doc) {

    "use strict";

    function init() {

        var nodeForm = doc.querySelector('.js-all-deals-form'),
            $form = $(nodeForm),
            $fadeForm = $('.js-all-deals-form__mobile-fade');

        if (!nodeForm) {
            return;
        }

        // calendar
        $('.js-range-date-picker').daterangepicker();

        // full form reset
        $('.js-deals-form-section__reset-all').on('click', function (e) {

            e.preventDefault();

            nodeForm.reset();

            // reset price ranger
            $form.find('.js-irs-range-input').each(function () {
                $(this).data('ionRangeSlider').reset();
            });

            // reset calendar
            $form.find('.js-range-date-picker').each(function () {
                var daterangepicker = $(this).data('daterangepicker'),
                    now = moment();
                daterangepicker.setStartDate(now);
                daterangepicker.setEndDate(now);
            });

        });

        // fieldset (section of form) reset only
        $('.js-deals-form-section__reset-section').on('click', function () {

            var $fieldset = $(this).closest('fieldset');

            $fieldset.find('.js-deals-form-section__select').each(function () {
                this.selectedIndex = 0;
                $(this).selectmenu('refresh');
            });

            $fieldset.find('.js-deals-form-section__checkboxradio').each(function () {
                this.checked = false;
                $(this).checkboxradio('refresh');
            });

            $fieldset.find('.js-irs-range-input').each(function () {
                $(this).data('ionRangeSlider').reset();
            });

            $fieldset.find('.js-range-date-picker').each(function () {
                var daterangepicker = $(this).data('daterangepicker'),
                    now = moment();
                daterangepicker.setStartDate(now);
                daterangepicker.setEndDate(now);
            });

        });

//        $(win).on('resize', function () {
            // show/hide form, detect is mobile and etc. here
//        });

        // show filter form for mobile
        function showHideFilterMenu() {
            if ($form.hasClass('all-deals-form--mobile-open')) { // hide form
                $form.removeClass('all-deals-form--mobile-open');
                $fadeForm.removeClass('all-deals-form__mobile-fade--visible');
            } else { // show hide
                $form.addClass('all-deals-form--mobile-open');
                $fadeForm.addClass('all-deals-form__mobile-fade--visible');
            }
        }

        $form.on('swipeleft', showHideFilterMenu);

        $fadeForm.on('click', showHideFilterMenu);

        $('.js-open-mobile-filter, .js-all-deals-form__mobile-close').on('click', showHideFilterMenu);

        $('.js-deals-form-section__header').on('click', function () {
            $(this).parent().toggleClass('deals-form-section--mobile-open');
        });


    }

    $(win).on('load', init);

}(window, window.document));
