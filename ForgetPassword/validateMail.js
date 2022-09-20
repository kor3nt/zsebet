$(document).ready(function() {
    $("#submit").click(function( event ){
        // Get input's id
        const email = $("#email").val();
        
        // Send data to php file
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
                    
                    // Return error
                    if(/error/.test(data)){
                        document.getElementById('error').innerHTML = 'Podaj poprawny email!';
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