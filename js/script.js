import { API_URL } from "./config.js";

// =================================================
// API CALL

const parksContainer = document.querySelector(".park-list");
const parksResultsContainer = document.querySelector(".park-details");
const listItem = document.querySelector(".park-list-item");

const getSkateparksData = async function () {
  try {
    // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const res = await fetch(`${API_URL}`);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    // console.log(res);
    // console.log(data);
    renderParkList(data);
  } catch (error) {
    console.log(error);
  }
};
getSkateparksData();

// show list of parks/items on left sidebar
const renderParkList = function (data, className = "") {
  const id = window.location.hash.slice(1);

  const html = data
    .map(({ id, name, address, openinghours, surface }) => {
      return `
      <li class="park-list-item" data-id="${id}">
        <a class="preview__link ${
          id === id ? "preview__link--active" : ""
        }" href="#${id}">
        <div class="list-container">
          <div class="thumb-container"><img class="list-thumb"src="./images/bushypark.jpg"/></div>
            <div class="details-container">
              <h3 class="park__name">${name}</h3>
              <h4 class="park__address">${address}</h4>
              <p class="park__description">Opening Hours: ${openinghours}</p>
              <p class="park-details-surface-text">${surface}</p>
            </div>
          </div>
          </a>
        </li>
      `;
    })
    .join("");
  console.log(html);
  // parksContainer.innerHTML = "";
  parksContainer.insertAdjacentHTML("beforeend", html);
  parksContainer.style.opacity = 1;
};

const renderSpinner = function (parentEl) {
  const markup = `
    <div class="spinner">
      <img src="./images/spinner.png">
      
    </div>
  `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

// Show details of a park when park from list is clicked on, maybe location on map
// pull id from url
// get park from data that equals the id`
const showParkDetails = async function () {
  try {
    const id = window.location.hash.slice(1);

    //guard clause
    if (!id) return;
    renderSpinner(parksResultsContainer);

    const res = await fetch(`${API_URL}${id}/`);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    let { skatepark } = data;

    skatepark = {
      id: data.id,
      name: data.name,
      addrs: data.address,
      county: data.county,
      image: data.image,
      lat: data.latitude,
      long: data.county,
      phone: data.phone,
      email: data.email,
      website: data.website,
      descr: data.description,
      rating: data.rating,
      comment: data.comment,
      lights: data.lights,
      openhrs: data.openinghours,
      helmets: data.helmets,
      surface: data.surface,
      indoutd: data.indooroutdoor,
      fee: data.fee,
      pros: data.pros,
      cons: data.cons,
    };
    console.log(skatepark);
    const markup = `
          <div class="park-img-container">
            <img class="park-img"src="./images/bushypark.jpg" alt="" />
          </div>
          <div class="park-description-container">
            <h2 class="park-title">${skatepark.name}</h2>
            <p class="park-description">
            ${skatepark.descr}
            </p>
          </div>
          <div class="park-text-container">
            <div class="park-address-container spec">
              <h3 class="park-address-title">Address</h3>
              <p class="park-address-text">${skatepark.addrs}</p>
            </div>
            <div class="park-county-container spec">
              <h3 class="park-county-title">County</h3>
              <p class="park-county-text">${skatepark.county}</p>
            </div>

              <div class="park-openinghours-container spec">
                <h3 class="park-openinghours-title">Opening hours</h3>
                <p class="park-openinghours-text">${skatepark.openhrs}</p>
              </div>
              <div class="park-phone-container spec">
                <h3 class="park-phone-title">Phone</h3>
                <p class="park-phone-text">${skatepark.phone}</p>
              </div>
              <div class="park-email-container spec">              
                <h3 class="park-email-title">Email</h3>
                <p class="park-email-text">${skatepark.email}</p>
              </div>
              <div class="park-website-container spec">              
                <h3 class="park-website-title">Website</h3>
                <p class="park-website-text">${skatepark.website}</p>
              </div>

          </div>

          <div class="park-specs-container">

            <div class="park-lights-container spec">
              <h3 class="park-lights-title">Lights</h3>
              <p class="park-lights-text">${skatepark.lights}</p>
            </div>

            <div class="park-helmets-container spec">
              <h3 class="park-helmets-title">Helmets</h3>
              <p class="park-helmets-text">${skatepark.helmets}</p>
            </div>   

            <div class="park-surface-container spec">
              <h3 class="park-surface-title">Surface</h3>
              <p class="park-surface-text">${skatepark.surface}</p>
            </div>

            <div class="park-indooroutdoor-container spec">
              <h3 class="park-indooroutdoor-title">Indoor/Outdoor</h3>
              <p class="park-indooroutdoor-text">${skatepark.indoutd}</p>
            </div>

            <div class="park-fee-container spec">
              <h3 class="park-fee-title">Fee</h3>
              <p class="park-fee-text">${skatepark.fee}</p>
            </div>          

          </div>

            <h3 class="park-pros-title">Pros</h3>
            <p class="park-pros-text">${skatepark.pros}</p>
            <h3 class="park-cons-title">Cons</h3>
            <p class="park-cons-text">${skatepark.cons}</p>

    `;
    parksResultsContainer.innerHTML = "";
    parksResultsContainer.insertAdjacentHTML("beforeend", markup);
  } catch (error) {
    console.log(error);
  }
};

// listen for when the url changes and load event
["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, showParkDetails)
);

// window.addEventListener("hashchange", showParkDetails);
// window.addEventListener("load", showParkDetails);
//

// const showParkDetails = function (data) {
//   const html = data.map((resultsdata) => {
//     const id = window.location.hash.slice(1);
//     if (!id) return;

//     return `

//       <img src="./images/dublin-bushy-park-01-1140x500.jpg" alt="" />
//       <h2 class="park-details-title">${resultsdata.name}</h2>
//       <p class="park-details-description">
//       ${resultsdata.description}
//       </p>
//       <h3 class="park-details-address-title">Address</h3>
//       <p class="park-details-address-text">${resultsdata.address}</p>
//       <h3 class="park-details-county-title">County</h3>
//       <p class="park-details-county-text">${resultsdata.county}</p>
//       <h3 class="park-details-openinghours-title">Opening hours</h3>
//       <p class="park-details-openinghours-text">${resultsdata.openinghours}</p>
//       <h3 class="park-details-phone-title">Phone</h3>
//       <p class="park-details-phone-text">${resultsdata.phone}</p>
//       <h3 class="park-details-email-title">Email</h3>
//       <p class="park-details-email-text">${resultsdata.email}</p>
//       <h3 class="park-details-website-title">Website</h3>
//       <p class="park-details-website-text">${resultsdata.website}</p>
//       <h3 class="park-details-lights-title">Lights</h3>
//       <p class="park-details-lights-text">${resultsdata.lights}</p>
//       <h3 class="park-details-helmets-title">Helmets</h3>
//       <p class="park-details-helmets-text">${resultsdata.helmets}</p>
//       <h3 class="park-details-surface-title">Surface</h3>
//       <p class="park-details-surface-text">${resultsdata.surface}</p>
//       <h3 class="park-details-indooroutdoor-title">Indoor/Outdoor</h3>
//       <p class="park-details-indooroutdoor-text">${resultsdata.indooroutdoor}</p>
//       <h3 class="park-details-fee-title">Fee</h3>
//       <p class="park-details-fee-text">${resultsdata.fee}</p>
//       <h3 class="park-details-pros-title">Pros</h3>
//       <p class="park-details-pros-text">${resultsdata.pros}</p>
//       <h3 class="park-details-cons-title">Cons</h3>
//       <p class="park-details-cons-text">${resultsdata.cons}</p>

//       `;
//   });

//   parksResultsContainer.insertAdjacentHTML("beforeend", html);
//   parksResultsContainer.style.opacity = 1;
// };

// HELPERS

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
// let map;
// let service;
// let infowindow;

// function initMap() {
//   const sydney = new google.maps.LatLng(-33.867, 151.195);

//   infowindow = new google.maps.InfoWindow();
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: sydney,
//     zoom: 15,
//   });

//   const request = {
//     query: "Museum of Contemporary Art Australia",
//     fields: ["name", "geometry"],
//   };

//   service = new google.maps.places.PlacesService(map);
//   service.findPlaceFromQuery(request, (results, status) => {
//     if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//       for (let i = 0; i < results.length; i++) {
//         createMarker(results[i]);
//       }

//       map.setCenter(results[0].geometry.location);
//     }
//   });
// }

// function createMarker(place) {
//   if (!place.geometry || !place.geometry.location) return;

//   const marker = new google.maps.Marker({
//     map,
//     position: place.geometry.location,
//   });

//   google.maps.event.addListener(marker, "click", () => {
//     infowindow.setContent(place.name || "");
//     infowindow.open(map);
//   });
// }

// window.initMap = initMap;
