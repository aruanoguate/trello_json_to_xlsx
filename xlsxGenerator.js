var _ = require('underscore');
var xlsx = require('xlsx');
var xlsx_style = require('xlsx-style');
var fontsGenerator = require('./fontsGenerator');
var path = require('path');

// A function is exported to generate an XLSX file from
// the configuration received on "columnsConfiguration" with
// the data present in "cards"
module.exports = function(fileLocation, fileName, cards, columnsConfiguration){
    // The data will be arranged in an array of arrays
    var table = [];

    // The header of the file is constructed from the configuration  
    // and the columns info configuration is constructed
    var headerRow = [];
    var columnsInfo = [];
    _.each(columnsConfiguration, function(columnConfiguration){
        // the row header text is added to the first row
        headerRow.push(columnConfiguration.columnName);
        
        // an object with the information for the column is created
        var columnInfo = { wch: undefined, hidden: false }
        if (columnConfiguration.width)
            columnInfo.wch = columnConfiguration.width;
        columnsInfo.push(columnInfo);
    });
    table.push(headerRow);

    // The body of the file is filled using the filler functions provided in the configuration
    _.each(cards, function(card){
        var row = [];
        _.each(columnsConfiguration, function(columnConfiguration){
            row.push(columnConfiguration.filler(card));
        });
        table.push(row);
    });

    // Generate a new worksheet with the information from the array of arrays
    var workSheet = xlsx.utils.aoa_to_sheet(table);

    // Format the worksheet, columns width and colors
    workSheet['!cols'] = columnsInfo;

    // Get the cell style to use on different cases
    var defaultCellStyle = fontsGenerator.generateDefaulCellStyle();
    var headerCellStyle = fontsGenerator.generateHeaderCellStyle();

    // To apply the style to all the rows
    for (cellAddress in workSheet){
        if (cellAddress[0] == '!')
            continue;
        
        // If the row# is 0 then is header
        if (xlsx.utils.decode_cell(cellAddress).r == 0)
            workSheet[cellAddress].s = headerCellStyle;
        else
            workSheet[cellAddress].s = defaultCellStyle;
    };

    // Create a workbook and append the already created worksheet
    var workBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheet, fileName);

    // Write the final file to disk
    var fullFileName = path.resolve(fileLocation, fileName);
    xlsx_style.writeFile(workBook, fullFileName + '.xlsx');
}
