'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    // TODO: hide the game-start section
    $('.game-start').hide();
    renderQuest();
    // TODO: show the quest section
    $('.quest').show('slow');
}

function renderQuest() {
    // TODO: select the <h2> inside quest and update its text by the currQuest text
    $('.quest h2').text(gCurrQuest.txt);
}

function onUserResponse(res) {
    // If this node has no children
    gLastRes = res;
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            // TODO: improve UX
            $('.modal').modal();
        } else {
            alert('I dont know...teach me!')
                // TODO: hide and show new-quest section
            $('.quest').hide('fade');
            $('.new-quest').show('fade');
        }
    } else {
        // TODO: update the lastRes global var
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    // Get the inputs' values
    var newQuestTxt = $('input[name=newQuest]').val();
    var newGuessTxt = $('input[name=newGuess]').val();
    // Call the service addGuess
    addGuess(newQuestTxt, newGuessTxt, gLastRes);
    $('input[name=newQuest]').val('');
    $('input[name=newGuess]').val('');
    onRestartGame();
}

function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;

}