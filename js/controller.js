import * as model from "./model.js";
import skateparkView from "./views/skateparkView.js";
import searchView from "./views/searchView.js";
import { API_URL } from "./config.js";
import resultsView from "./views/resultsView.js";

// =================================================
// API CALL

const parksContainer = document.querySelector(".park-list");
const parksResultsContainer = document.querySelector(".park-details");
const listItem = document.querySelector(".park-list-item");

// const getSkateparksData = async function () {
//   try {
//     // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const res = await fetch(`${API_URL}`);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     // console.log(res);
//     // console.log(data);
//     renderParkList(data);
//   } catch (error) {
//     console.log(error);
//   }
// };
// getSkateparksData();

// show list of parks/items on left sidebar
// const renderParkList = function (data, className = "") {
//   const id = window.location.hash.slice(1);

//   const html = data
//     .map(({ id, name, address, openinghours, surface }) => {
//       return `
//       <li class="park-list-item" data-id="${id}">
//         <a class="preview__link ${
//           id === id ? "preview__link--active" : ""
//         }" href="#${id}">
//         <div class="list-container">
//           <div class="thumb-container"><img class="list-thumb"src="./images/bushypark.jpg"/></div>
//             <div class="details-container">
//               <h3 class="park__name">${name}</h3>
//               <h4 class="park__address">${address}</h4>
//               <p class="park__description">Opening Hours: ${openinghours}</p>
//               <p class="park-details-surface-text">${surface}</p>
//             </div>
//           </div>
//           </a>
//         </li>
//       `;
//     })
//     .join("");

//   // parksContainer.innerHTML = "";
//   parksContainer.insertAdjacentHTML("beforeend", html);
//   parksContainer.style.opacity = 1;
// };

// Show details of a park when park from list is clicked on, maybe location on map
// pull id from url
// get park from data that equals the id`
const controlSkateparks = async function () {
  try {
    const id = window.location.hash.slice(1);

    //guard clause
    if (!id) return;
    skateparkView.renderSpinner();

    // 1) Loading the park
    await model.loadPark(id);

    // 2) Rendering the park
    skateparkView.render(model.state.skatepark);
  } catch (error) {
    console.log(error);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) get search query
    const query = searchView.getQuery();

    if (!query) return;

    // 2) load search results
    await model.loadSearchResults(query);

    // 3) render results
    resultsView.render(model.getSearchResultsPage(1));
  } catch (error) {
    console.log(error);
  }
};
controlSearchResults();

const init = function () {
  skateparkView.addHandlerRender(controlSkateparks);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
