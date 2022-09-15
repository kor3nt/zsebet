$(document).ready(function() {
    $("#submit").click(function( event ){
        // Get input's id
        const email = $("#email").val();
        const password = $("#password").val(); 
        
        // Send data to php file
        if(checkEmail(email) && checkPassword(password)){
            $('.loading').show();
            $.ajax({
                type: "POST",
                url: "login.php",
                data: {
                    email: email.trim(),
                    password: password.trim(),
            },
            cache: false,
            success: function(data) {
                console.log(data);
                
                // Logins error
                if(/error/.test(data)){
                    document.getElementById('error').innerHTML = 'Podaj poprawny email lub hasło!';
                    $('.loading').hide();
                }

                // OTP returned
                if(/otp/.test(data)){
                    window.location.href = "../verify";
                }

                // Successfully returned
                if(/success/.test(data)){
                    window.location.href = "../";
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
        document.getElementById('error').innerHTML = 'Podaj poprawny email lub hasło!';
        return false;
    } 
    else if(!/^[a-zA-Z0-9._%+-]+@(zse.krakow.pl)$/.test(email.trim())){
        document.getElementById('error').innerHTML = 'Podaj poprawny email lub hasło!';
        return false;
    }
    else{
        document.getElementById('error').innerHTML = "";
        return true;
    } 
}


// Validate password
function checkPassword(password){
    if(!password.trim()){
        document.getElementById('error').innerHTML = 'Podaj poprawny email lub hasło!';
        return false;
    }   
    else if(password.trim().length < 6){
        document.getElementById('error').innerHTML = 'Podaj poprawny email lub hasło!';
        return false;
    }
    else{
        document.getElementById('error').innerHTML = "";
        return true;
    }
}