
let senBtn = document.querySelector("#filter-icon");

let curr = true;

senBtn.addEventListener("click", function () {
  if (curr == true) {
    document.getElementById("card-cont").style.display = "none";
    curr = false;
  }
});
