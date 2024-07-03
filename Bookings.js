"use strict";
"use strict";
const buses = [
  { time: "08:00", busNumber: "M1", destination: "Kikuyu" },
  { time: "10:00", busNumber: "M2", destination: "Thika" },
  { time: "12:00", busNumber: "M3", destination: "Upper Hill" },
  { time: "14:00", busNumber: "M4", destination: "Umoja" },
];

const searchTimeInput = document.getElementById("search-time");
const searchButton = document.getElementById("search-button");
const busList = document.getElementById("bus-list");
const userDetails = document.getElementById("bookingForm");
const printButton = document.getElementById("print-button");
const ticket = document.getElementById("ticket");

// Enable search button if time is entered
searchTimeInput.addEventListener("input", function () {
  searchButton.disabled = !searchTimeInput.value;
});

// Prevent double clicking
let isSearching = false;

searchButton.addEventListener("click", function () {
  if (isSearching) return;

  isSearching = true;
  setTimeout(() => (isSearching = false), 1000);

  const searchTime = searchTimeInput.value;
  const availableBuses = buses.filter((bus) => bus.time === searchTime);

  busList.innerHTML = "";

  if (availableBuses.length > 0) {
    availableBuses.forEach((bus) => {
      const busItem = document.createElement("div");
      busItem.innerHTML = `
                        <p>Bus Number: ${bus.busNumber}</p>
                        <p>Destination: ${bus.destination}</p>
                        <button onclick="selectBus('${bus.busNumber}', '${bus.destination}')">Select</button>
                    `;
      busList.classList.remove("hidden");
      busList.appendChild(busItem);
    });
  } else {
    busList.innerHTML = "<p>No buses available at this time.</p>";
  }
});

// Ensure selectBus is defined in the global scope
function selectBus(number, destination) {
  userDetails.classList.remove("hidden");
  printButton.onclick = function () {
    let name = document.querySelector("#name").value;
    let idNumber = document.querySelector("#id-number").value;
    let age = document.querySelector("#age").value;
    ticket.innerHTML = `<h2>My Ticket</h2>
                    <p>Name: ${name}</p>
                    <p>ID Number: ${idNumber}</p>
                    <p>Age: ${age}</p>
                    <p>Bus Number: ${number}</p>
                    <p>Destination: ${destination}</p>`;
    ticket.classList.remove("hidden");
    
    window.print();
  };
}