// index file

'use strict';

"use strict"

$(function() {

    
    var email;
    var password; 
    
    var loginForm = $('#login-form');
    
    // if the sign in button is clicked, validate fields and try to sign in 
    $('#signin-button').click(function() {   
        $('#otherError').hide();
        
        if (!loginForm.valid || loginForm.valid()) {    
            email = $('#email').val();
            password = $('#password').val();
            $.post('/api/login', {email : email, password: password})
                .done(function(data) {
                    if (data.success) {
                        window.location.replace('home.html');
                    } else {                       
                        $('#otherError').text(data.error);
                        $('#otherError').show();
                    }  
                });
        }
    }); 
}); 