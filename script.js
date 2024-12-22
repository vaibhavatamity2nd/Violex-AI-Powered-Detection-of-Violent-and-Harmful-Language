
let senBtn = document.querySelector("#filter-icon");

let curr = true;
const mediaQuery = window.matchMedia('(max-width: 768px)');

senBtn.addEventListener("click", function () {
    if (curr == true && !mediaQuery.matches) {
        // Then trigger an alert
        document.getElementById("input-cont").style.position = "relative";
        document.getElementById("input-cont").style.top = "28rem";
        document.getElementById("card-cont").style.display = "none";
        document.getElementById("sub-t").style.display = "none";
        document.getElementById("h1").style.display = "none";
    }
    else {
        // Check if the media query is true
        if (curr == true && mediaQuery.matches) {
            document.getElementById("card-cont").style.display = "none";
            document.getElementById("sub-t").style.display = "none";
            document.getElementById("h1").style.display = "none";
            document.getElementById("input-cont").style.position = "relative";
            document.getElementById("input-cont").style.top = "28rem";
            curr = false;
        }
    }
});


// let senBtn = document.querySelector("#filter-icon");

// let curr = true;  // Track toggle state
// const mediaQuery = window.matchMedia('(min-width: 400px)');

// senBtn.addEventListener("click", function () {
//     // Check if the media query matches (screen width >= 768px)
//     const isWideScreen = mediaQuery.matches;

//     console.log('Current state (curr):', curr);
//     console.log('Is screen wide (>= 768px):', isWideScreen);

//     // First condition: if curr is true or the screen width is less than 768px
//     if (curr || !isWideScreen) {
//         console.log('Executing the first condition (curr is true or screen is small)');
//         document.getElementById("input-cont").style.position = "relative";
//         document.getElementById("input-cont").style.top = "28rem";
//         document.getElementById("card-cont").style.display = "none";
//         document.getElementById("sub-t").style.display = "none";
//         document.getElementById("h1").style.display = "none";
//     }
//     // Second condition: if curr is true and screen width >= 768px
//     else if (curr && isWideScreen) {
//         console.log('Executing the second condition (curr is true and screen is wide)');
//         document.getElementById("card-cont").style.display = "none";
//         document.getElementById("sub-t").style.display = "none";
//         document.getElementById("h1").style.display = "none";
//         document.getElementById("input-cont").style.position = "relative";
//         document.getElementById("input-cont").style.top = "38rem";
//         curr = false; // Set curr to false after the second condition
//         console.log('Updated curr state:', curr);
//     }
// });

