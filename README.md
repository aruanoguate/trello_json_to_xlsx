# trello_json_to_xlsx
This repository includes various Javascript modules which help on the creation of a [XLSX](http://fileformat.wikia.com/wiki/XLSX) file with the information from a JSON file exported from a [Trello](https://trello.com/) board. This group of modules was originally created as part of another project, then the generic methods where extracted to create this repository.

Feel free to improve whatever that you want. :)

## What's included
The below modules are included into this package:

- **jsonReader:** A simple function that can read the Json file and return it's contents.
- **collectionSearcher:** Includes a function that, given collection of values like Cards or Labels and a collection of IDs, returns the list of objects in the collection. It also includes a function to retrive the resulting list as a comma-separated string.
- **commentsSearcher:** A function is exported to pull all the comments for a specific Card, this is pulled from the list of actions.
- **pluginDataExtractor:** Set of functions that allow the extraction of data associated to [Trello's Power-Ups](https://trello.com/power-ups).
- **fontsGenerator:** Includes two sample fonts to be used on the XLSX final report, one for the header and other for the data rows.
- **xlsxGenerator:** Includes a function to generate a XLSX file from the configuration received on "columnsConfiguration" with the data present in "cards". Also the fonts to be used are received on "rowsCellStyle".

## Usage

The modules specified above are helpers to simplify the task of generating a report. You're in charge of orchestating all the steps, from the Json read to the XLSX write. The best way to explain the usage is with examples, so please review the examples described below which can be found on the _examples_ folder.

### Example 001

- **index:** The main file, this is the one orchestating the execution of all the other components.
- **cardsFilterCreator:** Provides the specification of the rows that will be included in the XLSX report by returning a function which can be used as a filter on the cards.
- **columnsConfigurator:** Provides the specification of the columns that will be included in the XLSX report by providing an array with the column metadata and delegates with describing how the column information is extracted from the card.
- **rowsPainter:** Provides the specification of the color that will be used on each row of the file.

## Support

In case you need any help, you can contact Alvaro Ruano at [alvaro.ruano90@outlook.com](mailto:alvaro.ruano90@outlook.com)

