$.ajax({
    type: "GET",
    url: "players.php",
}).done(function(data){
    var result= $.parseJSON(data);
    // console.log(result);
    // console.log(result.length);
    for(var i = 0; i<result.length; i++){
        $('.HistoryElements').append(
            '<div class="player"><div class="row ' + (i==0 ? "gold" : i==1 ? "silver" : i==2 ? "bronze" : "") +'"><p class="left-player">' + (i+1) +'.</p><p class="center-player">' + result[i]['nick'] + '</p><p class="right-player">' + result[i]['coins'] + '</p></div></div>'
        );
    }
    
});

let bets = new Array();

function addBet(element) {
    let game = (element.name).slice(0, (element.name).search(':')); 
    let teamA = (element.name).slice((element.name).search(':')+1, (element.name).search('-')); 
    let teamB = (element.name).slice((element.name).search('-')+1, (element.name).lastIndexOf(':')); 
    let multiple = (element.name).slice((element.name).lastIndexOf(':')+1); 
    
    bets[element.value] = {
        'id': element.value,
        'yourBet': element.id,
        'game': game
    };

    console.log(bets);
    // console.log(game);
    // console.log(teamA);
    // console.log(teamB);
    // console.log(multiple);

    if(document.getElementById(element.name)){
        document.getElementById(element.name).remove(); 
    }

    $('.MatchElements').append('<div class="Match" id="' + element.name + '"><div class="row"><div class="CloseElement"><small class="close" onclick="deleteBet(\''+ element.name + '\',\'' + element.id +'\',\''+ element.value +'\');"><i class="fa fa-trash-o" aria-hidden="true"></i></small></div><div class="BetsInfo"><small class="team">' + teamA +' - ' + teamB +'</small><p class="winner">Wynik meczu: <span class="text-bold text-blue">Wygrana '+ element.id + '</span></p><label>Kurs: <span class="text-bold text-yellow">'+ multiple +'</span></label><input class="BetInput" type="text" placeholder="Wprowadź stawkę"></div></div></div>');
    
}


function deleteBet(element, id, index){
    bets.splice(index, 1);

    document.getElementById(element).remove(); 
    document.getElementById(id).checked = false; 

    // console.log(bets);
}

