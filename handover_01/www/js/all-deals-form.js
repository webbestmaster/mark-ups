(function () {

    "use strict";

    function init() {

        var nodeForm = document.querySelector('.js-all-deals-form'),
            $form = $(nodeForm);

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




    }

    $(window).on('load', init);

}());
