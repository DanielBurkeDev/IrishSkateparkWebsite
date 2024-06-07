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

  // ADDS MARKER ON PARK CLICKED
  initMap(long, lat, name, addrs) {
    // const position = { lat: -25.344, lng: 131.031 };
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2thdGRldiIsImEiOiJjbHQ4enNqMGgwemV2MnBtOWJkd25ub2d5In0.zrQ_kE97VwA1hiyL09V_jQ";
    const map = new mapboxgl.Map({
      container: "map", // container ID
      center: [long, lat], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    // Create a default Marker, colored orange, rotated 45 degrees.
    const marker2 = new mapboxgl.Marker({ color: "#f6aa1c", rotation: 45 })
      .setLngLat([long, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(`<h3>${name}</h3><p>${addrs}</p>`)
      )

      .addTo(map);
  }

  LoadAllParksOnMap(long, lat, data) {
    console.log("loadallparks: ", data);

    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2thdGRldiIsImEiOiJjbHQ4enNqMGgwemV2MnBtOWJkd25ub2d5In0.zrQ_kE97VwA1hiyL09V_jQ";

    const map = new mapboxgl.Map({
      container: "map", // container ID
      center: [long, lat], // starting position [lng, lat]
      zoom: 7, // starting zoom
    });

    this.addMarkers(data, map);
  }

  addMarkers(data, map) {
    // add markers to map
    // console.log("addmarkers:", Array.isArray(data));
    // const latlngArr = [data.long, data.lat];

    data.forEach((marker) => {
      console.log("marker lat", typeof parseInt(marker.lat));
      let latlngArr = [marker.long, marker.lat];
      // create a HTML element for each feature
      var el = document.createElement("div");
      el.className = "marker";

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
        .setLngLat(latlngArr)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(` <p>${marker.name} </p>`)
        )
        .addTo(map);
    });
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
