var _ = require('underscore');
var trello_json_to_xlsx = require('../../');

// To define the colors that wil be used to color the rows in the spreadsheet
const green = { rgb: "00C4D79B" };
const orange = { rgb: "00F9C032" };

// This method returns an array including the specil format for some rows
module.exports = function (trelloData, cards) {
    
    // Two special formats are prepared, one for completed and one for waiting for deployment cards
    var greenCellStyle = trello_json_to_xlsx.xlsxGenerator.fontsGenerator.generateDefaulCellStyle();
    greenCellStyle.fill.fgColor = green;
    var orangeCellStyle = trello_json_to_xlsx.xlsxGenerator.fontsGenerator.generateDefaulCellStyle();
    orangeCellStyle.fill.fgColor = orange;

    // The final result will be an array with the specific format for each row
    var rowsCellStyle = [];
    // The header is row 0
    var rowNumber = 0;

    // All the card are reviewed to determine their color
    _.each(cards, function (card) {
        // To update the current row position
        rowNumber += 1;
        // To get all the labels assigned to a card
        var cardLabels = trello_json_to_xlsx.collectionSearcher.getArray(trelloData.labels, card.idLabels)
        // The correct color is assigned based on the label
        if (_.contains(cardLabels, 'Green Label')) {
            rowsCellStyle[rowNumber] = greenCellStyle;
            return;
        }
        if (_.contains(cardLabels, 'Orange Label')) {
            rowsCellStyle[rowNumber] = orangeCellStyle;
            return;
        }
    });

    // The final list is returned
    return rowsCellStyle;
};