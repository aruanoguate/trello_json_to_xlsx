var _ = require('underscore');
var trello_json_to_xlsx = require('../../');

// This function should filter only the cards that
// should be shown in the report, the trelloData is
// needed to access the definition of the other data
// elements that aren't in the cards
var cardsFilter = function(trelloData, card){

    // This excludes the archived cards
    if (card.closed == 1)
        return false;
    
    // The labels of the card are verified using the collectionSearcher,
    // the purple label from the example is removed
    var cardLabels = trello_json_to_xlsx.collectionSearcher.getArray(trelloData.labels, card.idLabels);
    if (_.contains(cardLabels, 'To be excluded'))
        return false;

    // If all the filters are passed, true is returned
    return true;
};

// This function is exported, it returns the cardsFilter function
// but with the first parameter already binded because it can't be 
// sent on the filter method of the underscore library
module.exports = function(trelloData){
    return cardsFilter.bind(null, trelloData);
};