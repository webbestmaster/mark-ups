(function () {

    "use strict";

    function init() {

        var nodeForm = document.querySelector('.js-all-deals-form'),
            $form = $(nodeForm);

        if (!nodeForm) {
            return;
        }

        $('.js-deals-form-section__reset-all').on('click', function () {
            nodeForm.reset();
        });





    }

    $(window).on('load', init);

}());
