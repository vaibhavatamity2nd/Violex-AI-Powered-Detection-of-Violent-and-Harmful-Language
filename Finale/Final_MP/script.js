let senBtn = document.querySelector("#filter-icon");
let curr = true;
let micBtn = document.querySelector("#mic");
let clsBtn = document.querySelector("#close-popup"); // Fix: Use the correct ID for the close button
let audio = new Audio('Skype_call_sound.mp3');
audio.volume = 0.01;

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
        curr = false; // Fix: Use assignment, not comparison
    }
});

clsBtn.addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
    curr = true; // Fix: Correct assignment to reset the state
});

const popup = document.getElementById("popup");

// Close popup when clicking outside the content
window.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.style.display = "none";
        curr = true; // Reset state when closing the popup
    }
});
        
        // ---------------------------------------------------------------------------------------------------
        
        
        
        // document.addEventListener("DOMContentLoaded", () => {
            //     const filterIcon = document.getElementById("filter-icon");
            //     const inputField = document.querySelector(".input");
            //     const solContainer = document.querySelector(".conv");
            
            //     // Function to create a new card
            //     function createCard(content, type) {
//         const newCard = document.createElement("div");
//         newCard.classList.add(type, "sol-card");

//         const cardHeading = document.createElement("h2");
//         cardHeading.textContent = content;
//         newCard.appendChild(cardHeading);

//         solContainer.appendChild(newCard);
//     }

//     // Event listener for the filter icon
//     filterIcon.addEventListener("click", () => {
//         const userInput = inputField.value.trim();

//         if (userInput) {
//             // Add user query as a new card
//             createCard(userInput, "ques");

//             // Fetch the response from the Flask server
//             fetch("/process", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ sentence: userInput }),
//             })
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error(`Server responded with status ${response.status}`);
//                     }
//                     return response.json();
//                 })
//                 .then((data) => {
//                     // Log the full response to debug
//                     console.log("Server response:", data);

//                     // Validate and handle the server response
//                     if (data && data.processed_sentence) {
//                         createCard(data.processed_sentence, "sol");
//                     } else if (data.error) {
//                         createCard(data.error, "sol");
//                     } else {
//                         createCard("No valid response received.", "sol");
//                     }
//                 })
//                 .catch((error) => {
//                     console.error("Error fetching response:", error);
//                     createCard("Error processing the request.", "sol");
//                 });
//         } else {
//             alert("Please enter a sentence.");
//         }
//     });
// });







// // Backend response

// document.getElementById("filter-icon").addEventListener("click", async () => {
//     const inputField = document.querySelector(".input");
//     const sentence = inputField.value;

//     if (!sentence) {
//         alert("Please enter a sentence.");
//         return;
//     }

//     try {
//         // Send the input to the Flask backend
//         const response = await fetch("/process", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ sentence: sentence }),
//         });

//         const result = await response.json();
//         if (result.processed_sentence) {
//             // Update the result in the HTML
//             document.querySelector("#sol-c .sol-card h2").innerText = sentence;
//             document.querySelector("#ques-c .sol-card h2").innerText = result.processed_sentence;
//         } else {
//             alert("Error processing sentence.");
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         alert("An error occurred while processing.");
//     }
// });
