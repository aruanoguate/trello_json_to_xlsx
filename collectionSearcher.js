var _ = require('underscore');

// A function is exported, it can be used to search
// for a list of ids in a provided collection of 
// valid values
var getArray = function (collection, idsToSearch){
    // All the descriptions found will be concatenated
    var descriptions = [];
    
    // All the ids to search will be evaluated here
    _.each(idsToSearch, function(idToSearch){
        var elementFound = _.findWhere(collection, { id: idToSearch });
        if (elementFound)
        {
            if (elementFound.name)
                descriptions.push(elementFound.name);
            else if (elementFound.fullName)
                descriptions.push(elementFound.fullName);
            else if (elementFound.value)
                descriptions.push(elementFound.value);
            else 
                descriptions.push('Name not found');
        }
    });

    // The list of all the descriptiosn found is returned
    return descriptions;
};

var getCommaSeparatedList = function (collection, idsToSearch){
    return getArray(collection, idsToSearch).join(', ');
};

// Main export
module.exports.getCommaSeparatedList = getCommaSeparatedList;
module.exports.getArray = getArray;
