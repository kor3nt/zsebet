// Wypisanie meczy z bazy danych
$.ajax({
    type: "GET",
    url: "match.php",
}).done(function(data){
    if(/none/.test(data)){
        $('.none').show();
    }
    else{
        
        var matches= $.parseJSON(data);
        console.log(matches);
        for(var i = 0; i<matches.length; i++){
            let data = matches[i]['date'].slice(0, matches[i]['date'].search(" "));
            let godzina = matches[i]['date'].slice(matches[i]['date'].search(" ")+1, matches[i]['date'].lastIndexOf(':'));

            $('.output').append(
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
                        '<div class="buttons">'+
                            '<button class="btnEdit" type="button">Edytuj</button>'+
                            '<button class="btnBlock" type="button">Zablokuj</button>'+
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
            
        }
    }
});