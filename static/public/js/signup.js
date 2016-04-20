"use strict";

$(function() {
    var firstName = $('#first-name');
    var lastName = $('#last-name');
    var password1 = $('#password1');
    var password2 = $('#password2');

    var email = $('#email');

    var submitButton = $('#submit-button');
    console.log(submitButton);

    var createAccountForm = $('create-account-form');

    $(submitButton).click(function() {
        console.log('in submit function');
        if (!createAccountForm.valid || createAccountForm.valid()) {
            console.log('submitting form');
            
            $.post('/api/users', {firstName : firstName.val(), lastName: lastName.val(), password1 : password1.val(), password2 : password2.val(), email: email.val()})
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