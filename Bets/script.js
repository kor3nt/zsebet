// Dodanie wybranego meczu do obszaru obstawiania
let bets = new Array();

function addBet(element) {
    let game = (element.name).slice(0, (element.name).search(':')); 
    let teamA = (element.name).slice((element.name).search(':')+1, (element.name).search('-')); 
    let teamB = (element.name).slice((element.name).search('-')+1, (element.name).lastIndexOf(':')); 
    
    let multipleTeamA = (element.name).slice((element.name).lastIndexOf(':')+1, (element.name).lastIndexOf('-')); 
    let multipleTeamB = (element.name).slice((element.name).lastIndexOf('-')+1); 
    let multiple = 0;

    if(teamA == element.id){
        multiple = multipleTeamA;
    }
    else{
        multiple = multipleTeamB;
    }

    bets[element.value] = {
        'id': element.value,
        'yourBet': element.id,
        'game': game,
        'multiple': multiple,
        'amount': 0,
        'winningAmount': 0
    };

    if(document.getElementById(element.name)){
        document.getElementById(element.name).remove(); 
        updateAmountBet();
    }

    $('.MatchElements').append('<div class="Match" id="' + element.name + 
    '"><div class="row"><div class="CloseElement"><small class="close" onclick="deleteBet(\''+
     element.name + '\',\'' + element.id +'\',\''+ element.value 
     +'\');"><i class="fa fa-trash-o" aria-hidden="true"></i></small></div><div class="BetsInfo"><small class="team">' 
     + teamA +' - ' + teamB +'</small><p class="winner">Wynik meczu: <span class="text-bold text-blue">Wygrana '
     + element.id + '</span></p><label>Kurs: <span class="text-bold text-yellow">'
     + multiple +'</span></label><input class="BetInput" onchange="updateValue(this);" min="10" type="number" id="'
     +element.value+'" placeholder="Wprowadź stawkę"></div></div></div>');
    
}

// Kasowanie wybranego meczu z obszaru obstawiania
function deleteBet(element, id, index){
    delete bets[index];

    document.getElementById(element).remove(); 
    document.getElementById(id).checked = false;
    updateAmountBet();

    
}

// Ustawianie kwoty
function updateValue(e) {
    if(!e.value || e.value < 10){
        e.value = 0;
    }
    bets[e.id]['amount'] = parseInt(e.value);
    bets[e.id]['winningAmount'] = parseInt(e.value * bets[e.id]['multiple']);
    updateAmountBet();
    
    valuesInputs(bets[e.id]['amount'], bets[e.id]['id']);
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

// Dodanie Listenera po kliknięciu guzik Obstaw
const btnBet = document.getElementById("betMenuBtn");
btnBet.addEventListener("click", betMatches);
function betMatches(){
    let errors = [];
    let amount = 0;

    for(var i in bets){
        if(!valuesInputs(bets[i]['amount'], bets[i]['id'])){
            errors[i] = bets[i]['id'];
        }
        else{
            amount += bets[i]['amount'];
        }

        errors[0] = "ready";
    }

    if(errors.length == 1){
        $('.loading').show();

        BetPhp = JSON.stringify(bets);
        $.ajax({
            type: "POST",
            url: "bet.php",
            data: {
                bets: BetPhp,
                amount: amount
        },
        cache: false,
        success: function(data) {
            // Za mało ZSE COINSÓW
            if(/coins/.test(data)){
                document.getElementById('error').innerHTML = 'Nie posiadasz wystarczającej liczby ZSE COINS!';
                $('.loading').hide();
            }

            // Zwrócenie poprawnego wyniku
            if(/success/.test(data)){
                window.location.href = "../Bets";
            }

            // Serwer wyłączony / awaria
            if(/servers/.test(data)){
                alert('Błąd serwera! Przepraszamy za niedogodności i prosimy o skontaktowanie się z administracją!')
            }
        }
        });
    }
}

// Sprawdzanie czy wartość jest wprowadzona i dodanie klasy
function valuesInputs(amount, id){
    if(amount < 10){
        document.getElementById(id).classList.add('errorsInput');
        return false;
    }
    else{
        document.getElementById(id).classList.remove('errorsInput');
        return true;
    }
}