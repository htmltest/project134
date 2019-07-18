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