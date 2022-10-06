// Wypisanie nicku i liczby coinsów z bazy danych
$.ajax({
    type: "GET",
    url: "profil.php",
}).done(function(data){
    var profilTab = $.parseJSON(data);

    $('#coins').html(profilTab['coins']);
    $('#profil').html(profilTab['nick']);
});

// Wypisanie meczy z bazy danych
$.ajax({
    type: "GET",
    url: "players.php",
}).done(function(data){
    var result= $.parseJSON(data);
    
    for(var i = 0; i<result.length; i++){
        $('.HistoryElements').append(
            '<div class="player"><div class="row ' + (i==0 ? "gold" : i==1 ? "silver" : i==2 ? "bronze" : "") +'"><p class="left-player">' + (i+1) +'.</p><p class="center-player">' + result[i]['nick'] + '</p><p class="right-player">' + result[i]['coins'] + '</p></div></div>'
        );
    }
});

// Wypisanie meczy z bazy danych
$.ajax({
    type: "GET",
    url: "match.php",
}).done(function(data){
    var matches= $.parseJSON(data);

    for(var i = 0; i<matches.length; i++){
        let data = matches[i]['date'].slice(0, matches[i]['date'].search(" "));
        let godzina = matches[i]['date'].slice(matches[i]['date'].search(" ")+1, matches[i]['date'].lastIndexOf(':'));

        $('.Main').append(
            '<div class="MainMatch">' + 
                '<div class="row">' +
                    '<div class="left">' +
                        '<small>'+ matches[i]['game'] +'</small>' +
                        '<h4>'+ matches[i]['TeamA'] +' - '+ matches[i]['TeamB'] +'</h4>' +
                    '</div>' +
                    '<div class="center">' + 
                        '<small>'+ data +'</small><br>' +
                        '<small>'+ godzina +'</small>' +
                    '</div>' +
                    '<div class="right">' +
                        '<form>' +
                            '<label class="custom-radio">' +
                                '<input type="radio" name="'+ matches[i]['game'] + ':' +  matches[i]['TeamA'] + '-' + matches[i]['TeamB'] + ':' + matches[i]['multipleTeamA'] + '-' + matches[i]['multipleTeamB'] +'" value="' + matches[i]['id'] + '" id="' +  matches[i]['TeamA'] + '" onclick="addBet(this);">' +
                                '<span class="radio-btn">' +
                                    matches[i]['TeamA'] + '<br>' +
                                    '<span>' + matches[i]['multipleTeamA'] + '</span>' +
                                '</span>' +
                            '</label>' +

                            '<label class="custom-radio">' +
                                '<input type="radio" name="'+ matches[i]['game'] + ':' +  matches[i]['TeamA'] + '-' + matches[i]['TeamB'] + ':' + matches[i]['multipleTeamA'] + '-' + matches[i]['multipleTeamB'] +'" value="' + matches[i]['id'] + '" id="' +  matches[i]['TeamB'] + '" onclick="addBet(this);">' +
                                '<span class="radio-btn">' +
                                    matches[i]['TeamB'] + '<br>' +
                                    '<span>' + matches[i]['multipleTeamB'] + '</span>'+
                                '</span>' +
                            '</label>' +
                        '</form>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }
});