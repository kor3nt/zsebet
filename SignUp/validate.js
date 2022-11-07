$(document).ready(function() {
    $("#submit").click(function( event ){
        // Ustawienie zmiennym wartości z inputów
        const name1 = $("#name1").val();
        const surname = $("#surname").val();
        const username = $("#username").val();
        const email = $("#email").val();
        const password = $("#password").val(); 
        const password2 = $("#password2").val();

        // Generowanie randomowego kodu otp
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Sprawdzanie zmiannych funkcjami do walidacji
        const nameValidate = checkName(name1.trim(), document.getElementById('errors-name'), "Podaj imię!");
        const surnameValidate = checkName(surname.trim(), document.getElementById('errors-surname'), "Podaj nazwisko!");
        const usernameValidate = checkUsername(username);
        const emailValidate = checkEmail(email);
        const passwordValidate = checkPassword(password);
        const confirmPasswordValidate = CheckConfirmPassowrd(password2, password);
        
        // Wysyłanie danych do pliku php
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
                // Nick już istnieje w bazie
                const returnNick = /nicks/;
                if(returnNick.test(data)){
                    document.getElementById('errors-username').innerHTML = "Istnieje już gracz o takim nicku!";
                    $('.loading').hide();
                }
                
                // Email został użyty, przypisany do innego konta
                const returnEmail = /emails/;
                if(returnEmail.test(data)){
                    document.getElementById('errors-email').innerHTML = "Istnieje już konto przypisane do tego adresu e-mail!";
                    $('.loading').hide();
                }

                // Zwrócenie poprawnego wyniku
                if(/success/.test(data)){
                    window.location.href = "../Verify";
                }

                // Serwer wyłączony / awaria
                if(/servers/.test(data)){
                    alert('Błąd serwera! Przepraszamy za niedogodności i prosimy o skontaktowanie się z administracją!')
                }
            }
            });
        }
        event.preventDefault();
    });
    
});

// Walidacja imienia i nazwiska
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

// Walidacja nicku
function checkUsername(username){
    if(!username.trim() || !/^[a-zA-Z0-9ąćęłńóżźśĄĆĘŁŃÓŻŹĆŚ._%+-]{3,10}$/.test(username.trim())){
        document.getElementById('errors-username').innerHTML = "Podaj nick! (od 3 do 10 znaków)";
        return false;
    } 
    else{
        document.getElementById('errors-username').innerHTML = "";
        return true;
    }  
}

// Walidacja emaila
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

// Walidacja hasła
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

// Walidacja potwierdzającego hasła
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



