// test entry api

'use strict';

describe('api/entries', function() {
    
    describe('/api/entries (POST)', function() {
          
        it('should let users add a new entry');
        
        it('should not let users add an empty entry');
        
        it('should not let users add a new entry associated with another user account');          
    });

    describe('/api/entries (GET)', function() {
        
        it('should allow users to see all of their entries');
        
        it('should not let allow users to view other user entries');
        
    });
     
});

describe('api/entries/{id}', function() {
    describe('api/entries/{id} (GET)', function() {
        it('should get the entry for that id');
    });
    
    describe('api/entries/{id} (PUT)', function() {
        it('should update the entry for that id');
    });
    
    describe('api/entries/{id} (DELETE)', function() {
        it('should remove the entry for that id');
    });
});

