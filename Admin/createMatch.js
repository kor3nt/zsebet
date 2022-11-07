// Wyświetlanie lub zamykanie Modala
var modalAdd = document.getElementById("addModal");
var spanAdd = document.getElementById("AddClose");
var btnAdd = document.getElementById("addBtn");

btnAdd.addEventListener("click", ()=> {
    modalAdd.style.display = "block";
    for(let game of games){
        $('#chooseGame').append('<option value="'+ game['title'] +'">'+ game['title'] +'</option>');
    }  
})

spanAdd.addEventListener("click", ()=> {
    modalAdd.style.display = "none";
})

window.addEventListener("click", (event)=> {
  if (event.target == modalAdd) {
        modalAdd.style.display = "none";
  }
})

var btnSave = document.getElementById("btnAddModal");

btnSave.addEventListener("click", ()=> {
    if(checkInput($('#AddLabel')) && checkInput($('#AddTeamA')) && checkInput($('#AddTagA')) && checkInput($('#AddTeamB')) && checkInput($('#AddTagB')) && checkInput($('#chooseGame')) && checkInput($('#AddDate'))){
        $.ajax({
            type: "POST",
            url: "createMatch.php",
            data: { 
                teamA: $('#AddTeamA').val(),
                tagA: $('#AddTagA').val(),
                teamB: $('#AddTeamB').val(),
                tagB: $('#AddTagB').val(),
                date: $('#AddDate').val(),
                label: $('#AddLabel').val(),
                game: $('#chooseGame').val()
            }
        }).done(function(data){
            console.log(data)
             // Zwrócenie poprawnego wyniku
             if(/success/.test(data)){
                matchesWrite($("#filterMatch input[type='radio']:checked").val());
                modalAdd.style.display = "none";
                
                $("#MatchAdded").trigger('reset');
            }
    
            // Serwer wyłączony / awaria
            if(/servers/.test(data)){
                alert('Błąd serwera! Przepraszamy za niedogodności i prosimy o skontaktowanie się z administracją!');
            }
        });
    }
});


function checkInput(input){
    let text = input.val().trim();
    if(text){
        input.css("border", "1px solid black");
        return true;
    }

    input.css("border", "2px solid red");
    
    return false;
}


