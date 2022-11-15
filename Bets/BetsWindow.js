// Wyświetlanie lub zamykanie Modalu
var betsModal = document.getElementById("ModalBets");
var betsClose = document.getElementById("btnBetsModal");

betsClose.addEventListener("click", ()=> {
    window.location.href = "../Bets";
});

window.addEventListener("click", (event)=> {
    if (event.target == betsModal) {
        window.location.href = "../Bets";
    }
});