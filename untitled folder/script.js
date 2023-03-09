const movies = document.getElementById("movies").options;
const cinema_seats_list = document.getElementsByClassName("cinema_seats");
const body = document.body;
const cinema_seats = [...cinema_seats_list];
const footer = document.getElementById("footer");
const selectedSeats = [...document.getElementsByClassName("selected")];
const moviesArr = [...movies];
let price = 0;
let number_of_seats = 0;
const selectedArr = {};
selectedSeats.forEach((seat, index) => {
  selectedArr[index] = seat.id;
});

//store the whole html in the locale storage and recall it to have selected data available each time user reloads the page

// body.innerHTML = localStorage.getItem(body);

//setting a uniq id to every grid_element contains in cinema grid container (about 48 seats)

cinema_seats.forEach((seat, index) => {
  seat.id = `seat${index + 1}`;
  seat.getElementsByClassName.gridArea = `seat${index + 1}`;
});

//a function to show which seats have been selected and change its background color, and show us the information about that

function selectSeat(event) {
  if (event.target.matches(".icon") && !event.target.matches(".occupied")) {
    event.target.classList.toggle("selected");
  }
  let cinema = StoringPage();
  document.getElementById("cinema").innerHTML = "";
  document.getElementById("cinema").innerHTML = localStorage.cinema;
  // priceUpdate();
}

// moviesArr.forEach((movie) => {
//   console.log(movie.dataset.price);
// });

//updating the price parameter, every time the user selects a movie from dropdown selection menu

function priceUpdate() {
  const selected_seats = document.getElementsByClassName("selected");
  number_of_seats = selected_seats.length - 1;
  let index = movies.selectedIndex;
  price = movies[index].dataset.price * number_of_seats;
  console.log(price);
  footer.innerHTML = `<p>You have selected <span>${number_of_seats}</span> for a price of <span>$${price}</span></p>`;
}

//call the priceupdate function to sho the information at the very begining of the loaded page

priceUpdate();

function StoringPage() {
  let cinema = document.getElementById("cinema");
  console.log(cinema);
  localStorage.setItem("cinema", cinema);

  cinema = localStorage.getItem("cinema");
}
