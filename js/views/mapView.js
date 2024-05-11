import View from "./View.js";
// import icons from "../../images/icons.svg";

class MapView extends View {
  _parentEl = document.querySelector(".map-container");

  _errorMessage = "No map found for your query! Please try again ;)";
  _message = "";

  // addHandlerClick(handler) {
  //   this._parentEl.addEventListener("click", function (e) {
  //     const btn = e.target.closest(".btn--inline");

  //     if (!btn) return;
  //     const goToPage = +btn.dataset.goto;

  //     handler(goToPage);
  //   });
  // }

  addHandlerRender(handler) {
    // listen for when the url changes and load event
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  initMap(long, lat) {
    // const position = { lat: -25.344, lng: 131.031 };
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2thdGRldiIsImEiOiJjbHQ4enNqMGgwemV2MnBtOWJkd25ub2d5In0.zrQ_kE97VwA1hiyL09V_jQ";
    const map = new mapboxgl.Map({
      container: "map", // container ID
      center: [long, lat], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });
  }

  // add data arg to recieve lat longs
  addMarker(long, lat) {
    // add markers to map
    for (const feature of geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.className = "marker";

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    }
  }

  _generateMarkup() {
    return `
    <div id="map"></div>  
      `;
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>

        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new MapView();
