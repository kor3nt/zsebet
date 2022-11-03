// Wypisanie meczy z bazy danych
var matches = [];
function matchesWrite(statusRadio){
    $.ajax({
        type: "POST",
        url: "match.php",
        data: { 
            statusRadio: statusRadio
        }
    }).done(function(data){
        $('.none').hide();
        $('.outputs').html('');

        if(/none/.test(data)){
            $('.none').show();
        }
        else{
            matches = $.parseJSON(data);

            for(var i = 0; i<matches.length; i++){
                let data = matches[i]['date'].slice(0, matches[i]['date'].search(" "));
                let godzina = matches[i]['date'].slice(matches[i]['date'].search(" ")+1, matches[i]['date'].lastIndexOf(':'));
    
                $('.outputs').append(
                '<div class="match">'+
                    '<div class="elementMatch">'+
                        '<div class="row">'+
                           '<div class="title">'+
                                '<h3>' + 
                                    '<span id="'+ matches[i]["id"] + '-' + matches[i]["TagTeamA"] + '">' + matches[i]["TeamA"] +'</span>'  
                                    + ' - ' + 
                                    '<span id="'+ matches[i]["id"] + '-' + matches[i]["TagTeamB"] + '">' + matches[i]["TeamB"] + '</span>'+
                                '</h3>'+
                                '<small>' + matches[i]["game"] + '</small>'+
                            '</div>'+
                            '<div class="date">'+
                                '<p>' + data + '</p>'+
                                '<p>' + godzina + '</p>'+
                            '</div>'+
                            '<div class="buttons" id="'+ matches[i]["id"] + '-' + matches[i]["TagTeamA"]  + '-' + matches[i]["TagTeamB"] +'">'+
                                '<button class="btnEdit" type="button" onclick="openModal('+ matches[i]['id'] +')">Edytuj</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
                );
    
    
                if(matches[i]["TeamA"] == matches[i]["winner"]){
                    $('#'+matches[i]["id"] + '-' + matches[i]["TagTeamA"]).addClass('winner');
                    $('#'+ matches[i]["id"] + '-' + matches[i]["TagTeamB"]).addClass('loser');
                }
    
                
                if(matches[i]["TeamB"] == matches[i]["winner"]){
                    $('#'+ matches[i]["id"] + '-' + matches[i]["TagTeamB"]).addClass('winner');
                    $('#'+ matches[i]["id"]+ '-' + matches[i]["TagTeamA"]).addClass('loser');
                }
                
                if(matches[i]["block"] == 1){
                    $('#'+matches[i]["id"] + '-' + matches[i]["TagTeamA"]  + '-' + matches[i]["TagTeamB"]).append('<button class="btnUnlock" onclick="blockMatch(' + matches[i]["id"] + ', ' + 0 +')" type="button">Odblokuj</button>');
                }
                else{
                    $('#'+matches[i]["id"] + '-' + matches[i]["TagTeamA"]  + '-' + matches[i]["TagTeamB"]).append('<button class="btnBlock" onclick="blockMatch(' + matches[i]["id"] + ', ' + 1 +')" type="button">Zablokuj</button>');
                }
            }
        }
    });
}

matchesWrite(0);

function saveMatch(idGame){
    // console.log($('#winner').val())
    $.ajax({
        type: "POST",
        url: "updateMatch.php",
        data: { 
            id: idGame,
            teamA: $('#TeamA').val(),
            tagA: $('#TagA').val(),
            teamB: $('#TeamB').val(),
            tagB: $('#TagB').val(),
            date: $('#date').val(),
            label: $('#Label').val(),
            game: $('#game').val(),
            winner:  $('#winner').val()
        }
    }).done(function(data){
        console.log(data)
         // Zwrócenie poprawnego wyniku
         if(/success/.test(data)){
            matchesWrite($("#filterMatch input[type='radio']:checked").val());
            modal.style.display = "none";
        }

        // Serwer wyłączony / awaria
        if(/servers/.test(data)){
            alert('Błąd serwera! Przepraszamy za niedogodności i prosimy o skontaktowanie się z administracją!');
        }
    });
}