// model of the entry table

'use strict';

var connPool;

var bluebird = require('bluebird');

var entry = {
    getInfo(attribute, value) {
        console.log('attribute' + attribute);
        console.log('value' + value);
        console.log('looking for entry in database');
        var sql = 'select * from entry where ??=?';
        return connPool.queryAsync(sql, [attribute, value])
            .then(function(rows) {
                console.log('trying to return something');
                console.log(rows);
                return rows.length > 0 ? rows : null;
            });
    },
    insert(userID, entryThought1, entryThought2, entryThought3, moreThoughts, entryMood) {
        
        var sql = `insert into entry (userID, entryThought1, entryThought2, entryThought3, moreThoughts, entryMood) values (?,?,?,?,?,?)`;
        var params = [userID, entryThought1, entryThought2, entryThought3, moreThoughts, entryMood];
        return connPool.queryAsync(sql, params)
    },
    update(entryID, attribute, value) {
        var sql = 'update entry set ??=? where entryID = ?';
        console.log('entry ID is ' + entryID);
        console.log('attribute is ' + attribute);
        console.log('value ' + value);
        var params = [attribute, value, entryID]
        return connPool.queryAsync(sql, params)
            .then(function() {
                return entry.getInfo('entryID', entryID);
            });
    },
    remove(entryID) {
        var sql = 'delete from entry where entryID=?';
        var params = [entryID];
        
        return connPool.queryAsync(sql, params)
            .then(function() {
                return entry.getInfo('entryID', entryID);
            });
    }
}

module.exports.Model = function(connectionPool) {
    connPool = connectionPool;
    return entry;
}