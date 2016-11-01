(function (win, doc) {

    "use strict";

    function init() {

        var nodeForm = doc.querySelector('.js-all-deals-form'),
            $form = $(nodeForm),
            $fadeForm = $('.js-all-deals-form__mobile-fade');

        if (!nodeForm) {
            return;
        }

        // full form reset
        $('.js-deals-form-section__reset-all').on('click', function () {
            nodeForm.reset();
        });

        // fieldset (section of form) reset only
        $('.js-deals-form-section__reset-section').on('click', function () {

            $(this).closest('fieldset').find('input, select').each(function () {

                var $node = $(this);

                if ($node.hasClass('js-deals-form-section__select')) {
                    this.selectedIndex = 0;
                    $node.selectmenu('refresh');
                    return;
                }

                if ($node.hasClass('js-deals-form-section__checkboxradio')) {
                    this.checked = false;
                    $node.checkboxradio('refresh');
                    return;
                }

            });

        });

        $(win).on('resize', function () {
            // show/hide form, detect is mobile and etc. here
        });

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

        $('.js-open-mobile-filter').on('click', showHideFilterMenu);

        // FIXME - js-deals-form-section__header


    }

    $(win).on('load', init);

}(window, window.document));
