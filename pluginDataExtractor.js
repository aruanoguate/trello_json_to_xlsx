var _ = require('underscore');
var collectionSearcher = require('./collectionSearcher');

// Extract the JSON information parsed for additional processing
var extractParsed = function (objectWithPlugin, idPlugin) {
    var defaultEmptyObject = {};

    if (!objectWithPlugin.pluginData)
        return defaultEmptyObject;

    var rawPluginData = _.findWhere(objectWithPlugin.pluginData, { idPlugin: idPlugin });

    if (!rawPluginData)
        return defaultEmptyObject;

    if (!rawPluginData.value)
        return defaultEmptyObject;

    var parsedPluginData = JSON.parse(rawPluginData.value);

    if (!parsedPluginData)
        return defaultEmptyObject;

    if (!parsedPluginData.fields)
        return defaultEmptyObject;

    return parsedPluginData.fields;
};

// Extracts directly the value stored for the specific field
var extractTextValue = function (objectWithPlugin, idPlugin, fieldName) {
    var pluginFields = extractParsed(objectWithPlugin, idPlugin);

    if (!pluginFields[fieldName])
        return '';

    return pluginFields[fieldName];
};

// Extracts the value stored for a specific field and then searches for the associated
// description on the plug-in configuration
var extractFromCatalog = function (objectWithPlugin, idPlugin, fieldName, trelloData, catalogName) {
    var textValue = extractTextValue(objectWithPlugin, idPlugin, fieldName);

    var pluginConfiguration = extractParsed(trelloData, idPlugin);
    var pluginCatalog = _.findWhere(pluginConfiguration, { n: catalogName });

    if (!pluginCatalog)
        return '';

    if (!pluginCatalog.o)
        return '';

    return collectionSearcher.getCommaSeparatedList(pluginCatalog.o, [textValue]);
};

var extractParsedNew = function (objectWithPlugin, idCustomField) {
    var defaultEmptyObject = {};

    if (!objectWithPlugin.customFieldItems)
        return defaultEmptyObject;

    var rawPluginData = _.findWhere(objectWithPlugin.customFieldItems, { idCustomField: idCustomField });

    if (!rawPluginData)
        return defaultEmptyObject;

    return rawPluginData;
};

var extractInternalValue = function (fieldWithValue) {
    if (!fieldWithValue)
        return '';

    if (!fieldWithValue.value)
        return '';

    if (fieldWithValue.value.text)
        return fieldWithValue.value.text;
    else if (fieldWithValue.value.number)
        return fieldWithValue.value.number;
    else
        return '';
};

// Extracts directly the value stored for the specific field
var extractTextValueNew = function (objectWithPlugin, idCustomField) {
    var pluginFields = extractParsedNew(objectWithPlugin, idCustomField);
    return extractInternalValue(pluginFields);
};

// Extracts the value stored for a specific field and then searches for the associated
// description on the plug-in configuration
var extractFromCatalogNew = function (objectWithPlugin, idCustomField, trelloData) {
    var pluginFields = extractParsedNew(objectWithPlugin, idCustomField);

    if (!pluginFields)
        return '';

    if (!pluginFields.idValue)
        return '';

    var pluginConfiguration = _.findWhere(trelloData.customFields, { id: idCustomField });

    if (!pluginConfiguration)
        return '';

    if (!pluginConfiguration.options)
        return '';

    var pluginCatalogOption = _.findWhere(pluginConfiguration.options, { id: pluginFields.idValue });

    return extractInternalValue(pluginCatalogOption);
};

// To export all the functions
module.exports.extractParsed = extractParsed;
module.exports.extractTextValue = extractTextValue;
module.exports.extractFromCatalog = extractFromCatalog;
module.exports.extractParsedNew = extractParsedNew;
module.exports.extractTextValueNew = extractTextValueNew;
module.exports.extractFromCatalogNew = extractFromCatalogNew;
