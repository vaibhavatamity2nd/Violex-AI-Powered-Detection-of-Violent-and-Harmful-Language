
let senBtn = document.querySelector("#filter-icon");

let curr = true;
const mediaQuery = window.matchMedia('(max-width: 768px)');
let audio = new Audio('static/Skype_call_sound.mp3');
audio.volume = 0.01;

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
    audio.volume = 0.01;
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


document.getElementById("filter-icon").addEventListener("click", async () => {
    const inputField = document.querySelector(".input");
    const sentence = inputField.value;

    if (!sentence) {
        alert("Please enter a sentence.");
        return;
    }

    try {
        // Send the input to the Flask backend
        const response = await fetch("/process", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sentence: sentence }),
        });

        const result = await response.json();
        if (result.processed_sentence) {
            // Update the result in the HTML
            document.querySelector("#sol-c .sol-card h2").innerText = sentence;
            document.querySelector("#ques-c .sol-card h2").innerText = result.processed_sentence;
        } else {
            alert("Error processing sentence.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing.");
    }
});
