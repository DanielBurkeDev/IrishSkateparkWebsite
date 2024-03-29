import * as model from "./model.js";
import skateparkView from "./views/skateparkView.js";
import searchView from "./views/searchView.js";
import { API_URL } from "./config.js";
import { RES_PER_PAGE } from "./config.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import mapView from "./views/mapView.js";

// =================================================
// API CALL

const parksContainer = document.querySelector(".park-list");
const parksResultsContainer = document.querySelector(".park-details");
const listItem = document.querySelector(".park-list-item");

const modal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

// Show details of a park when park from list is clicked on, maybe location on map
// pull id from url
// get park from data that equals the id`
const controlSkateparks = async function () {
  try {
    const id = window.location.hash.slice(1);
    const modalCloseBtn = document.querySelectorAll(".close-modal");
    //guard clause
    if (!id) return;
    skateparkView.renderSpinner();

    // 0) update resultsView to make search result active
    resultsView.render(model.getSearchResultsPage());

    // show modal
    // const modal = document.querySelector(".modal");
    // console.log(modal);
    modal.classList.remove("hidden");
    if (modalCloseBtn.e === "click") {
      closeModal();
    }

    // 1) Loading the park
    await model.loadPark(id);

    // 2) Rendering the park
    skateparkView.render(model.state.skatepark);
  } catch (error) {
    skateparkView.renderError();
    console.log(error);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    console.log(query);
    // Load All results
    if (query === "All") {
      await model.loadAllSearchResults();
    } else {
      // 2) load search results
      await model.loadSearchResults(query);
    }
    // 3) render results
    resultsView.render(model.getSearchResultsPage());

    // Render pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
// controlSearchResults();

const controlPagination = function (goToPage) {
  // 3) render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render NEW pagination buttons
  paginationView.render(model.state.search);
};

// control MapResults
const controlMap = async function () {
  try {
    const id = window.location.hash.slice(1);

    //guard clause
    if (!id) return;

    // 1) Loading the park
    await model.loadPark(id);

    const { long, lat } = model.state.skatepark;

    // const longlat = long.concat(",", " ", lat);

    console.log(long, lat);

    mapView.initMap(long, lat);
  } catch (error) {
    mapView.renderError();
    console.log(error);
  }
};

const controlModal = async function () {
  console.log("x button clicked");
};

const init = function () {
  skateparkView.addHandlerRender(controlSkateparks);
  skateparkView.addHandlerModal();
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);

  mapView.addHandlerRender(controlMap);
};
init();

// Modal

const openModal = function () {
  modal.classList.remove("hidden");
  // overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  // overlay.classList.add("hidden");
};

// btnsOpenModal.addEventListener("click", openModal);

// btnCloseModal.addEventListener("click", closeModal);
// overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  // console.log(e.key);

  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
