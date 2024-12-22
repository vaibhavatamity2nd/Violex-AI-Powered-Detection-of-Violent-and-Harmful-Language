
let senBtn = document.querySelector("#filter-icon");

let curr = true;
const mediaQuery = window.matchMedia('(max-width: 768px)');
let audio = new Audio('Skype call sound.mp3');
audio.volume = 0.3;

senBtn.addEventListener("click", function () {
    if (curr == true && !mediaQuery.matches) {
        // Then trigger an alert
        document.getElementById("input-cont").style.position = "relative";
        document.getElementById("input-cont").style.top = "28rem";
        document.getElementById("card-cont").style.display = "none";
        document.getElementById("sub-t").style.display = "none";
        document.getElementById("h1").style.display = "none";
        document.getElementById("sol-c").style.display = "flex";
        document.getElementById("ques-c").style.display = "flex";
    }
    else {
        // Check if the media query is true
        if (curr == true && mediaQuery.matches) {
            document.getElementById("card-cont").style.display = "none";
            document.getElementById("sub-t").style.display = "none";
            document.getElementById("sol-c").style.display = "flex";
            document.getElementById("ques-c").style.display = "flex";
            document.getElementById("h1").style.display = "none";
            document.getElementById("input-cont").style.position = "relative";
            document.getElementById("input-cont").style.top = "28rem";
            curr = false;
        }
    }
});


const openPopup = document.getElementById('new-icon');
const closePopup = document.getElementById('close-popup');
const popup = document.getElementById('popup');

// Show the popup
openPopup.addEventListener('click', () => {
    popup.style.display = 'flex';
    audio.volume = 0.05;
    audio.play();
});

// Close the popup
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
    audio.pause();
});

// Close popup when clicking outside the content
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});
