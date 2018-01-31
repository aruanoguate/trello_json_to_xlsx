var _ = require('underscore');
var util = require('util');
var dateformat = require('dateformat');


// A function is exported to pull all the comments for a specific card
module.exports = function(trelloData, card){
    
    // To filter only the comments from the list of actions
    // also reviewing that those comments are associated to the
    // received card
    var filteredActions = _.filter(trelloData.actions, function(action){
        if (!action.type)
            return false;

        if (action.type != 'commentCard')
            return false;

        if (!action.data.card)
            return false;

        if (!action.data.card.id)
            return false;

        if (action.data.card.id != card.id)
            return false;
        
        return true;
    });

    var filteredActions = _.sortBy(filteredActions, function(action){
        return action.date;
    });

    // To pull only the needed information from the action
    var comments = [];
    _.each(filteredActions, function(action){
        var user = '';
        if (action.memberCreator){
            if(action.memberCreator.fullName)
                user = action.memberCreator.fullName;
        }

        var date = null;
        if (action.date){
            date = dateformat(action.date, 'mm/dd/yyyy');
        }

        var comment = '';
        if (action.data.text)
            comment = action.data.text;

        // For each comment a new object is created and it's toString 
        // function is overrided with the one we have created
        var comment = { user: user, date: date, comment: comment };
        comment.toString = commentToString;

        // All these comments are stored in an array
        comments.push(comment);
    });

    return comments;
};

// This function is assigned to all the comment objects created
// by the "commentsSearcher" function
var commentToString = function(){
    return util.format('%s - %s: %s', 
        dateformat(this.date, 'mm/dd/yyyy'),
        this.user, 
        this.comment);
};