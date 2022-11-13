// Wyświetlanie lub zamykanie Modalu
var ModalTicket = document.getElementById("ModalTicket");
var btnTicket = document.getElementById("TicketBtnOpen");
var ticketModal = document.getElementById("ticketModal");

btnTicket.addEventListener("click", ()=> {
    ModalTicket.style.display = "block";
    writeTicket(0)
});

ticketModal.addEventListener("click", ()=> {
    ModalTicket.style.display = "none";
});

window.addEventListener("click", (event)=> {
    if (event.target == ModalTicket) {
        ModalTicket.style.display = "none";
    }
});

// wypisywanie kuponow
function writeTicket(id){
    $.ajax({
        type: "POST",
        url: "ticket.php",
        data: { 
            choose: id
        }
    }).done(function(data){
        $('#ticketsOutput').html('');

        if(/none/.test(data)){
            $('#ticketsOutput').html('<div class="none" style="display:block;">'+
                '<h1><i class="fa fa-exclamation-circle" aria-hidden="true"></i></h1>'+
                '<p>Zapraszamy do obstawiania!</p>'+
            '</div>');
        }
        else{
            let tickets = $.parseJSON(data);
            for(var i = 0; i<tickets.length; i++){
                let status, result, price;

                if(id == 0){
                    status = '<td><span class="waitTicket">Oczekujące</span></td>';
                    result = '<span class="bold">'+ tickets[i]['team'] +'</span>';
                    price = '<td>Stawka <br> <span class="bold">Potencjalna wygrana</span></td><td>' + tickets[i]['amount'] + ' ZSE Coins<br> <span class="bold">'+ parseInt(tickets[i]['amount'] * tickets[i]['multiple']) +' ZSE Coins</span></td>';
                }
                else if(tickets[i]['winner'] == tickets[i]['team']){
                    status = '<td><span class="winTicket">Wygrana</span></td>';
                    result = '<span class="winSpan">'+ tickets[i]['team'] +'</span>';
                    price = '<td>Stawka <br> <span class="winSpan">Wygrana</span></td><td>' + tickets[i]['amount'] + ' ZSE Coins<br> <span class="winSpan">'+ parseInt(tickets[i]['amount'] * tickets[i]['multiple']) +' ZSE Coins</span></td>';
                }
                else{
                    status = '<td><span class="loseTicket">Przegrana</span></td>';
                    result = '<span class="loseSpan">'+ tickets[i]['team'] +'</span>';
                    price = '<td>Stawka <br> <span class="loseSpan">Wygrana</span></td><td>' + tickets[i]['amount'] + ' ZSE Coins<br> <span class="loseSpan"> 0 ZSE Coins</span></td>';
                }
                
                $('#ticketsOutput').append('<div class="ticketElement">'+
                    '<table>'+
                        '<tr>'+
                            '<td>' + tickets[i]['date'] + '</td>'+
                            status+
                        '</tr>'+
                        '<tr>'+
                            '<td><h2>' + tickets[i]['LabelMatch'] + '</h2> Wynik: ' + result + '</td>'+
                            '<td><span class="ticketMultiple">' + tickets[i]['multiple'] + '</span></td>'+
                        '</tr>'+
                        '<tr>'+
                            price +
                        '</tr>'+
                        '<tr>'+
                            '<td style="text-align:center;" colspan="2"><small>' + tickets[i]['game'] + '</small></td>'+
                        '</tr>'+
                    '</table>'+
                '</div>');
            }
        }
    });
}
// SELECT team, amount, multiple, block, date, winner FROM `zsebet_bet` INNER JOIN zsebet_match ON zsebet_bet.id_game=zsebet_match.id WHERE nick = 'kor3nt' AND block=1 AND (winner IS NULL OR winner LIKE '');