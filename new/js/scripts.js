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
            newHTML += '<div class="riepp-scores-list-summ-item">' + scores.summ.scores[i].score + '</div>';
            scoresHTML += '<div class="riepp-scores-summ-scores-item"><div class="riepp-scores-summ-scores-item-user">' + scores.summ.scores[i].user + '</div><div class="riepp-scores-summ-scores-item-value">' + scores.summ.scores[i].score + '</div></div>';
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
                    newHTML += '<div class="riepp-scores-list-criterion-item">' + curCriterion.scores[i].score + '</div>';
                    scoresHTML += '<div class="riepp-scores-criterion-scores-item"><div class="riepp-scores-criterion-scores-item-user">' + curCriterion.scores[i].user + '</div><div class="riepp-scores-criterion-scores-item-value">' + curCriterion.scores[i].score + '</div></div>';
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
                    var countScores = curItem.scores.length;
                    var newHTML = '<div class="riepp-scores-list-row">';
                    var scoresHTML = '';
                    for (var i = 0; i < countScores; i++) {
                        newHTML += '<div class="riepp-scores-list-row-item">' + curItem.scores[i].score + '</div>';
                        scoresHTML += '<div class="riepp-scores-item-scores-item"><div class="riepp-scores-item-scores-item-user">' + curItem.scores[i].user + '</div><div class="riepp-scores-item-scores-item-value">' + curItem.scores[i].score + '</div></div>';
                    }
                    newHTML += '</div>';
                    curBlock.find('.riepp-scores-list-inner').append(newHTML);
                    curBlock.append('<div class="riepp-scores-item">' +
                                        '<div class="riepp-scores-item-number">' + curItem.number + '</div>' +
                                        '<div class="riepp-scores-item-title">' + curItem.title + '</div>' +
                                        '<div class="riepp-scores-item-scores"><div class="riepp-scores-item-scores-inner">' + scoresHTML + '</div></div>' +
                                        '<div class="riepp-scores-item-summ"><div class="riepp-scores-label">' + headerSumm + '</div>' + curItem.summ + '</div>' +
                                    '</div>');
                }
                if (groupIndex == 0 && criterionIndex == 0) {
                    for (var criterionScoreIntex = 0; criterionScoreIntex < curCriterion.scores.length; criterionScoreIntex++) {
                        curBlock.find('.riepp-scores-list-header').append('<div class="riepp-scores-list-header-item">' + curCriterion.scores[criterionScoreIntex].user + '</div>');
                    }
                }
            }
        }

        var countScores = scores.summ.scores.length;
        var newHTML = '<div class="riepp-scores-list-summ">';
        var scoresHTML = '';
        for (var i = 0; i < countScores; i++) {
            newHTML += '<div class="riepp-scores-list-summ-item">' + scores.summ.scores[i].score + '</div>';
            scoresHTML += '<div class="riepp-scores-summ-scores-item"><div class="riepp-scores-summ-scores-item-user">' + scores.summ.scores[i].user + '</div><div class="riepp-scores-summ-scores-item-value">' + scores.summ.scores[i].score + '</div></div>';
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