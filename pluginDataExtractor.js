var _ = require('underscore');
var collectionSearcher = require('./collectionSearcher');

// Extract the JSON information parsed for additional processing
var extractParsed = function(objectWithPlugin, idPlugin){
    var defaultEmptyObject = {};
    
    if (!objectWithPlugin.pluginData)
        return defaultEmptyObject;

    var rawPluginData = _.findWhere(objectWithPlugin.pluginData, { idPlugin: idPlugin} );

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
var extractTextValue = function(objectWithPlugin, idPlugin, fieldName){
    var pluginFields = extractParsed(objectWithPlugin, idPlugin);

    if (!pluginFields[fieldName])
        return '';

    return pluginFields[fieldName];
};

// Extracts the value stored for a specific field and then searches for the associated
// description on the plug-in configuration
var extractFromCatalog = function(objectWithPlugin, idPlugin, fieldName, trelloData, catalogName){
    var textValue = extractTextValue(objectWithPlugin, idPlugin, fieldName);

    var pluginConfiguration = extractParsed(trelloData, idPlugin);
    var pluginCatalog = _.findWhere(pluginConfiguration , { n: catalogName });

    if (!pluginCatalog)
        return '';
    
    if (!pluginCatalog.o)
        return '';

    return collectionSearcher.getCommaSeparatedList(pluginCatalog.o, [textValue]);
};

var extractParsedNew = function(objectWithPlugin, idCustomField){
    var defaultEmptyObject = {};
    
    if (!objectWithPlugin.customFieldItems)
        return defaultEmptyObject;

    var rawPluginData = _.findWhere(objectWithPlugin.customFieldItems, { idCustomField: idCustomField} );

    if (!rawPluginData)
        return defaultEmptyObject;

    return rawPluginData;
};

// Extracts directly the value stored for the specific field
var extractTextValueNew = function(objectWithPlugin, idCustomField){
    var pluginFields = extractParsedNew(objectWithPlugin, idCustomField);

    if (!pluginFields)
        return '';

    if (!pluginFields.value)
        return '';
    
    if (!pluginFields.value.text)
        return '';

    return pluginFields.value.text;
};

// To export all the functions
module.exports.extractParsed = extractParsed;
module.exports.extractTextValue = extractTextValue;
module.exports.extractFromCatalog = extractFromCatalog;
module.exports.extractParsedNew = extractParsedNew;
module.exports.extractTextValueNew = extractTextValueNew;
