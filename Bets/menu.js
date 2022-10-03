const menuOpen = document.getElementById("Menu");
const menuClose = document.getElementById("CloseIcon");
const overlay = document.getElementById("SidebarContainer");


// Open menu - phone
menuOpen.addEventListener("click", () => {
    overlay.style.opacity = "100%"
    overlay.style.left = "0%"
});

// Close menu click X in menu - phone 
menuClose.addEventListener("click", () => {
    overlay.style.opacity = "0%"
    overlay.style.left = "-100%"
});