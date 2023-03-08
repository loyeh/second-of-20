const movies = document.getElementById("movies").options;
const cinema_seats_list = document.getElementsByClassName("cinema_seats");
// console.log(movies);
const cinema_seats = [...cinema_seats_list];
const footer = document.getElementById("footer");

cinema_seats.forEach((seat, index) => {
  seat.id = `seat${index + 1}`;
  seat.getElementsByClassName.gridArea = `seat${index + 1}`;
});

function selectSeat(event) {
  if (event.target.matches(".icon") && !event.target.matches(".occupied")) {
    event.target.classList.toggle("selected");
    priceUpdate();
  }
}

// let text = "";
// for (let i = 1; i < 9; i++) {
//   if ((i - 2) % 8 == 0 || (i - 6) % 8 == 0) {
//     text += `seat${i} . `;
//   } else {
//     text += `seat${i} `;
//   }
// }
// console.log(text);

const moviesArr = [...movies];
let price = 0,
  number_of_seats = 0;

// for (const key in movies) {
//   if (movies.hasOwnProperty.call(movies, key)) {
//     const element = movies[key];
//     console.log(element.dataset.price);
//   }
// }
moviesArr.forEach((movie) => {
  console.log(movie.dataset.price);
});

function priceUpdate() {
  const selected_seats = document.getElementsByClassName("selected");
  number_of_seats = selected_seats.length - 1;
  let index = movies.selectedIndex;
  price = movies[index].dataset.price * number_of_seats;
  console.log(price);
  footer.innerHTML = `<p>You have selected <span>${number_of_seats}</span> for a price of <span>$${price}</span></p>`;
}
priceUpdate();
