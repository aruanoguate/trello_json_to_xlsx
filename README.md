# trello_json_to_xlsx
This piece of code was originally created as part of another project where a [XLSX](http://fileformat.wikia.com/wiki/XLSX) report is generated with information extracted from a Json file exported from a [Trello](https://trello.com/) board. 

## What's included
The below modules are included into this package:

- **jsonReader:** A simple function that can read the Json file and return it's contents.
- **collectionSearcher:** Includes a function that, given collection of values like Cards or Labels and a collection of IDs, returns the list of objects in the collection. It also includes a function to retrive the resulting list as a comma-separated string.
- **commentsSearcher:** A function is exported to pull all the comments for a specific Card, this is pulled from the list of actions.
- **pluginDataExtractor:** Set of functions that allow the extraction of data associated to [Trello's Power-Ups](https://trello.com/power-ups).
- **fontsGenerator:** Includes two sample fonts to be used on the XLSX final report, one for the header and other for the data rows.
- **xlsxGenerator:** Includes a function to generate a XLSX file from the configuration received on "columnsConfiguration" with the data present in "cards". Also the fonts to be used are received on "rowsCellStyle".

## Examples

## Support

In case you need help, you can contact Alvaro Ruano at [alvaro.ruano90@outlook.com](mailto:alvaro.ruano90@outlook.com)

