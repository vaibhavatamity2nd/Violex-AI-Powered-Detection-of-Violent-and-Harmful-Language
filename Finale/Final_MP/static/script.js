let senBtn = document.querySelector("#filter-icon");
let curr = true;
let micBtn = document.querySelector("#mic");
let clsBtn = document.querySelector("#close-popup"); // Fix: Use the correct ID for the close button
let audio = new Audio('static/Skype_call_sound.mp3');
// audio.volume = 0.01;

const mediaQuery = window.matchMedia('(max-width: 768px)');

senBtn.addEventListener("click", function () {
    if (true) {
        document.getElementById("card-cont").style.display = "flex";
        document.getElementById("hero-f").style.display = "none";
        // document.getElementById("popup").style.display = "flex";
    }
});

micBtn.addEventListener("click", function () {
    if (curr) {
        document.getElementById("popup").style.display = "flex";
        audio.volume = 0.01;
        audio.play();
        curr = false; // Fix: Use assignment, not comparison
    }
});
// --------------------------------------------------------------
const popup = document.getElementById("popup");

// Close the popup when clicking the close button
clsBtn.addEventListener("click", function () {
    popup.style.display = "none";
    if (audio && !audio.paused) {  // Check if audio exists and is playing
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
    }
    curr = true; // Reset state when closing the popup
});

// Close the popup when clicking anywhere outside the content
window.addEventListener("click", (event) => {
    // Check if the click is outside the popup content and is on the popup background
    if (popup.style.display === "block" && !popup.contains(event.target)) {
        popup.style.display = "none";
        if (audio && !audio.paused) {  // Check if audio exists and is playing
            audio.pause();
            audio.currentTime = 0; // Reset audio to the beginning
        }
        curr = true; // Reset state when closing the popup
    }
});

        
        // --------------------------------------------------------Backend-Flask-------------------------------------------
        


document.getElementById("filter-icon").addEventListener("click", async () => {
    const inputField = document.querySelector(".search-input");
    const chatContainer = document.querySelector(".chat-container"); // Ensure correct container is selected
    const sentence = inputField.value.trim();

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

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const result = await response.json();

        // Validate the backend response
        if (result.processed_sentence) {
            // Add user input as a "right" message
            createMessage(sentence, "right");

            // Add backend response as a "left" message after 1 second
            setTimeout(() => {
                createMessage(result.processed_sentence, "left");
            }, 1000);
        } else {
            alert(result.error || "Error processing the sentence.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing.");
    }
});

// Helper function to create and append messages
function createMessage(content, type) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", type); // "left" or "right"

    const profilePic = document.createElement("img");
    profilePic.classList.add("profile-pic");
    profilePic.src = type === "right" ? "static/john.jpg" : "static/Robo.jpg"; // Avatar for message type
    messageDiv.appendChild(profilePic);

    const bubbleDiv = document.createElement("div");
    bubbleDiv.classList.add("bubble");

    // Add the bubble to the messageDiv immediately without text
    messageDiv.appendChild(bubbleDiv);
    const chatContainer = document.querySelector(".chat-container");
    chatContainer.appendChild(messageDiv); // Add the message to the container
// -----------------------------------------------------------------------------------------
if (type === "left") {
    // Create loader container and dots
    const loader = document.createElement("section");
    loader.className = "dots-container";

    for (let i = 0; i < 5; i++) {
        const dot = document.createElement("div");
        dot.className = "dot";
        loader.appendChild(dot);
    }

    // Add loader to the bubbleDiv temporarily
    bubbleDiv.appendChild(loader);

    // Display the message after 3 seconds
    setTimeout(() => {
        bubbleDiv.removeChild(loader); // Remove loader
        bubbleDiv.textContent = content; // Set message content
    }, 3000); // 3000 milliseconds = 3 seconds
} else {
    // For right messages, set content immediately
    bubbleDiv.textContent = content;
}




// -----------------------------------------------------------------------------------------
}

        
