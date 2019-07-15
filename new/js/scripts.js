$(document).ready(function() {

    $('.time_info-close').click(function(e) {
        $(this).parent().fadeOut();
        e.preventDefault();
    });

});