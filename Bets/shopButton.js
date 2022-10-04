const menuOpen = document.getElementById("btnShop");
const menuClose = document.getElementById("CloseIcon");
const Bets = document.getElementById("betMenu");


// Otwieranie menu na telefonie
menuOpen.addEventListener("click", () => {
    Bets.style.opacity = "100%"
    Bets.style.left = "0%"
});

// Zamknnięcie menu na telefonie, przycisk X
menuClose.addEventListener("click", () => {
    Bets.style.opacity = "0%"
    Bets.style.left = "-100%"
});