$(document).ready(function() {
    $("#submit").click(function( event ){
        // Get input's id
        const name1 = $("#name1").val();
        const surname = $("#surname").val();
        const username = $("#username").val();
        const email = $("#email").val();
        const password = $("#password").val(); 
        const password2 = $("#password2").val();

        // Random otp code
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Check values of inputs and validate 
        const nameValidate = checkName(name1.trim(), document.getElementById('errors-name'), "Podaj imię!");
        const surnameValidate = checkName(surname.trim(), document.getElementById('errors-surname'), "Podaj nazwisko!");
        const usernameValidate = checkUsername(username);
        const emailValidate = checkEmail(email);
        const passwordValidate = checkPassword(password);
        const confirmPasswordValidate = CheckConfirmPassowrd(password2, password);
        
        // Send data to php file
        if(nameValidate && surnameValidate && usernameValidate && emailValidate && passwordValidate && confirmPasswordValidate){
            $('.loading').show();
            $.ajax({
                type: "POST",
                url: "register.php",
                data: {
                    name: name1.trim(),
                    surname: surname.trim(),
                    username: username.trim(),
                    email: email.trim(),
                    password: password.trim(),
                    otp: otp
            },
            cache: false,
            success: function(data) {
                //console.log(data);

                // Nick already used
                const returnNick = /nicks/;
                if(returnNick.test(data)){
                    document.getElementById('errors-username').innerHTML = "Istnieje już gracz o takim nicku!";
                    $('.loading').hide();
                }
                
                // Email already used
                const returnEmail = /emails/;
                if(returnEmail.test(data)){
                    document.getElementById('errors-email').innerHTML = "Istnieje już konto przypisane do tego adresu e-mail!";
                    $('.loading').hide();
                }

                // Successfully returned
                if(/success/.test(data)){
                    window.location.href = "../Verify";
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

// Validate name and surname
function checkName(value, error, errorValue){
    if(!value || !/^[ a-zA-ZąćęłńóżźśĄĆĘŁŃÓŻŹĆŚ]{2,}$/.test(value)){ 
        error.innerHTML = errorValue;
        return false;
    } 
    else{
        error.innerHTML = "";
        return true;
    }
}

// Validate username
function checkUsername(username){
    if(!username.trim() || !/^[a-zA-Z0-9ąćęłńóżźśĄĆĘŁŃÓŻŹĆŚ._%+-]{3,}$/.test(username.trim())){
        document.getElementById('errors-username').innerHTML = "Podaj nick!";
        return false;
    } 
    else{
        document.getElementById('errors-username').innerHTML = "";
        return true;
    }  
}

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



