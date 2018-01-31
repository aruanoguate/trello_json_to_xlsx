
const white = { rgb: "00FFFFFF" };
const black = { rgb: "00000000" };

// Function needed to create a default format for all the cells
var generateDefaulCellStyle = function(){
    var defaultCellStyle = {
        fill: {
            patternType: "solid",
            fgColor: white
        },
        font: { 
            name: "Calibri",
            color: black,
            sz: 12,
            bold: false
        },
        alignment: {
            vertical: "top",
            horizontal: "bottom",
            wrapText: true
        },
        border: {
            top: { style: "thin", color: black },
            bottom: { style: "thin", color: black },
            left: { style: "thin", color: black },
            right: { style: "thin", color: black }
        }
    };

    return defaultCellStyle;
};

// Function needed to created a format for the header cells
var generateHeaderCellStyle = function(){
    var headerCellStyle = generateDefaulCellStyle();

    headerCellStyle.fill.fgColor = black;

    headerCellStyle.font.color = white;
    headerCellStyle.font.bold = true;

    headerCellStyle.alignment.vertical = "center";
    headerCellStyle.alignment.horizontal = "center";

    headerCellStyle.border.top.color = white;
    headerCellStyle.border.bottom.color = white;
    headerCellStyle.border.left.color = white;
    headerCellStyle.border.right.color = white;

    return headerCellStyle;
};

module.exports.generateDefaulCellStyle = generateDefaulCellStyle;
module.exports.generateHeaderCellStyle = generateHeaderCellStyle;
