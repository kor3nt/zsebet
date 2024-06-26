// Dodanie wybranego meczu do obszaru obstawiania
let bets = new Array();

function addBet(element) {
    let multiple = 0;
    let label, game;
    for(var i = 0; i<matches.length; i++){
        if(matches[i]['id'] == element.name){
            label = matches[i]['LabelMatch'];

            if(matches[i]['TeamA'] == element.id){
                multiple = matches[i]['multipleTeamA'];
            }
            else{
                multiple = matches[i]['multipleTeamB'];
            }
            game = matches[i]['game'];
            break;
        }
    }

    bets[element.name] = {
        'id': element.name,
        'yourBet': element.value,
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
    '"><div class="row"><div class="CloseElement"><small class="close" onclick="deleteBet(\'' + element.id +'\',\''+ element.name 
    +'\');"><i class="fa fa-trash-o" aria-hidden="true"></i></small></div><div class="BetsInfo"><small class="team">' 
    + label +'</small><p class="winner">Wynik meczu: <span class="text-bold text-blue">'
    + element.id + '</span></p><label>Kurs: <span class="text-bold text-yellow">'
    + multiple +'</span></label><input class="BetInput" onchange="updateValue(this);" min="10" type="number" id="'
    +element.name+'" placeholder="Wprowadź stawkę"></div></div></div>');
}

// Kasowanie wybranego meczu z obszaru obstawiania
function deleteBet(id, index){
    delete bets[index];

    document.getElementById(index).remove(); 
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
            errors[0] = "ready";
        }
    }

    if(errors.length == 1){
        
        document.getElementById('error').innerHTML = '';

        if(coins - amount < 0){
            document.getElementById('error').innerHTML = 'Nie posiadasz wystarczającej liczby ZSE COINS!';
        }
        else{
            $('.loading').show();
            BetPhp = JSON.stringify(bets);
            $.ajax({
                type: "POST",
                url: "bet.php",
                data: {
                    bets: BetPhp,
                },
                cache: false,
                success: function(data) {
                    // Serwer wyłączony / awaria
                    if(/servers/.test(data)){
                        alert('Błąd serwera! Przepraszamy za niedogodności i prosimy o skontaktowanie się z administracją!')
                    }
                    else{
                        $('.loading').hide();
                        betsModal.style.display = "block";
                        console.log( $.parseJSON(data))
                        var errorsBets = $.parseJSON(data);
                        

                        $('#winPriceBets').html(errorsBets['info']['winPrice'].toFixed(0) + ' ZSE Coinsów');
                        $('#amountPriceBets').html(errorsBets['info']['amount'] + ' ZSE Coinsów');
                        $('#multiplePriceBets').html(errorsBets['info']['multiple']);


                        if(errorsBets['error'].length > 0){
                            $('#blockBets').append('<tr>'+
                                '<td colspan="2"><h3>Błędy z meczami:</h3></td>'+
                            '</tr>')
                            

                            // Bład typu mecz zablokowany
                            for(var i in errorsBets['error']){
                                $('#blockBets').append('<tr>'+
                                    '<td class="errorBets"><i class="fa fa-times" aria-hidden="true"></i> ' + errorsBets['error'][i] + '</td>'+
                                    '<td class="errorBets">Mecz został już zablokowany </td>'+
                                '</tr>');
                            }
                        }

                    }
                }
            });
        }
    }
}

// Sprawdzanie czy wartość jest wprowadzona i dodanie klasy
function valuesInputs(amount, id){
    if(amount <= 0){
        document.getElementById(id).classList.add('errorsInput');
        return false;
    }
    else{
        document.getElementById(id).classList.remove('errorsInput');
        return true;
    }
}