$(document).ready(function() {
    $("#submit").click(function( event ){
        // Pozyskanie danych z inputów
        const email = $("#email").val();
        
        // Przesłanie danych do pliku php
        if(checkEmail(email)){
            $('.loading').show();
            $.ajax({
                type: "POST",
                url: "validateMail.php",
                data: {
                    email: email.trim(),
                },
                cache: false,
                success: function(data) {
                    console.log(data);
                    
                    // Zwrócenie błędu
                    if(/error/.test(data)){
                        document.getElementById('error').innerHTML = 'Podaj poprawny email!';
                        $('.loading').hide();
                    }

                    // Zwrócenie poprawnego wyniku
                    if(/success/.test(data)){
                        $('#send').show();
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


// Walidacja emaila
function checkEmail(email){
    if(!email.trim()){
        document.getElementById('error').innerHTML = 'Podaj poprawny email!';
        return false;
    } 
    else if(!/^[a-zA-Z0-9._%+-]+@(zse.krakow.pl)$/.test(email.trim())){
        document.getElementById('error').innerHTML = 'Podaj poprawny email!';
        return false;
    }
    else{
        document.getElementById('error').innerHTML = "";
        return true;
    } 
}