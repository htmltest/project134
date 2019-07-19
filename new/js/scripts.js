$(document).ready(function() {

    $('.time_info-close').click(function(e) {
        $(this).parent().fadeOut();
        e.preventDefault();
    });

    $('.kr-score-radio').click(function() {
        var curRadio = $(this);
        var curBlock = curRadio.parent().parent();
        curBlock.find('.kr-score-radio.active').removeClass('active');
        curRadio.addClass('active');
        curBlock.find('input').val(curRadio.text()).trigger('change');
    });

});

$(window).on('load resize scroll', function() {
    $('.expert-request-score-window').each(function() {
        if ($(window).scrollTop() > $('.expert-request-score-window').parents().filter('.entry').offset().top) {
            $('.expert-request-score-window').addClass('visible');
        } else {
            $('.expert-request-score-window').removeClass('visible');
        }
    });
});