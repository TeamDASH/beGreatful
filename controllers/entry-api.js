'use strict';

var express = require('express');

var validate = require('../config/validate');

module.exports.Router = function(Entry) {
    var router = express.Router();
    
    router.post('/entries', function(req, res, next) {
        var entryThought1 = req.body.entryThought1;
        var entryThought2 = req.body.entryThought2;
        var entryThought3 = req.body.entryThought3;
        var moreThoughts = req.body.moreThoughts;
        var entryMood = req.body.entryMood;
        
        entryThought1 = entryThought1 ? entryThought1 : null;
        
        entryThought2 = entryThought2 ? entryThought2 : null;
        
        entryThought3 = entryThought3 ? entryThought3 : null;
        
        moreThoughts = moreThoughts ? moreThoughts : null;
        
        if (!entryThought1 && !entryThought2 && !entryThought3 && !moreThoughts) {
            return res.json({error : 'Please add a thought for today.'});
        }
        // consider setting up enum for mood or only having certain valid values 
        if (!entryMood || !validate.validField(entryMood)) {
            return res.json({error : 'Please select a mood.'});
        }
        
        var userID = req.user.userID;
        
        if (!userID) {
            res.status(403);
            res.json({error : 'Please log in to beGreatful and try again.'});
        }
        
        return Entry.insert(userID, entryThought1, entryThought2, entryThought3, moreThoughts, entryMood)
            .then(function() {
                res.json({success: 'Your entry was created.'});
            })
            .catch(function() {
                res.status(500);
                res.json({error: 'Sorry, we were unable to add your entry. Please try again later.'});
            });
        
    });
    
    return router;
}
