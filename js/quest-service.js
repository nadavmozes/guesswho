const KEY = 'questsDB'
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;


function createQuestsTree() {

    var quests = loadFromStorage(KEY);
    console.log('Quests From LocalStorage:', quests);
    if (!quests) {
        console.log('Creating Questions')
        quests = createQuest('Male?');
        quests.yes = createQuest('Gandhi');
        quests.no = createQuest('Rita');
    }

    gQuestsTree = quests;
    saveToStorage(KEY, gQuestsTree);

    gCurrQuest = gQuestsTree;
    console.log('Curr Quests Tree:', gQuestsTree);
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // TODO: update the prev, curr global vars
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
    console.log('gCurrQuest', gCurrQuest)
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    gPrevQuest[lastRes] = {
        txt: newQuestTxt,
        yes: {
            txt: newGuessTxt,
            yes: null,
            no: null
        },
        no: gCurrQuest
    };

    gPrevQuest[lastRes].no = gCurrQuest;
    console.log('Updated Previous Question:', gPrevQuest);
    console.log('Current Question Tree:', gQuestsTree);
    saveToStorage(KEY, gQuestsTree);
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}