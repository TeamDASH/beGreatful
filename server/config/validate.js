var Validate = {
        validPassword(pass1, pass2){
        if (!pass1 || !pass2) {
            return false;
        }
        var isValidLength = pass1.length >= 8;
        var passwordsMatch = pass1.localeCompare(pass2) == 0;
        
        return (isValidLength && passwordsMatch);
    },
    validEmail(email){
        email = email.trim();
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(email)
    },
    validField(f) {
        f = f.trim();
        return (f != null && f != "");
    }
}

module.exports = Validate;