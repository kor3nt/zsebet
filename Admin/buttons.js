function blockMatch(id, blockStatus){
    $.ajax({
        type: "POST",
        url: "block.php",
        data: {
            id: id,
            blockStatus: blockStatus
        },
        cache: false,
        success: function(data) {
            // Zwrócenie poprawnego wyniku
            if(/success/.test(data)){
                matchesWrite($("#filterMatch input[type='radio']:checked").val())
            }

            // Serwer wyłączony / awaria
            if(/servers/.test(data)){
                alert('Błąd serwera! Przepraszamy za niedogodności i prosimy o skontaktowanie się z administracją!')
            }
        }
    });
}