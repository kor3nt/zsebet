// Wyświetlanie lub zamykanie Modalu
var modalCode = document.getElementById("ModalCode");
var btnCode = document.getElementById("CodesBtnOpen");
var spanCode = document.getElementById("closeModal");

btnCode.addEventListener("click", ()=> {
    modalCode.style.display = "block";
});

spanCode.addEventListener("click", ()=> {
    modalCode.style.display = "none";
});

window.addEventListener("click", (event)=> {
    if (event.target == modalCode) {
        modalCode.style.display = "none";
    }
});

var btnModalCode = document.getElementById("btnModalCode");
btnModalCode.addEventListener("click", ()=> {
    if(checkCode($('#code').val())){
        document.getElementById('errorCode').innerHTML = "";
        $.ajax({
            type: "POST",
            url: "checkCode.php",
            data: {
                code: $('#code').val()
            },
            cache: false,
            success: function(data) {
                console.log(data)
                // Zwrócenie poprawnego wyniku
                if(/success/.test(data)){
                    $('#code').val('');
                    document.getElementById('errorCode').innerHTML = "";
                    window.location.href = "../Bets";
                }

                // Zwrócenie uzycia kodu
                if(/used/.test(data)){
                    document.getElementById('errorCode').innerHTML = "Kod już został użyty!";
                }

                // Zwrócenie erroru
                if(/error/.test(data)){
                    document.getElementById('errorCode').innerHTML = "Wprowadź poprawny kod!";
                }

                // Serwer wyłączony / awaria
                if(/servers/.test(data)){
                    alert('Błąd serwera! Przepraszamy za niedogodności i prosimy o skontaktowanie się z administracją!')
                }
            }
        });
    }
    else{
        document.getElementById('errorCode').innerHTML = "Wprowadź poprawny kod!";
    }
});


// Walidacja nicku
function checkCode(code){
    if(code.trim() && /^[a-zA-Z0-9 ._%+-]{2,10}$/.test(code.trim())){
        return true;
    } 
    else{
        return false;
    }  
}