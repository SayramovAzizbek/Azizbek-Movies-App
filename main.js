const searchMovieForm = document.querySelector(".search-form");
const searchMovieInput = document.querySelector(".search-input");

const movieList = document.querySelector(".movie-list");
const movieBtn = document.querySelector(".js-card-modal-btn");

let movieFragment = document.createDocumentFragment();
let movieTemplate = document.querySelector(".movie-template").content;

const siteBody = document.querySelector(".site-body");
const mainModalBox = document.querySelector(".main-modal-box");
const mainModal = document.querySelector(".main-modal");
const modalTitle = document.querySelector(".js-modal-title");
const modalIframe = document.querySelector(".modal-iframe");
const modalRating = document.querySelector(".movie-modal-rating");
const modalCalendar = document.querySelector(".movie-modal-calendar");
const modalDuration = document.querySelector(".movie-modal-duration");
const modalGenres = document.querySelector(".js-film-modal-genres");
const modalSummary = document.querySelector(".js-card-summary");
const modalLinkImdb = document.querySelector(".link-show-imdb");
const modalCloseBtn = document.querySelector(".js-card-close-btn");

let movieHundred = movies.slice(0, 101);

// ! Converts from mins to hour
const convertMinsToHrsMins = (mins) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  return `${h} hr ${m} min`;
};

// searchMovieForm.addEventListener("keyup", function (evt) {
//   evt.preventDefault();
//   let searchInput = searchMovieInput.value.toLowerCase();
//   let searchItem = movieHundred.filter((item) => {
//     return console.log(item.Title.toLowerCase().includes(searchInput));
//   });
//   showModal(searchItem);
// });

searchMovieForm.addEventListener("keyup", function (evt) {
  const term = evt.target.value.toLowerCase();
  const films = movieList.getElementsByTagName("li");
  Array.from(films).forEach(function (film) {
    const title = film.firstElementChild.textContent;
    if (title.toLowerCase().indexOf(term) != -1) {
      film.style.display = "block";
    } else {
      film.style.display = "none";
    }
  });
});

movieHundred.forEach((movie) => {
  movieList.innerHTML = "";
  let cloneMovieTemplate = movieTemplate.cloneNode(true);

  cloneMovieTemplate.querySelector(".movie-item").dataset.itemId =
    movie.imdb_id;
  cloneMovieTemplate.querySelector(
    ".js-card-img"
  ).src = `http://i3.ytimg.com/vi/${movie.ytid}/mqdefault.jpg`;
  cloneMovieTemplate.querySelector(".js-card-title").textContent = movie.Title;
  cloneMovieTemplate.querySelector(".card-title-tooltip").textContent =
    movie.Title;
  cloneMovieTemplate.querySelector(".movie-rating").textContent =
    movie.imdb_rating;
  cloneMovieTemplate.querySelector(".movie-calendar").textContent =
    movie.movie_year;
  cloneMovieTemplate.querySelector(".js-film-genres").textContent =
    movie.Categories.split("|").join(", ");
  cloneMovieTemplate.querySelector(".movie-duration").textContent =
    convertMinsToHrsMins(movie.runtime);
  cloneMovieTemplate.querySelector(".js-card-modal-btn").dataset.btnModalId =
    movie.imdb_id;

  movieFragment.appendChild(cloneMovieTemplate);
});
movieList.appendChild(movieFragment);

// ! Modal part code
function showModal(imdbID) {
  let kino = movieHundred.find(function (item) {
    return item.imdb_id == imdbID;
  });
  modalTitle.textContent = kino.Title;
  modalIframe.src = `https://www.youtube-nocookie.com/embed/${kino.ytid}`;
  modalRating.textContent = kino.imdb_rating;
  modalCalendar.textContent = kino.movie_year;
  modalDuration.textContent = convertMinsToHrsMins(kino.runtime);
  modalGenres.textContent = kino.Categories.split("|").join(", ");
  modalSummary.textContent = kino.summary;
  modalLinkImdb.href = `https://www.imdb.com/title/${kino.imdb_id}`;
}

movieList.addEventListener("click", function (evt) {
  if (evt.target.matches(".js-card-modal-btn")) {
    mainModal.classList.add("main-modal--on");
    siteBody.classList.add("site-body--on");
    showModal(evt.target.dataset.btnModalId);
    movieBtn.classList.add("d-none");
  }
});

modalCloseBtn.addEventListener("click", () => {
  siteBody.classList.remove("site-body--on");
  mainModal.classList.remove("main-modal--on");
  modalIframe.src = ``;
});
