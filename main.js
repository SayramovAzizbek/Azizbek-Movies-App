const searchMovieForm = document.querySelector(".search-form");
const searchMovieInput = document.querySelector(".search-input");

const letterStartToEnd = document.querySelector(".sorting-start-end");
const letterEndToStart = document.querySelector(".sorting-end-start");
const reverseAllSorted = document.querySelector(".reverse-all-sorted");

const yearStartInput = document.querySelector(".sort-start-year");
const yearEndInput = document.querySelector(".sort-end-year");
const yearSortBtn = document.querySelector(".sort-year-btn");

const ratingStartToEndBtn = document.querySelector(".sort-year-start-end");
const ratingEndToStartBtn = document.querySelector(".sort-year-end-start");

const ratingCategorySelect = document.querySelector(".movie-category-select");
const categorySortBtn = document.querySelector(".sort-category-btn");

const movieList = document.querySelector(".movie-list");
const movieBtn = document.querySelector(".js-card-modal-btn");

const notFoundFilmsList = document.querySelector(".not-found-films");
const notFoundBtn = document.querySelector(".not-found-btn");

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

// ! Main info 
function movieRender(movie) {
  movieList.innerHTML = "";

  let movieFragment = document.createDocumentFragment();

  for (const kino of movie) {
    let cloneMovieTemplate = movieTemplate.cloneNode(true);

    cloneMovieTemplate.querySelector(".movie-item").dataset.itemId =
      kino.imdb_id;
    cloneMovieTemplate.querySelector(
      ".js-card-img"
    ).src = `http://i3.ytimg.com/vi/${kino.ytid}/mqdefault.jpg`;
    cloneMovieTemplate.querySelector(".js-card-title").textContent = kino.Title;
    cloneMovieTemplate.querySelector(".card-title-tooltip").textContent =
      kino.Title;
    cloneMovieTemplate.querySelector(".movie-rating").textContent =
      kino.imdb_rating;
    cloneMovieTemplate.querySelector(".movie-calendar").textContent =
      kino.movie_year;
    cloneMovieTemplate.querySelector(".js-film-genres").textContent =
      kino.Categories.split("|").join(", ");
    cloneMovieTemplate.querySelector(".movie-duration").textContent =
      convertMinsToHrsMins(kino.runtime);
    cloneMovieTemplate.querySelector(".js-card-modal-btn").dataset.btnModalId =
      kino.imdb_id;

    movieFragment.appendChild(cloneMovieTemplate);
  }
  movieList.appendChild(movieFragment);
}

// ! Modal part
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

// ! Opem Modal
movieList.addEventListener("click", function (evt) {
  if (evt.target.matches(".js-card-modal-btn")) {
    mainModal.classList.add("main-modal--on");
    siteBody.classList.add("site-body--on");
    showModal(evt.target.dataset.btnModalId);
    movieBtn.classList.add("d-none");
  }
});

// ! Close Modal
modalCloseBtn.addEventListener("click", () => {
  siteBody.classList.remove("site-body--on");
  mainModal.classList.remove("main-modal--on");
  modalIframe.src = ``;
});

movieRender(movieHundred);

// ! Search movie
function onSearchMovieSubmit(evt) {
  evt.preventDefault();
  const searchElement = new RegExp(searchMovieInput.value.trim(), "gi");
  const searchMovieFilteredList = movieHundred.filter((item) =>
    item.Title.match(searchElement)
  );
  if (searchMovieFilteredList.length > 0) {
    movieRender(searchMovieFilteredList);
  } else {
    notFoundFilmsList.classList.remove("d-none");
    movieList.classList.add("d-none");
  }
  // searchMovieInput.value = "";
}

searchMovieForm.addEventListener("submit", onSearchMovieSubmit);

// ! If move not found, show this modal
notFoundBtn.addEventListener("click", () => {
  notFoundFilmsList.classList.add("d-none");
  movieList.classList.remove("d-none");
  movieRender(movieHundred);
});

// ! Sort movies start to end by name
letterStartToEnd.addEventListener("click", () => {
  const sortStartToEnd = movieHundred.sort((a, b) => {
    if (a.Title > b.Title) {
      return 1;
    } else if (a.Title < b.Title) {
      return -1;
    } else 0;
  });
  movieRender(sortStartToEnd);
});

// ! Sort movies end to start by name
letterEndToStart.addEventListener("click", () => {
  const sortEndToStart = movieHundred.sort((a, b) => {
    if (a.Title > b.Title) {
      return -1;
    } else if (a.Title < b.Title) {
      return 1;
    } else 0;
  });
  movieRender(sortEndToStart);
});

// ! Sort movie by year
yearSortBtn.addEventListener("click", () => {
  const yearStartInputValue = yearStartInput.value.trim();
  const yearEndInputValue = yearEndInput.value.trim();

  const sortedYearMovies = movieHundred.filter(function (item) {
    if (
      item.movie_year >= yearStartInputValue &&
      item.movie_year <= yearEndInputValue
    ) {
      return true;
    }
  });
  movieRender(sortedYearMovies);
});

// ! Sort movie start to end by rating
ratingStartToEndBtn.addEventListener("click", () => {
  const sortStartToEndRating = movieHundred.sort((a, b) => {
    if (a.imdb_rating > b.imdb_rating) {
      return 1;
    } else if (a.imdb_rating < b.imdb_rating) {
      return -1;
    } else 0;
  });
  movieRender(sortStartToEndRating);
});

// ! Sort movie end to start by rating
ratingEndToStartBtn.addEventListener("click", () => {
  const sortEndToStartRating = movieHundred.sort((a, b) => {
    if (a.imdb_rating > b.imdb_rating) {
      return -1;
    } else if (a.imdb_rating < b.imdb_rating) {
      return 1;
    } else 0;
  });
  movieRender(sortEndToStartRating);
});

// ! Filter by Category name
const genres = [];
movies.forEach((film) => {
  const genresMovie = film.Categories.split("|");

  genresMovie.forEach((category) => {
    if (!genres.includes(category)) {
      genres.push(category);
    }
  });
});
genres.sort();

const newSelectFragment = document.createDocumentFragment();
genres.forEach((option) => {
  const newMoviesOption = document.createElement("option");
  newMoviesOption.textContent = option;
  newMoviesOption.value = option;
  newSelectFragment.appendChild(newMoviesOption);
});

ratingCategorySelect.appendChild(newSelectFragment);

categorySortBtn.addEventListener("click", () => {
  const categorySelectValue = ratingCategorySelect.value;
  const categoryResult = movieHundred.filter((item) => {
    return item.Categories.includes(categorySelectValue);
  });
  movieRender(categoryResult);
});
