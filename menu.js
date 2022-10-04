const menuOpen = document.getElementById("Menu");
const menuClose = document.getElementById("CloseIcon");
const overlay = document.getElementById("SidebarContainer");


// Otwieranie menu na telefonie
menuOpen.addEventListener("click", () => {
    overlay.style.opacity = "100%"
    overlay.style.left = "0%"
});

// Zamknnięcie menu na telefonie, przycisk X
menuClose.addEventListener("click", () => {
    overlay.style.opacity = "0%"
    overlay.style.left = "-100%"
});


// Zamykanie menu za każdym razem jak się kliknie coś z listy
const home = document.getElementById("phone-home");
const about = document.getElementById("phone-about");
const joinus = document.getElementById("phone-joinus");
const access = document.getElementById("phone-access");

home.addEventListener("click", () => {
    overlay.style.opacity = "0%"
    overlay.style.left = "-100%"
});

about.addEventListener("click", () => {
    overlay.style.opacity = "0%"
    overlay.style.left = "-100%"
});

joinus.addEventListener("click", () => {
    overlay.style.opacity = "0%"
    overlay.style.left = "-100%"
});

access.addEventListener("click", () => {
    overlay.style.opacity = "0%"
    overlay.style.left = "-100%"
});