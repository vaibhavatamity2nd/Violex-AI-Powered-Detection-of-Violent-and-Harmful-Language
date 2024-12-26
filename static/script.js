
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




// Adding Card

document.addEventListener("DOMContentLoaded", () => {
    const filterIcon = document.getElementById("filter-icon");
    const inputField = document.querySelector(".input");
    const solContainer = document.querySelector(".conv");

    // Function to create a new card
    function createCard(content, type) {
        const newCard = document.createElement("div");
        newCard.classList.add(type, "sol-card");

        const cardHeading = document.createElement("h2");
        cardHeading.textContent = content;
        newCard.appendChild(cardHeading);

        solContainer.appendChild(newCard);
    }

    // Event listener for the filter icon
    filterIcon.addEventListener("click", () => {
        const userInput = inputField.value.trim();

        if (userInput) {
            // Add user query as a new card
            createCard(userInput, "ques");

            // Fetch the response from the Flask server
            fetch("/process", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ sentence: userInput })
            })
                .then(response => response.json())
                .then(data => {
                    // Add server response as a new card
                    if (data && data.result_sentence) {
                        createCard(data.result_sentence, "sol");
                    } else {
                        createCard("No response received.", "sol");
                    }
                })
                .catch(error => {
                    console.error("Error fetching response:", error);
                    createCard("Error processing the request.", "sol");
                });
        } else {
            alert("Please enter a sentence.");
        }
    });
});






// Backend response

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
