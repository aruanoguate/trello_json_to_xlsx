// The required dependencies
var _ = require('underscore');
var trello_json_to_xlsx = require('../../');

// Configure the file to Read
var fileReadLocation = '../';
var fileReadName = 'example_board';

// Configure the file to Write
var fileWriteLocation = '../';
var fileWriteName = 'example_001';

// To read and parse the JSON file from Trello
var trelloData = trello_json_to_xlsx.jsonReader(fileReadLocation, fileReadName);

// You can filter the cards to include only the ones you need
var cardsFilterCreator = require('./cardsFilterCreator');
var cardsFilter = cardsFilterCreator(trelloData);
var cards = _.filter(trelloData.cards, cardsFilter);

// You can configure the columns that you want to show in the final report
var columnsConfigurator = require('./columnsConfigurator');
var columnsConfiguration = columnsConfigurator(trelloData);

// You can configure the fonts and cell format to be used on the final report
var rowsPainter = require('./rowsPainter');
var rowsCellStyle = rowsPainter(trelloData, cards);

// You can generate the final report using all the information from the above steps
trello_json_to_xlsx.xlsxGenerator(fileWriteLocation, fileWriteName, cards, columnsConfiguration, rowsCellStyle);

