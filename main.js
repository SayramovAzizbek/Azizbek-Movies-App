const searchMovieForm = document.querySelector(".search-form");
const searchMovieInput = document.querySelector(".search-input");
const yearStartInput = document.querySelector(".sort-start-year");
const yearEndInput = document.querySelector(".sort-end-year");
const yearSortBtn = document.querySelector(".sort-year-btn");
const ratingCategorySelect = document.querySelector(".movie-category-select");
const categorySortBtn = document.querySelector(".sort-category-btn");
const movieList = document.querySelector(".movie-list");
const movieBtn = document.querySelector(".js-card-modal-btn");
const notFoundFilmsList = document.querySelector(".not-found-films");
const notFoundBtn = document.querySelector(".not-found-btn");
const elSortMovies = document.querySelector(".js-sort-select");
const savedMovieList = document.querySelector(".saved-movie-list");
const savedBtn = document.querySelector(".open-saved-btn");

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
function movieRender(movie, titleRegex = "") {
  movieList.innerHTML = "";
  let movieFragment = document.createDocumentFragment();

  for (const kino of movie) {
    let cloneMovieTemplate = movieTemplate.cloneNode(true);

    cloneMovieTemplate.querySelector(".movie-item").dataset.itemId =
      kino.imdb_id;
    cloneMovieTemplate.querySelector(
      ".js-card-img"
    ).src = `http://i3.ytimg.com/vi/${kino.ytid}/mqdefault.jpg`;

    // ! Selection by input, selects typed search
    if (titleRegex.source !== "(?:)" && titleRegex) {
      cloneMovieTemplate.querySelector(".js-card-title").innerHTML =
        kino.Title.replace(
          titleRegex,
          `<mark class="p-0 bg-warning">${titleRegex.source}</mark>`
        );
    } else {
      cloneMovieTemplate.querySelector(".js-card-title").textContent =
        kino.Title;
    }

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

    cloneMovieTemplate.querySelector(".movie-save-btn").dataset.bookmarkBtnId =
      kino.imdb_id;

    movieFragment.appendChild(cloneMovieTemplate);
  }
  movieList.appendChild(movieFragment);
}

let bookmarkArr = JSON.parse(window.localStorage.getItem("bookmark")) || [];

// ! Add Saved List, chosen cards
movieList.addEventListener("click", (evt) => {
  if (evt.target.matches(".movie-save-btn")) {
    let itemBookmarkID = evt.target.dataset.bookmarkBtnId;
    let itemBook = movieHundred.find((item) => item.imdb_id == itemBookmarkID);

    if (!bookmarkArr.includes(itemBook)) {
      bookmarkArr.unshift(itemBook);
    }
    evt.target.classList.toggle("movie-save-btn--saved");
    window.localStorage.setItem("bookmark", JSON.stringify(bookmarkArr));
  }
});

// ! Saved btn
savedBtn.addEventListener("click", () => {
  savedMovies();
});

// ! Create element in saved list, and appenchild to saved list
const savedItemFragment = new DocumentFragment();
function savedMovies() {
  savedMovieList.innerHTML = "";
  bookmarkArr.forEach((item) => {
    let savedItem = document.createElement("li");
    savedItem.classList.add("saved-movie-item");

    let savedItemImg = document.createElement("img");

    let savedItemTextBox = document.createElement("div");
    savedItemTextBox.classList.add("saved-item-text-box");

    let savedItemMainTextBox = document.createElement("div");
    savedItemMainTextBox.classList.add("saved-item-main-text-box");

    let savedItemTitle = document.createElement("p");
    savedItemTitle.classList.add("saved-item-title");

    let savedItemTitleBox = document.createElement("div");
    savedItemTitleBox.classList.add("saved-item-title-box");

    let savedItemInfoBox = document.createElement("div");
    savedItemInfoBox.classList.add("saved-item-info-box");

    let savedItemYear = document.createElement("span");
    savedItemYear.textContent = item.movie_year;
    savedItemYear.classList.add("saved-item-year");

    let savedItemRating = document.createElement("span");
    savedItemRating.textContent = item.imdb_rating;
    savedItemRating.classList.add("saved-item-rating");

    let savedItemHours = document.createElement("span");
    savedItemHours.textContent = convertMinsToHrsMins(item.runtime);
    savedItemHours.classList.add("saved-item-hours");

    let savedMovieInfoTextBox = document.createElement("div");
    savedMovieInfoTextBox.classList.add("saved-movie-info-text-box");

    let savedItemDeleteBtn = document.createElement("button");
    savedItemDeleteBtn.classList.add("saved-item-delete-btn");
    savedItemDeleteBtn.type = "button";
    savedItemDeleteBtn.dataset.deleteBtnId = item.imdb_id;
    savedItemDeleteBtn.textContent = "";

    savedItemTitle.textContent = item.Title;
    savedItemImg.src = `http://i3.ytimg.com/vi/${item.ytid}/mqdefault.jpg`;

    savedItemTitleBox.appendChild(savedItemTitle);
    savedItemTextBox.appendChild(savedItemTitleBox);

    savedItemTextBox.appendChild(savedItemDeleteBtn);

    savedItem.appendChild(savedItemImg);

    savedItemInfoBox.appendChild(savedItemRating);
    savedItemInfoBox.appendChild(savedItemYear);

    savedMovieInfoTextBox.appendChild(savedItemInfoBox);
    savedMovieInfoTextBox.appendChild(savedItemHours);

    savedItemMainTextBox.appendChild(savedMovieInfoTextBox);
    savedItemMainTextBox.appendChild(savedItemTextBox);

    savedItem.appendChild(savedItemMainTextBox);
    savedItemFragment.appendChild(savedItem);
  });
  savedMovieList.appendChild(savedItemFragment);
}

// ! Delete saved item in saved list
savedMovieList.addEventListener("click", (evt) => {
  if (evt.target.matches(".saved-item-delete-btn")) {
    let deleteBtnId = evt.target.dataset.deleteBtnId;
    let deleteFindBtn = bookmarkArr.findIndex(
      (item) => item.imdb_id == deleteBtnId
    );
    bookmarkArr.splice(deleteFindBtn, 1);
    window.localStorage.setItem("bookmark", JSON.stringify(bookmarkArr));
    savedMovies();
  }
});

// ! Search movie
function onSearchMovieSubmit(evt) {
  evt.preventDefault();
  const searchElement = new RegExp(searchMovieInput.value.trim(), "gi");
  const searchMovieFilteredList = movieHundred.filter((item) =>
    item.Title.match(searchElement)
  );
  movieRender(searchMovieFilteredList, searchElement);
  if (searchMovieFilteredList.length > 0) {
    sortMovieCategory(searchMovieFilteredList);
    sortMoviesList(searchMovieFilteredList, elSortMovies.value);
    movieRender(searchMovieFilteredList, searchElement);
  } else {
    notFoundFilmsList.classList.remove("d-none");
    movieList.classList.add("d-none");
  }
}

searchMovieForm.addEventListener("submit", onSearchMovieSubmit);

// ! If move not found, show this modal
notFoundBtn.addEventListener("click", () => {
  notFoundFilmsList.classList.add("d-none");
  movieList.classList.remove("d-none");
  movieRender(movieHundred);
});

// ? Now this click doesn't work,
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

// ! Filter by Category name
const genres = [];
function sortMovieCategory(categorySorted) {
  movies.forEach((film) => {
    const genresMovie = film.Categories.split("|");

    genresMovie.forEach((category) => {
      if (!genres.includes(category)) {
        genres.push(category);
      }
    });
  });
  genres.sort();
}
sortMovieCategory();

// ! Select sorting by Categories
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

// ! Sort by Select's options
function sortMoviesList(sortedArray, sortType) {
  if (sortType == "a-z") {
    sortedArray.sort((a, b) => a.Title.charCodeAt(0) - b.Title.charCodeAt(0));
  } else if (sortType === "z-a") {
    sortedArray.sort((a, b) => b.Title.charCodeAt(0) - a.Title.charCodeAt(0));
  } else if (sortType === "tohigh") {
    sortedArray.sort((a, b) => a.imdb_rating - b.imdb_rating);
  } else if (sortType === "tolow") {
    sortedArray.sort((a, b) => b.imdb_rating - a.imdb_rating);
  } else if (sortType === "year-old") {
    sortedArray.sort((a, b) => a.movie_year - b.movie_year);
  } else if (sortType === "year-new") {
    sortedArray.sort((a, b) => b.movie_year - a.movie_year);
  }
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

// ! Open Modal
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
