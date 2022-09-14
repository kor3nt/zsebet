$(".otp-field input").keyup(function (event) {
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
                    console.log(data);
                    // The otp is not the same
                    if(/error/.test(data)){
                        document.getElementById('error').innerHTML = "Kod jest nie poprawny!";
                        $('.loading').hide();
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
        else{
            document.getElementById('error').innerHTML = "Uzupełnij kod poprawnie!";
        }

        event.preventDefault();
    });
});

function isNumber(value){
    return (/^[0-9]$/.test(value));
}