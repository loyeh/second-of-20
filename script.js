const footer = document.getElementById("footer");
const movieList = document.getElementById("movies").options;
const movies = [...document.getElementById("movies").options];
const seats = [...document.getElementsByClassName("cinema_seats")];
const numberOfSeats = document.getElementById("number_of_seats");
const ticketPrice = document.getElementById("ticket_price");
const nLeftSeats = 12;
const nMidSeats = 24;
const nRightSeats = 12;
let selectedSeats = [];
let price = 0;
let number_of_seats = 0;
let occupiedSeats = [];

window.addEventListener("beforeunload", storeSeatsInfo);

//make grid for each cinema section(left, middle, right)
function initSection(sectionId, sectionLength, counter) {
  const section = document.getElementById(sectionId);
  for (let i = 0; i < sectionLength; i++, counter++) {
    const div = document.createElement("div");
    div.className = "icon cinema_seats";
    div.id = `seat${counter}`;
    section.appendChild(div);
  }
  return counter;
}

//initializig the cinema seat grid
function init() {
  let counter = 0;
  counter = initSection("left_seats", nLeftSeats, counter);
  counter = initSection("middle_seats", nMidSeats, counter);
  counter = initSection("right_seats", nRightSeats, counter);
  loadSeatsInfo();
  assignSeatClass(occupiedSeats, "occupied");
  assignSeatClass(selectedSeats, "selected");
  priceUpdate();
}

//assign given classname to specified seats
function assignSeatClass(seatsIndex, className) {
  seatsIndex.forEach((seatNumber) => {
    document.getElementById(seatNumber).classList.add(className);
  });
}

//get seats info from localstorage and apply it
function loadSeatsInfo() {
  const selectedData = localStorage.getItem("selectedSeats");

  if (selectedData) {
    selectedSeats = [...JSON.parse(selectedData)];
  } else {
    selectedSeats = [];
  }
  if (localStorage.getItem("occupiedSeats")) {
    occupiedSeats = [...JSON.parse(localStorage.getItem("occupiedSeats"))];
  } else {
    occupiedSeats = ["seat17", "seat18", "seat29", "seat41", "seat30", "seat34", "seat35", "seat46", "seat40"];
  }
  if (localStorage.movieIndex) {
    movieList.selectedIndex = localStorage.movieIndex;
  } else {
    movieList.selectedIndex = 0;
  }
  // console.log(JSON.parse(localStorage.getItem("occupiedSeats")));
}

//set seats info from localstorage
function storeSeatsInfo() {
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  localStorage.setItem("occupiedSeats", JSON.stringify(["seat17", "seat18", "seat29", "seat41", "seat30", "seat34", "seat35", "seat46", "seat40"]));
  localStorage.movieIndex = movieList.selectedIndex;
}

//a function to show which seats have been selected and change its background color, and show us the information about that
function selectSeat(event) {
  let seatNumber = event.target.id;
  if (event.target.matches(".icon") && !event.target.matches(".occupied")) {
    if (!event.target.matches(".selected")) {
      event.target.classList.add("selected");

      selectedSeats.push(seatNumber.toString());
    } else {
      let seatIndex = selectedSeats.indexOf(seatNumber);
      selectedSeats.splice(seatIndex, 1);
      event.target.classList.remove("selected");
    }
  }

  console.log(seatNumber, selectedSeats);
  priceUpdate();
}

//updating the price parameter, every time the user selects a movie from dropdown selection menu
function priceUpdate() {
  const seats = document.getElementsByClassName("selected").length - 1;
  let index = movieList.selectedIndex;
  price = movieList[index].dataset.price * seats;
  // console.log(price);
  ticketPrice.innerText = `$${price}`;
  numberOfSeats.innerText = seats;
}

init();
