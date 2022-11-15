$(".otp-field input").keydown(function (event) {
    if (this.value.length === this.maxLength) {
      $(this).next('.otp-field input').focus();
    }

    if(event.key === "Backspace" && this.value.length !== this.maxLength){
        $(this).prev('.otp-field input').focus();
    }


    if(!/^[0-9]$/.test(this.value)){
        $(this).addClass("red");
    }
    else{
        $(this).removeClass("red");
    }
});

function paste(){
    document.addEventListener('paste', async (e) => {
        e.preventDefault();
        var text = await navigator.clipboard.readText();

        document.getElementById("first").value = text[0];
        document.getElementById("second").value = text[1];
        document.getElementById("third").value = text[2];
        document.getElementById("fourth").value = text[3];
        document.getElementById("fifth").value = text[4];
        document.getElementById("sixth").value = text[5];
        $("#first").removeClass("red");        
        $("#second").removeClass("red");      
        $("#third").removeClass("red");      
        $("#fourth").removeClass("red");      
        $("#fifth").removeClass("red");    
        $("#sixth").removeClass("red");

    });
}

$(document).ready(function() {
    $("#submit").click(function( event ){
        // Get input's id
        const first = $("#first").val();
        const second = $("#second").val();
        const third = $("#third").val();
        const fourth = $("#fourth").val();
        const fifth = $("#fifth").val(); 
        const sixth = $("#sixth").val();
        
        if(isNumber(first) && isNumber(second) && isNumber(third) && isNumber(fourth) && isNumber(fifth) && isNumber(sixth)){
            $('.loading').show();
            const otp = first + second + third + fourth + fifth + sixth;
            $.ajax({
                type: "POST",
                url: "verify.php",
                data: {
                    otp: otp
                },
                cache: false,
                success: function(data) {

                    // Kod się nie zgadza z tym z bazy
                    if(/error/.test(data)){
                        document.getElementById('error').innerHTML = "Kod jest nie poprawny!";
                        $('.loading').hide();
                    }

                    // Zwrócenie poprawnego wyniku
                    if(/success/.test(data)){
                        window.location.href = "../Bets";
                    }
                    
                    // Serwer wyłączony / awaria
                    if(/servers/.test(data)){
                        alert('Błąd serwera! Przepraszamy za niedogodności i prosimy o skontaktowanie się z administracją!')
                    }
                }
            });
        }
        else{
            document.getElementById('error').innerHTML = "Uzupełnij kod poprawnie!";
        }

        event.preventDefault();
    });

    
});

function isNumber(value){
    return (/^[0-9]$/.test(value));
}


let time = 0;
function sendMail(){
    if(time == 0){
        $('.loading').show();
        $.ajax({
            type: "POST",
            url: "resend.php",
            cache: false,
            success: function(data) {
                if(/error/.test(data)){
                    document.getElementById('email').innerHTML = "E-mail nie zostal wyslany! Skontaktuj się z Administracją!".fontcolor('red');
                    $('.loading').hide();
                }

                if(/send/.test(data)){
                    document.getElementById('email').innerHTML = "E-mail zostal wyslany".fontcolor('#32e800');
                    $('.loading').hide();
                }
            }
        });


        // Ustaw czas tutaj
        time = 30;
    }
   

    // Locking the button for 30 seconds
    const x = setInterval(function () {
        if (time == 0) {
            clearInterval(x);
            document.getElementById('resend').disabled = false;
            document.getElementById('resend').innerHTML = "Nie dotarł kod? Wyślij ponowanie";
            document.getElementById('email').innerHTML = "";
        }
        else{
            document.getElementById('resend').innerHTML = 'Spróbuj ponowanie za ' + time + ' sekund';
            time--;
        }
    }, 1000);
    
    document.getElementById('resend').disabled = true;
}