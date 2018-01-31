var fs = require('fs');
var path = require('path');

// To read and parse the JSON file from Trello
module.exports = function(fileLocation, fileName){
    var fullFileName = path.resolve(fileLocation, fileName);
    return JSON.parse(fs.readFileSync(fullFileName + '.json').toString());
};
