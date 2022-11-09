//Modal - skontaktuj się z nami
var about = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var Addbtn = document.getElementById("AddWork");
var span = document.getElementsByClassName("close")[0];




btn.onclick = function(){
    about.style.display = "block";
    }

span.onclick = function() {
    about.style.display = "none";
    }

window.onclick = function(event){
if (event.target == about) {
    about.style.display = "none";
    }
}
function anuluj(){
    about.style.display = "none";
}

