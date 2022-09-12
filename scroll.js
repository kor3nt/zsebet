window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      document.getElementById("Nav").style.background = "#000";
    } else {
      document.getElementById("Nav").style.background = "none";
    }
}