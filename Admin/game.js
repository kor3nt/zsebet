const btnAddGame = document.getElementById('addGame');

btnAddGame.addEventListener("click", ()=> {
    let titleGame = $('#titleGame').val();

    if(!titleGame){
        $('#titleGame').css("border", "2px solid red");
    }
    else{
        $('#titleGame').css("border", "1px solid black");

        $.ajax({
            type: "POST",
            url: "addGame.php",
            data: {
                titleGame: titleGame,
            },
            cache: false,
            success: function(data) {
                // Zwrócenie poprawnego wyniku
                if(/success/.test(data)){
                    showGame();
                    $('#titleGame').val('');
                }

                // Serwer wyłączony / awaria
                if(/servers/.test(data)){
                    alert('Błąd serwera! Przepraszamy za niedogodności i prosimy o skontaktowanie się z administracją!')
                }
            }
        });
    }
});

let games = []
function showGame(){
    $.ajax({
        type: "GET",
        url: "game.php",
    }).done(function(data){
        $('#gamesSection').html('');
        games = $.parseJSON(data);
        for(var i = 0; i<games.length; i++){
            $('#gamesSection').append('<div class="ItemGame">'+
                '<label>'+ games[i]['title'] +'</label>'+
                '<input type="button" class="removeGame" onclick="deleteGames(\''+ games[i]['title'] +'\');" value="Skasuj">'+
            '</div>');
        }
    });
}

showGame();

function deleteGames(idGame){
    $.ajax({
        type: "POST",
        url: "deleteGames.php",
        data: { 
            idGame: idGame
        }
    }).done(function(data){
         // Zwrócenie poprawnego wyniku
         if(/success/.test(data)){
            showGame();
        }

        // Serwer wyłączony / awaria
        if(/servers/.test(data)){
            alert('Błąd serwera! Przepraszamy za niedogodności i prosimy o skontaktowanie się z administracją!')
        }
    });
}