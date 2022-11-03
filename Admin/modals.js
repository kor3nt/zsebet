// Wyświetlanie lub zamykanie Modalu
var modal = document.getElementById("editModal");
var span = document.getElementById("close");

span.addEventListener("click", ()=> {
  modal.style.display = "none";
})

window.addEventListener("click", (event)=> {
  if (event.target == modal) {
    modal.style.display = "none";
  }
})

function openModal(offer){
    modal.style.display = "block";

    for(var i = 0; i<matches.length; i++){
        if(matches[i]['id'] == offer){
            $('#title').html(matches[i]['LabelMatch']);

            $('#TeamA').val(matches[i]['TeamA']);
            $('#TagA').val(matches[i]['TagTeamA']);

            $('#TeamB').val(matches[i]['TeamB']);
            $('#TagB').val(matches[i]['TagTeamB']);
            
            $('#date').val(matches[i]['date']);
            $('#Label').val(matches[i]['LabelMatch']);

            $('#game').html('<option value="'+ matches[i]['game'] +'" selected hidden>'+ matches[i]['game'] +'</option>');
            
            for(let game of games){
              $('#game').append('<option value="'+ game['title'] +'">'+ game['title'] +'</option>');
            }

            if(matches[i]['block'] == 1){
              $('#winnerInput').html(
                    '<label for="winner">Wygrany: </label><br>'+
                    '<select id="winner">'+
                      '<option value="'+ matches[i]['winner'] +'" selected hidden>'+ matches[i]['winner'] +'</option>'+
                      '<option value="'+ matches[i]['TeamA'] +'">'+ matches[i]['TeamA'] +'</option>'+
                      '<option value="'+ matches[i]['TeamB'] +'">'+ matches[i]['TeamB'] +'</option>'+
                      '<option value="null"> null </option>'+
                    '</select>');
            }else{
              $('#winnerInput').html('');
            }
            
            $('#SaveMatch').html('<button type="button" class="btnUnlock" id="btnModal" onclick="saveMatch('+ matches[i]['id'] +')">Zapisz</button>');
            break;
        }
    }
}