// WYpisanie nicku i liczby coinsów z bazy danych
$.ajax({
    type: "GET",
    url: "profil.php",
}).done(function(data){
    var profilTab = $.parseJSON(data);

    $('#coins').html(profilTab['coins']);
    $('#profil').html(profilTab['nick']);
});

// Uzyskanie topki z pliku php
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

// Dodanie wybranego meczu do obszaru obstawiania
let bets = new Array();

function addBet(element) {
    let game = (element.name).slice(0, (element.name).search(':')); 
    let teamA = (element.name).slice((element.name).search(':')+1, (element.name).search('-')); 
    let teamB = (element.name).slice((element.name).search('-')+1, (element.name).lastIndexOf(':')); 
    let multiple = (element.name).slice((element.name).lastIndexOf(':')+1); 
    
    bets[element.value] = {
        'id': element.value,
        'yourBet': element.id,
        'game': game,
        'multiple': multiple,
        'amount': 0,
        'winningAmount': 0
    };

    console.log(bets);

    if(document.getElementById(element.name)){
        document.getElementById(element.name).remove(); 
    }

    $('.MatchElements').append('<div class="Match" id="' + element.name + '"><div class="row"><div class="CloseElement"><small class="close" onclick="deleteBet(\''+ element.name + '\',\'' + element.id +'\',\''+ element.value +'\');"><i class="fa fa-trash-o" aria-hidden="true"></i></small></div><div class="BetsInfo"><small class="team">' + teamA +' - ' + teamB +'</small><p class="winner">Wynik meczu: <span class="text-bold text-blue">Wygrana '+ element.id + '</span></p><label>Kurs: <span class="text-bold text-yellow">'+ multiple +'</span></label><input class="BetInput" onchange="updateValue(this);" type="number" id="'+element.value+'" placeholder="Wprowadź stawkę"></div></div></div>');
    
}


// Kasowanie wybranego meczu z obszaru obstawiania
function deleteBet(element, id, index){
    bets.splice(index, 1);

    document.getElementById(element).remove(); 
    document.getElementById(id).checked = false;
    updateAmountBet();
    // console.log(bets);
}

// Ustawianie kwoty
function updateValue(e) {
    if(!e.value){
        console.log(e.value);
        e.value = 0;
    }
    bets[e.id]['amount'] = parseInt(e.value);
    bets[e.id]['winningAmount'] = parseInt(e.value) * parseInt(bets[e.id]['multiple']);
    // console.log(bets[e.id]);
    updateAmountBet();
    
}

// Ustawianie w tablicy kwoty i dodanie do podsumowania
function updateAmountBet(){
    let amount = 0;
    let winningAmount = 0;
    for(var i in bets){
        amount += bets[i]['amount'];
        winningAmount += bets[i]['winningAmount'];
    }
    document.getElementById('totalBet').innerHTML = amount;
    document.getElementById('winning').innerHTML = winningAmount.toFixed(0);
}

