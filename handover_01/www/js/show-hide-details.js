(function () {

    "use strict";

    function init() {

        $('.js-show-hide-details--show').on('click', function () {
            $(this).closest('.js-show-hide-details__parent').addClass('deal-option-card__details--show-interactive-block');
        });

        $('.js-show-hide-details--hide').on('click', function () {
            $(this).closest('.js-show-hide-details__parent').removeClass('deal-option-card__details--show-interactive-block');
        });

    }

    $(window).on('load', init);

}());
