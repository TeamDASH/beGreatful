'use strict';

var express = require('express');

var validate = require('../config/validate');

module.exports.Router = function(Entry) {
    var router = express.Router();
    
    // requires entryThought1, entryThought2, entryThought3 OR moreThoughts, and entryMood as POST parameters
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
            .then(function(data) {
                res.json({entry : data});
            })
            .catch(function() {
                res.status(500);
                res.json({error: 'Sorry, we were unable to add your entry. Please try again later.'});
            });
        
    });
    
    router.get('/entries', function(req, res, next) {
        var user = req.user;
        
        return Entry.getInfo('userID', user.userID)
            .then(function(data) {
                console.log(data);
                res.json({entries : data})
            })
            .catch(function() {
                res.status(500);
                res.json({error: 'Sorry, we were unable to access your entries. Please try again later.'});
            });
    });

    router.get('/entries/:id', function(req, res, next) {
        var entryID = req.params.id;
        var user = req.user;
        
        Entry.getInfo('entryID', entryID) 
            .then(function(data) {
                console.log(data);
                res.json({entry: data});
            })
            .catch(function() {
                res.status(500);
                res.json({error: 'Sorry, we were unable to find your entry. Please try again later.'});
            });      
    });
    
    // requires 
    router.delete('/entries/:id', function(req, res, next) {
        var entryID = req.params.id;
        var user = req.user;
        
        Entry.getInfo('entryID', entryID) 
            .then(function(data) {
                console.log(data);
                if (data.userID != user.userID) {
                    res.json({error : 'You are not the owner of this entry.'})
                } else {
                    return Entry.remove(entryID) 
                }    
            })
            .then(function() {
                res.json({success: 'Your entry was deleted.'});
            })
            .catch(function() {
                res.status(500);
                res.json({error: 'Sorry, we were unable to delete your entry. Please try again later.'});
            });      
    });
    
    return router;
}
