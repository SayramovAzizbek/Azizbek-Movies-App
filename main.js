let movieList = document.querySelector(".movie-list");
let movieBtn = document.querySelector(".js-card-modal-btn");

let movieFragment = document.createDocumentFragment();
let movieTemplate = document.querySelector(".movie-template").content;

let siteBody = document.querySelector(".site-body");
let mainModalBox = document.querySelector(".main-modal-box");
let modalTitle = document.querySelector(".js-modal-title");
let modalIframe = document.querySelector(".modal-iframe");
let modalRating = document.querySelector(".movie-modal-rating");
let modalCalendar = document.querySelector(".movie-modal-calendar");
let modalDuration = document.querySelector(".movie-modal-duration");
let modalGenres = document.querySelector(".js-film-modal-genres");
let modalSummary = document.querySelector(".js-card-summary");
let modalLinkImdb = document.querySelector(".link-show-imdb");
let modalCloseBtn = document.querySelector(".js-card-close-btn");

let movieHundred = movies.splice(0, 101);

// ! Converts from mins to hour
const convertMinsToHrsMins = (mins) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? "" + h : h;
  m = m < 10 ? "" + m : m;
  return `${h} hr ${m} min`;
};

movieHundred.forEach((movie) => {
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
    movie.Categories;
  cloneMovieTemplate.querySelector(".movie-duration").textContent =
    convertMinsToHrsMins(movie.runtime);
  cloneMovieTemplate.querySelector(".js-card-modal-btn").dataset.btnModalId =
    movie.imdb_id;

  movieFragment.appendChild(cloneMovieTemplate);
});

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
  modalGenres.textContent = kino.Categories;
  modalSummary.textContent = kino.summary;
  modalLinkImdb.href = `https://www.imdb.com/title/${kino.imdb_id}`;
}
movieList.addEventListener("click", function (evt) {
  if (evt.target.matches(".js-card-modal-btn")) {
    mainModalBox.classList.add("main-modal-box--on");
    siteBody.classList.add("site-body--on");
    showModal(evt.target.dataset.btnModalId);
    movieBtn.classList.add("d-none");
  }
});

movieList.appendChild(movieFragment);

modalCloseBtn.addEventListener("click", () => {
  siteBody.classList.remove("site-body--on");
  mainModalBox.classList.remove("main-modal-box--on");
});
