$(document).ready(function() {
    $("#submit").click(function( event ){
        // Get input's id
        const token = $("#token").val();
        const email = $("#email").val();
        const password = $("#password").val(); 
        const password2 = $("#password2").val();
        
        // Send data to php file
        if(checkPassword(password) && CheckConfirmPassowrd(password2, password) && checkEmail(email)){
            $('.loading').show();
            $.ajax({
                type: "POST",
                url: "resetPassword.php",
                data: {
                    token: token.trim(),
                    email: email.trim(),
                    password: password.trim()
            },
            cache: false,
            success: function(data) {
                console.log(data);

                // Email and Token is not correct
                if(/token/.test(data)){
                    document.getElementById('error').innerHTML = "Nie poprawne dane!";
                    $('.loading').hide();
                }

                // Successfully returned
                if(/success/.test(data)){
                    $('#send').show();
                }

                // The server is down
                if(/servers/.test(data)){
                    alert('Błąd serwera! Przepraszamy za niedogodności i prosimy o skontaktowanie się z administracją!')
                }
            }
            });
        }
        event.preventDefault();
    });
    
});

// Validate email
function checkEmail(email){
    if(!email.trim()){
        document.getElementById('errors-email').innerHTML = "Podaj e-mail!";
        return false;
    } 
    else if(!/^[a-zA-Z0-9._%+-]+@(zse.krakow.pl)$/.test(email.trim())){
        document.getElementById('errors-email').innerHTML = "E-mail jest nie poprawny!";
        return false;
    }
    else{
        document.getElementById('errors-email').innerHTML = "";
        return true;
    } 
}

// Validate password
function checkPassword(password){
    if(!password.trim()){
        document.getElementById('errors-password').innerHTML = 'Podaj hasło!';
        return false;
    }   
    else if(password.trim().length < 6){
        document.getElementById('errors-password').innerHTML = 'Hasło musi być dłuższe niż 6 znaków!';
        return false;
    }
    else if (password.trim().search(/[a-z]/i) < 0) {
        document.getElementById('errors-password').innerHTML = "Hasło musi zawierać literę!";
        return false;
    }
    else if (password.trim().search(/[0-9]/) < 0) {
        document.getElementById('errors-password').innerHTML = "Hasło musi zawierać liczbę!";
        return false;
    }
    else if(password.trim().search(/\W|_/g) < 0){
        document.getElementById('errors-password').innerHTML = "Hasło musi zawierać znak specjalny!";
        return false;
    }
    else{
        document.getElementById('errors-password').innerHTML = "";
        return true;
    }
}

// Validate confirmed password
function CheckConfirmPassowrd(password2, password){
    if(!password2.trim()){
        document.getElementById('errors-password2').innerHTML = 'Musisz potwierdzić hasło!';
        return false;

    } 
    else if(password2.trim() !== password.trim()){
        document.getElementById('errors-password2').innerHTML =  'Hasła nie są podobne!';
        return false;
    }
    else{
        document.getElementById('errors-password2').innerHTML = "";
        return true;
    }
}



