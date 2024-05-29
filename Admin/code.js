// Wyświetlanie lub zamykanie Modala
var codeModal = document.getElementById("codeModal");
var codeClose = document.getElementById("codeClose");
var codeBtn = document.getElementById("codeBtn");

codeBtn.addEventListener("click", ()=> {
    codeModal.style.display = "block";

})

codeClose.addEventListener("click", ()=> {
    codeModal.style.display = "none";
})

window.addEventListener("click", (event)=> {
  if (event.target == codeModal) {
        codeModal.style.display = "none";
  }
})


function getCodes(){
    $.ajax({
        type: "GET",
        url: "getCode.php",
    }).done(function(data){
        $('#codeTable').html('<tr>'+
            '<th>Kod (kwota)</th>'+
            '<th>Typ / Użyto</th>'+
            '<th>Opcje</th>'+
        '</tr>');

        if(/none/.test(data)){
            $('#codeTable').append('<tr>'+
                '<td> - </td>'+
                '<td> - </td>'+
                '<td> - </td>'+
            '</tr>');
        }
        else{
            var codes = $.parseJSON(data);
            for(var i = 0; i<codes.length; i++){
                var uses;
                if(codes[i]['type'] == 2){
                    uses = "Wielorazowy";
                }
    
                if(codes[i]['type'] == 1){
                    uses = 0;
                }
                
                if(codes[i]['type'] == 0){
                    uses = 1;
                }
    
                $('#codeTable').append('<tr>'+
                '<td>' + codes[i]['code'] + '<br> (' + codes[i]['value'] + ')</td>'+
                '<td>' + uses + '</td>'+
                '<td>'+
                    '<button type="button" class="deleteBtn" onclick="deleteCodes(\'' + codes[i]['code'] + '\')">Skasuj</button> '+
                    '<button type="button" class="showBtn" onclick="showCodes(\'' + codes[i]['code'] + '\')">' + (codes[i]['showCode'] == 0 ? 'Pokaż' : 'Ukryj') + '</button>'+
                '</td>'+
            '</tr>');
            }
        }
        
    });
}

function deleteCodes(id){
    $.ajax({
        type: "POST",
        url: "deleteCode.php",
        data: {
            id: id
        },
        cache: false,
        success: function(data) {
            // Zwrócenie poprawnego wyniku
            if(/success/.test(data)){
                getCodes();
            }

            // Serwer wyłączony / awaria
            if(/servers/.test(data)){
                alert('Błąd serwera! Przepraszamy za niedogodności i prosimy o skontaktowanie się z administracją!')
            }
        }
    });
}

function showCodes(id){

    $.ajax({
        type: "POST",
        url: "showCode.php",
        data: {
            id: id
        },
        cache: false,
        success: function(data) {
            console.log(data)
            // Zwrócenie poprawnego wyniku
            if(/success/.test(data)){
                getCodes();
            }

            // Serwer wyłączony / awaria
            if(/servers/.test(data)){
                alert('Błąd serwera! Przepraszamy za niedogodności i prosimy o skontaktowanie się z administracją!')
            }
        }
    });
}

var createCodeBtn = document.getElementById('btnCodeModal');

createCodeBtn.addEventListener("click", () => {
    if(checkValue($('#codeLabel').val().trim(), 'codeLabel')  && checkValue($('#codeValue').val().trim(), 'codeValue') && radioCheck()){
        $.ajax({
            type: "POST",
            url: "createCode.php",
            data: {
                code: $('#codeLabel').val(),
                value: $('#codeValue').val(),
                type: $("#MatchCode input[type='radio']:checked").val()
            },
            cache: false,
            success: function(data) {
                // Zwrócenie poprawnego wyniku
                if(/success/.test(data)){
                    getCodes();
                    $("#MatchCode").trigger('reset');
                    codeModal.style.display = "none";
                }

                // Zwrócenie, że kod istnieje 
                if(/exist/.test(data)){
                    alert('Ten kod już jest dodany!')
                }

                // Serwer wyłączony / awaria
                if(/servers/.test(data)){
                    alert('Błąd serwera! Przepraszamy za niedogodności i prosimy o skontaktowanie się z administracją!')
                }
            }
        });
    }
});

function checkValue(value, input){
    if(!value){
        $('#'+input).css("border", "2px solid red");
        return false;
    }
    else{
        $('#'+input).css("border", "1px solid black");
        return true;
    }
}

function radioCheck(){
    if(document.getElementById('one').checked || document.getElementById('few').checked){
        $("#errorCode").html('');
        return true;
    }

    $("#errorCode").html('Wybierz opcję!');
    return false;
}


getCodes();