var _ = require('underscore');
var dateformat = require('dateformat');
var trello_json_to_xlsx = require('../../');

// Here you can configure the details for each column displayed on the
// final report, you need to provide a column name and a delegate function
// which can pull the required information form a single card
module.exports = function (trelloData) {
    var columnsConfiguration = [];

    columnsConfiguration.push({
        columnName: 'Current List',
        width: 30,
        filler: function (card) {
            return trello_json_to_xlsx.collectionSearcher.getCommaSeparatedList(trelloData.lists, [card.idList]);
        }
    });

    columnsConfiguration.push({
        columnName: 'Labels Assigned',
        width: 15,
        filler: function (card) {
            var cardLabels = trello_json_to_xlsx.collectionSearcher.getCommaSeparatedList(trelloData.labels, card.idLabels);
            return cardLabels;
        }
    });

    columnsConfiguration.push({
        columnName: 'Card name',
        width: 40,
        filler: function (card) {
            return card.name;
        }
    });

    columnsConfiguration.push({
        columnName: 'Custom Text Field',
        width: 15,
        filler: function (card) {
            var TXT = trello_json_to_xlsx.pluginDataExtractor.extractTextValueNew(
                card,
                '5bc2fbc78797e60200840e10');

            return TXT;
        }
    });

    columnsConfiguration.push({
        columnName: 'ETA',
        width: 11,
        filler: function (card) {
            if (!card.due)
                return '';

            return dateformat(card.due, 'mm/dd/yyyy');
        }
    });

    columnsConfiguration.push({
        columnName: 'Last comment',
        width: 40,
        filler: function (card) {
            var comments = trello_json_to_xlsx.commentsSeacher(trelloData, card);

            if (comments.length <= 0)
                return '';

            return comments[comments.length - 1].toString();
        }
    });

    return columnsConfiguration;
};