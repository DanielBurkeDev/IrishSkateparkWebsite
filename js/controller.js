import * as model from "./model.js";
import skateparkView from "./views/skateparkView.js";
import searchView from "./views/searchView.js";
import { API_URL, IRELATLONG } from "./config.js";
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

    // console.log("id:", id);
    // console.log("model.state.skatepark.id: ", model.state.skatepark.id);
    // // 3) Also go to Marker with same id
    // if (id === model.state.skatepark.id) {
    //   const latlong = [model.state.skatepark.lat, model.state.skatepark.long];
    //   console.log("latlong: ", latlong);
    //   mapView.flyToPark(map, latlong);
    // }
  } catch (error) {
    skateparkView.renderError();
    console.log(error);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) GET SEARCHBOX QUERY
    const query = searchView.getQuery();
    if (!query) return;

    console.log(query);

    // Load All results
    if (query === "All" || query === "all") {
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

const controlPagination = function (goToPage) {
  // 3) render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render NEW pagination buttons
  paginationView.render(model.state.search);
};

// control MapResults
const controlMap = async function () {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2thdGRldiIsImEiOiJjbHQ4enNqMGgwemV2MnBtOWJkd25ub2d5In0.zrQ_kE97VwA1hiyL09V_jQ";

  try {
    const id = window.location.hash.slice(1);

    await model.loadAllSearchResults();
    resultsView.render(model.getSearchResultsPage());
    // Render pagination buttons
    paginationView.render(model.state.search);

    // GET DATA AND RENDER MAP
    // load all parks
    await model.loadAllParks();
    mapView.render(model.state.allParks);

    const map = new mapboxgl.Map({
      container: "map", // container ID
      center: IRELATLONG, // starting position [lng, lat] for Ireland
      zoom: 7, // starting zoom
    });

    mapView.addMarkers(map, model.state.allParks);

    if (!id) return;
    // console.log("id:", id);
    // console.log("model.state.skatepark.id: ", model.state.skatepark.id);

    let latlong = [model.state.skatepark.long, model.state.skatepark.lat];

    // 3) Also go to Marker with same id
    if (Number(id) === Number(model.state.skatepark.id)) {
      // let latlong = [model.state.skatepark.lat, model.state.skatepark.long];
      console.log("latlong: ", latlong);
      mapView.flyToPark(map, latlong);
    }
  } catch (error) {
    mapView.renderError();
    console.log(error);
  }
};

const checkGPS = async function () {
  console.log("checking GPS Location");
  const id = window.location.hash.slice(1);

  function success(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
  }
  function error() {
    console.log("Unable to retrieve your location");
  }

  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");

    // LOAD RESULTS
    await model.loadAllSearchResults();
    resultsView.render(model.getSearchResultsPage());

    // Render pagination buttons
    paginationView.render(model.state.search);
  } else {
    try {
      console.log("Locating…");
      navigator.geolocation.getCurrentPosition(success, error);

      //FIND NEAREST PARKS

      // LOAD RESULTS
      // await model.loadAllSearchResults();
      // resultsView.render(model.getSearchResultsPage());
      // // Render pagination buttons
      // paginationView.render(model.state.search);

      // // GET DATA AND RENDER MAP
      // await model.loadAllParks();
      // mapView.render(model.state.allParks);
      // mapView.LoadAllParksOnMap(IRELATLONG, model.state.allParks);
    } catch (error) {
      mapView.renderError();
      console.log(error);
    }
  }
};

const controlModal = async function () {
  console.log("x button clicked");
};

const init = function () {
  // checkGPS();
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
