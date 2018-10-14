# trello_json_to_xlsx
This piece of code was created as a set of tools useful to generate an [XLSX](http://fileformat.wikia.com/wiki/XLSX) report from the Json file that can be exported from a [Trello](https://trello.com/) board.

## What's included
The below modules are included into this package:

- **jsonReader:** Includes a simple function that can read the file and return it's contents.
- **xlsxGenerator:** Includes a function to generate an XLSX file from the configuration received on "columnsConfiguration" with the data present in "cards".
- **collectionSearcher:** Includes a function to search for a list of ids in a provided collection of values, also allows the retrival as a string.
- **commentsSearcher:** A function is exported to pull all the comments for a specific card
- **fontsGenerator:** Includes two sample fonts to be used on the XLSX report, one for the header and other for the data rows.
- **pluginDataExtractor:** Set of functions that allow the extraction of data associated to [Trello's Power-Ups](https://trello.com/power-ups).

## Examples



