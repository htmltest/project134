$(document).ready(function() {

    $('.time_info-close').click(function(e) {
        $(this).parent().fadeOut();
        e.preventDefault();
    });

    $('.success_info-close').click(function(e) {
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

    $('.riepp-score-view-link').click(function(e) {
        $('.riepp-score').toggleClass('open');
        resizeRieppScores();
        $(window).trigger('scroll');
        e.preventDefault();
    });

    $('.riepp-scores').each(function() {
        var curBlock = $(this);
        var headerTitle = curBlock.find('.riepp-scores-header-title').html();
        var headerName = curBlock.find('.riepp-scores-header-name').html();
        var headerWeight = curBlock.find('.riepp-scores-header-weight').html();
        var headerSumm = curBlock.find('.riepp-scores-header-summ').html();

        var countScores = scores.summ.scores.length;
        var newHTML = '<div class="riepp-scores-list-summ">';
        var scoresHTML = '';
        for (var i = 0; i < countScores; i++) {
            if (scores.summ.scores[i].summ == '') {
                scores.summ.scores[i].summ = '&nbsp;';
            }
            newHTML += '<div class="riepp-scores-list-summ-item"><div class="riepp-scores-list-summ-item-col">' + scores.summ.scores[i].score + '</div><div class="riepp-scores-list-summ-item-col">' + scores.summ.scores[i].summ + '</div></div>';
            var notScoreClass = '';
            if (typeof (scores.summ.scores[i].not) != 'undefined') {
                notScoreClass = ' riepp-not-score';
            }
            scoresHTML += '<div class="riepp-scores-summ-scores-item"><div class="riepp-scores-summ-scores-item-user ' + notScoreClass + '">' + scores.summ.scores[i].user + '</div><div class="riepp-scores-summ-scores-item-value">' + scores.summ.scores[i].score + '</div></div>';
        }
        newHTML += '</div>';
        curBlock.find('.riepp-scores-list-inner').append(newHTML);
        curBlock.append('<div class="riepp-scores-summ">' +
                            '<div class="riepp-scores-summ-title">' + scores.summ.title + '</div>' +
                            '<div class="riepp-scores-summ-name">&nbsp;</div>' +
                            '<div class="riepp-scores-summ-all">' + scores.summ.summ_all + '</div>' +
                            '<div class="riepp-scores-summ-scores"><div class="riepp-scores-summ-scores-inner">' + scoresHTML + '</div></div>' +
                        '</div>');

        for (var groupIndex = 0; groupIndex < scores.groups.length; groupIndex++) {
            var curGroup = scores.groups[groupIndex];
            curBlock.append('<div class="riepp-scores-group">' +
                                '<div class="riepp-scores-group-title"><div class="riepp-scores-label">' + headerTitle + '</div>' + curGroup.title + '</div>' +
                                '<div class="riepp-scores-group-name"><div class="riepp-scores-label">' + headerName + '</div>' + curGroup.name + '</div>' +
                                '<div class="riepp-scores-group-weight"><div class="riepp-scores-label">' + headerWeight + '</div>' + curGroup.weight + '</div>' +
                            '</div>');
            var countUsers = scores.groups[0].criterions[0].scores.length;
            var newHTML = '<div class="riepp-scores-list-group">';
            for (var i = 0; i < countUsers; i++) {
                newHTML += '<div class="riepp-scores-list-group-item">&nbsp;</div>';
            }
            newHTML += '</div>';
            curBlock.find('.riepp-scores-list-inner').append(newHTML);

            for (var criterionIndex = 0; criterionIndex < curGroup.criterions.length; criterionIndex++) {
                var curCriterion = curGroup.criterions[criterionIndex];
                var countScores = curCriterion.scores.length;
                var newHTML = '<div class="riepp-scores-list-criterion">';
                var scoresHTML = '';
                for (var i = 0; i < countScores; i++) {
                    if (curCriterion.scores[i].summ == '') {
                        curCriterion.scores[i].summ = '&nbsp;';
                    }
                    newHTML += '<div class="riepp-scores-list-criterion-item"><div class="riepp-scores-list-criterion-item-col">' + curCriterion.scores[i].score + '</div><div class="riepp-scores-list-criterion-item-col">' + curCriterion.scores[i].summ + '</div></div>';
                    var notScoreClass = '';
                    if (typeof (curCriterion.scores[i].not) != 'undefined') {
                        notScoreClass = ' riepp-not-score';
                    }
                    scoresHTML += '<div class="riepp-scores-criterion-scores-item"><div class="riepp-scores-criterion-scores-item-user ' + notScoreClass + '">' + curCriterion.scores[i].user + '</div><div class="riepp-scores-criterion-scores-item-value">' + curCriterion.scores[i].score + '</div></div>';
                }
                newHTML += '</div>';
                curBlock.find('.riepp-scores-list-inner').append(newHTML);

                curBlock.append('<div class="riepp-scores-criterion">' +
                                    '<div class="riepp-scores-criterion-number">' + curCriterion.number + '</div>' +
                                    '<div class="riepp-scores-criterion-title"><div class="riepp-scores-label">' + headerTitle + '</div>' + curCriterion.title + '</div>' +
                                    '<div class="riepp-scores-criterion-name"><div class="riepp-scores-label">' + headerName + '</div>' + curCriterion.name + '</div>' +
                                    '<div class="riepp-scores-criterion-weight"><div class="riepp-scores-label">' + headerWeight + '</div>' + curCriterion.weight + '</div>' +
                                    '<div class="riepp-scores-criterion-scores"><div class="riepp-scores-criterion-scores-inner">' + scoresHTML + '</div></div>' +
                                    '<div class="riepp-scores-criterion-summ"><div class="riepp-scores-label">' + headerSumm + '</div>' + curCriterion.summ + '</div>' +
                                '</div>');

                for (var itemIndex = 0; itemIndex < curCriterion.items.length; itemIndex++) {
                    var curItem = curCriterion.items[itemIndex];
                    var newHTML = '<div class="riepp-scores-list-row">';
                    var scoresHTML = '';
                    for (var i = 0; i < countScores; i++) {
                        newHTML += '<div class="riepp-scores-list-row-item">&nbsp;</div>';
                        scoresHTML += '<div class="riepp-scores-item-scores-item">&nbsp;</div>';
                    }
                    newHTML += '</div>';
                    curBlock.find('.riepp-scores-list-inner').append(newHTML);
                    curBlock.append('<div class="riepp-scores-item">' +
                                        '<div class="riepp-scores-item-number">' + curItem.number + '</div>' +
                                        '<div class="riepp-scores-item-scores"><div class="riepp-scores-item-scores-inner">' + scoresHTML + '</div></div>' +
                                        '<div class="riepp-scores-item-title">' + curItem.title + '</div>' +
                                    '</div>');
                }
                if (groupIndex == 0 && criterionIndex == 0) {
                    for (var criterionScoreIntex = 0; criterionScoreIntex < curCriterion.scores.length; criterionScoreIntex++) {
                        var notScoreClass = '';
                        if (typeof (curCriterion.scores[criterionScoreIntex].not) != 'undefined') {
                            notScoreClass = ' riepp-not-score';
                        }
                        curBlock.find('.riepp-scores-list-header').append('<div class="riepp-scores-list-header-item' + notScoreClass + '">' + curCriterion.scores[criterionScoreIntex].user + '</div>');
                    }
                }
            }
        }

        var countScores = scores.summ.scores.length;
        var newHTML = '<div class="riepp-scores-list-summ">';
        var scoresHTML = '';
        for (var i = 0; i < countScores; i++) {
            newHTML += '<div class="riepp-scores-list-summ-item"><div class="riepp-scores-list-summ-item-col">' + scores.summ.scores[i].score + '</div><div class="riepp-scores-list-summ-item-col">' + scores.summ.scores[i].summ + '</div></div>';
            var notScoreClass = '';
            if (typeof (scores.summ.scores[i].not) != 'undefined') {
                notScoreClass = ' riepp-not-score';
            }
            scoresHTML += '<div class="riepp-scores-summ-scores-item"><div class="riepp-scores-summ-scores-item-user ' + notScoreClass + '">' + scores.summ.scores[i].user + '</div><div class="riepp-scores-summ-scores-item-value">' + scores.summ.scores[i].score + '</div></div>';
        }
        newHTML += '</div>';
        curBlock.find('.riepp-scores-list-inner').append(newHTML);
        curBlock.append('<div class="riepp-scores-summ">' +
                            '<div class="riepp-scores-summ-title">' + scores.summ.title + '</div>' +
                            '<div class="riepp-scores-summ-name">&nbsp;</div>' +
                            '<div class="riepp-scores-summ-all">' + scores.summ.summ_all + '</div>' +
                            '<div class="riepp-scores-summ-scores"><div class="riepp-scores-summ-scores-inner">' + scoresHTML + '</div></div>' +
                        '</div>');

        resizeRieppScores();

        curBlock.find('.riepp-scores-list').mCustomScrollbar({
            axis: 'x',
            scrollButtons: {enable: true},
            callbacks:{
                whileScrolling: function() {
                    if (this.mcs.left == 0) {
                        curBlock.find('.riepp-scores-list').removeClass('isLeft');
                    } else {
                        curBlock.find('.riepp-scores-list').addClass('isLeft');
                    }
                    if (this.mcs.leftPct == 100) {
                        curBlock.find('.riepp-scores-list').addClass('isRight');
                    } else {
                        curBlock.find('.riepp-scores-list').removeClass('isRight');
                    }
                }
            }
        });

        curBlock.find('.riepp-scores-criterion-scores').each(function() {
            var curScoresList = $(this);
            curScoresList.mCustomScrollbar({
                axis: 'x',
                callbacks:{
                    whileScrolling: function() {
                        if (this.mcs.left == 0) {
                            curScoresList.removeClass('isLeft');
                        } else {
                            curScoresList.addClass('isLeft');
                        }
                        if (this.mcs.leftPct == 100) {
                            curScoresList.addClass('isRight');
                        } else {
                            curScoresList.removeClass('isRight');
                        }
                    }
                }
            });
        });

        curBlock.find('.riepp-scores-item-scores').each(function() {
            var curScoresList = $(this);
            curScoresList.mCustomScrollbar({
                axis: 'x',
                callbacks:{
                    whileScrolling: function() {
                        if (this.mcs.left == 0) {
                            curScoresList.removeClass('isLeft');
                        } else {
                            curScoresList.addClass('isLeft');
                        }
                        if (this.mcs.leftPct == 100) {
                            curScoresList.addClass('isRight');
                        } else {
                            curScoresList.removeClass('isRight');
                        }
                    }
                }
            });
        });

        curBlock.find('.riepp-scores-summ-scores').each(function() {
            var curScoresList = $(this);
            curScoresList.mCustomScrollbar({
                axis: 'x',
                callbacks:{
                    whileScrolling: function() {
                        if (this.mcs.left == 0) {
                            curScoresList.removeClass('isLeft');
                        } else {
                            curScoresList.addClass('isLeft');
                        }
                        if (this.mcs.leftPct == 100) {
                            curScoresList.addClass('isRight');
                        } else {
                            curScoresList.removeClass('isRight');
                        }
                    }
                }
            });
        });

    });

    $('.riepp-request-affiliated-select-list input').styler('destroy');
    $('.riepp-request-affiliated-select-value').click(function(e) {
        var curSelect = $(this).parent();
        if (curSelect.hasClass('open')) {
            curSelect.removeClass('open');
        } else {
            curSelect.addClass('open');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.riepp-request-affiliated-select').length == 0) {
            $('.riepp-request-affiliated-select.open').removeClass('open');
        }
    });

    $('.riepp-request-affiliated-select-list label input').change(function() {
        $('.riepp-request-affiliated-select-value').html($('.riepp-request-affiliated-select-list label input:checked').parent().find('span').html());
        $('.riepp-request-affiliated-select.open').removeClass('open');
    });

    $('.kr-score-select-list input').styler('destroy');
    $('.kr-score-select-value').click(function(e) {
        var curSelect = $(this).parent();
        if (curSelect.hasClass('open')) {
            curSelect.removeClass('open');
        } else {
            $('.kr-score-select.open').removeClass('open');
            curSelect.addClass('open');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.kr-score-select').length == 0) {
            $('.kr-score-select.open').removeClass('open');
        }
    });

    $('.kr-score-select-list label input').change(function() {
        var curSelect = $(this).parents().filter('.kr-score-select');
        curSelect.find('.kr-score-select-value').html(curSelect.find('.kr-score-select-list label input:checked').parent().find('span').html());
        $('.kr-score-select.open').removeClass('open');
        var summ_all = 0;
        var summ_b = 0;
        $('.kr-score-select').each(function() {
            var curCriterion = $(this).parent().parent();
            var curWeight = Number(curCriterion.find('td').eq(3).html());
            if (curCriterion.find('.kr-score-select-list label input:checked').length > 0) {
                var curValue = Number(curCriterion.find('.kr-score-select-list label input:checked').val());
                summ_all += curWeight / 100 * curValue;
                summ_b += curWeight;
            }
        });
        $('.SUMM_ALL').html(Number(summ_all).toFixed(2));
        $('.SUMM_B_ALL').html(summ_b);
    });

    if ($('.kr-score-select').length > 0) {
        window.setInterval(function() {
            $('.kr-score-select').each(function() {
                var curSelect = $(this);
                curSelect.find('> label.error').remove();
                if (curSelect.find('input.error').length > 0) {
                    curSelect.append('<label class="error">Это поле необходимо заполнить.</label>');
                }
            });
        }, 100);
    }

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

$(window).on('load resize', function() {
    $('.riepp-scores').each(function() {
        resizeRieppScores();
    });
});

function resizeRieppScores() {
    $('.riepp-scores').each(function() {
        var curBlock = $(this);
        curBlock.find('.riepp-scores-group').each(function() {
            var curGroup = $(this);
            var minHeight = 0;
            curGroup.find('.riepp-scores-group-title, .riepp-scores-group-name, .riepp-scores-group-weight').css({'min-height': 0});
            curGroup.find('.riepp-scores-group-title, .riepp-scores-group-name, .riepp-scores-group-weight').each(function() {
                if (minHeight < $(this).outerHeight()) {
                    minHeight = $(this).outerHeight();
                }
            });
            curGroup.find('.riepp-scores-group-title, .riepp-scores-group-name, .riepp-scores-group-weight').css({'min-height': minHeight});

            var curIndex = curBlock.find('.riepp-scores-group').index(curGroup);
            var curGroupScore = $('.riepp-scores-list-group').eq(curIndex);
            curGroupScore.find('.riepp-scores-list-group-item').css({'height': minHeight + 1});
        });

        curBlock.find('.riepp-scores-criterion').each(function() {
            var curCriterion = $(this);
            var minHeight = 0;
            curCriterion.find('.riepp-scores-criterion-number, .riepp-scores-criterion-title, .riepp-scores-criterion-name, .riepp-scores-criterion-weight, .riepp-scores-criterion-summ').css({'min-height': 0});
            curCriterion.find('.riepp-scores-criterion-number, .riepp-scores-criterion-title, .riepp-scores-criterion-name, .riepp-scores-criterion-weight, .riepp-scores-criterion-summ').each(function() {
                if (minHeight < $(this).outerHeight()) {
                    minHeight = $(this).outerHeight();
                }
            });
            curCriterion.find('.riepp-scores-criterion-number, .riepp-scores-criterion-title, .riepp-scores-criterion-name, .riepp-scores-criterion-weight, .riepp-scores-criterion-summ').css({'min-height': minHeight});

            var curIndex = curBlock.find('.riepp-scores-criterion').index(curCriterion);
            var curCriterionScore = $('.riepp-scores-list-criterion').eq(curIndex);
            curCriterionScore.find('.riepp-scores-list-criterion-item').css({'height': minHeight + 1});
        });

        curBlock.find('.riepp-scores-item').each(function() {
            var curItem = $(this);
            var minHeight = 0;
            curItem.find('.riepp-scores-item-number, .riepp-scores-item-title, .riepp-scores-item-summ').css({'min-height': 0});
            curItem.find('.riepp-scores-item-number, .riepp-scores-item-title, .riepp-scores-item-summ').each(function() {
                if (minHeight < $(this).outerHeight()) {
                    minHeight = $(this).outerHeight();
                }
            });
            curItem.find('.riepp-scores-item-number, .riepp-scores-item-title, .riepp-scores-item-summ').css({'min-height': minHeight});

            var curIndex = curBlock.find('.riepp-scores-item').index(curItem);
            var curItemScore = $('.riepp-scores-list-row').eq(curIndex);
            curItemScore.find('.riepp-scores-list-row-item').css({'height': minHeight + 1});
        });

        curBlock.find('.riepp-scores-header').each(function() {
            var curItem = $(this);
            var minHeight = 0;
            curItem.find('.riepp-scores-header-number, .riepp-scores-header-title, .riepp-scores-header-name, .riepp-scores-header-weight, .riepp-scores-header-summ').css({'min-height': 0});
            curItem.find('.riepp-scores-header-number, .riepp-scores-header-title, .riepp-scores-header-name, .riepp-scores-header-weight, .riepp-scores-header-summ').each(function() {
                if (minHeight < $(this).outerHeight()) {
                    minHeight = $(this).outerHeight();
                }
            });
            curBlock.find('.riepp-scores-list-header-item').css({'height': 'auto'});
            curBlock.find('.riepp-scores-list-header-item').each(function() {
                if (minHeight < $(this).outerHeight()) {
                    minHeight = $(this).outerHeight();
                }
            });
            curBlock.find('.riepp-scores-list-header-item').css({'height': minHeight});
            curItem.find('.riepp-scores-header-number, .riepp-scores-header-title, .riepp-scores-header-name, .riepp-scores-header-weight, .riepp-scores-header-summ').css({'min-height': minHeight});
        });
    });
}

$(window).on('load resize scroll', function() {
    $('.riepp-scores-list .mCSB_scrollTools').each(function() {
        var curTools = $(this);
        var curBlock = $('.riepp-scores');
        var curBottom = ($(window).scrollTop() + $(window).height()) - (curBlock.offset().top + curBlock.height() + 16);
        if (curBottom < 0) {
            curBottom = 0;
        }
        curTools.css({'position': 'fixed', 'left': curTools.parent().offset().left, 'bottom': curBottom, 'right': 'auto', 'width': curTools.parent().width()});
    });
});