// Wypisanie nicku i liczby coinsów z bazy danych
let coins = 0;
$.ajax({
    type: "GET",
    url: "profil.php",
}).done(function(data){
    var profilCoins = $.parseJSON(data);
    coins = parseInt(profilCoins);
    
    $('#coins').html(profilCoins);
});

// Wypisanie topki z bazy danych
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
    if(/none/.test(data)){
        $('.none').show();
    }
    else{
        var matches= $.parseJSON(data);
        for(var i = 0; i<matches.length; i++){
            let data = matches[i]['date'].slice(0, matches[i]['date'].search(" "));
            let godzina = matches[i]['date'].slice(matches[i]['date'].search(" ")+1, matches[i]['date'].lastIndexOf(':'));

            $('.Main').append(
                '<div class="MainMatch">' + 
                    '<div class="row">' +
                        '<div class="left">' +
                            '<small>'+ matches[i]['game'] +'</small>' +
                            '<h4>'+ matches[i]['LabelMatch'] +'</h4>' +
                        '</div>' +
                        '<div class="center">' + 
                            '<small>'+ data +'</small><br>' +
                            '<small>'+ godzina +'</small>' +
                        '</div>' +
                        '<div class="right">' +
                            '<form>' +
                                '<label class="custom-radio">' +
                                    '<input type="radio" name="'+ matches[i]['LabelMatch'] + ';' + matches[i]['game'] + ':' +  matches[i]['TeamA'] + '-' + matches[i]['TeamB'] + ':' + matches[i]['multipleTeamA'] + '-' + matches[i]['multipleTeamB'] +'" value="' + matches[i]['id'] + '" id="' +  matches[i]['TeamA'] + '" onclick="addBet(this);">' +
                                    '<span class="radio-btn">' +
                                        matches[i]['TeamA'] + '<br>' +
                                        '<span>' + matches[i]['multipleTeamA'] + '</span>' +
                                    '</span>' +
                                '</label>' +

                                '<label class="custom-radio">' +
                                    '<input type="radio" name="'+ matches[i]['LabelMatch'] + ';' + matches[i]['game'] + ':' +  matches[i]['TeamA'] + '-' + matches[i]['TeamB'] + ':' + matches[i]['multipleTeamA'] + '-' + matches[i]['multipleTeamB'] +'" value="' + matches[i]['id'] + '" id="' +  matches[i]['TeamB'] + '" onclick="addBet(this);">' +
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
    }
});