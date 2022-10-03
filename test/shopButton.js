const menuOpen = document.getElementById("btnShop");
const menuClose = document.getElementById("CloseIcon");
const Bets = document.getElementById("betMenu");


// Open menu - phone
menuOpen.addEventListener("click", () => {
    Bets.style.opacity = "100%"
    Bets.style.left = "0%"
});

// Close menu click X in menu - phone 
menuClose.addEventListener("click", () => {
    Bets.style.opacity = "0%"
    Bets.style.left = "-100%"
});