import View from "./View.js";
import { MAP_ACCESS_TOKEN, IRELATLONG } from "../config.js";
// import icons from "../../images/icons.svg";

class MapView extends View {
  _parentEl = document.querySelector(".map-container");

  _errorMessage = "No map found for your query! Please try again ;)";
  _message = "";
  // mapcon = document.getElementById("map");
  // map = new mapboxgl.Map({
  //   container: `${mapcon}`, // container ID
  //   center: IRELATLONG, // starting position [lng, lat] for Ireland
  //   zoom: 7, // starting zoom
  // });

  addHandlerRender(handler) {
    // listen for when the url changes and load event
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addMarkers(map, data) {
    // console.log("addmarkers data: ", data);

    // loop through data, add markers to map
    data.forEach((marker) => {
      let latlngArr = [marker.long, marker.lat];
      console.log("latlngArr: ", latlngArr);

      // create a HTML element for each marker
      var el = document.createElement("div");
      // Add an id to each marker
      el.id = `marker-${marker.id}`;
      el.className = "marker";

      // console.log("marker data-id: ", marker.id);

      // make a marker for each skatepark and add it to the map
      new mapboxgl.Marker(el)
        .setLngLat(latlngArr)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(` <p>${marker.name} </p>`)
        )
        .addTo(map);

      el.addEventListener("click", (e) => {
        /* Fly to the point */
        this.flyToPark(map, latlngArr);
      });
    });
  }

  flyToPark(map, latlngArr) {
    map.flyTo({
      center: latlngArr,
      zoom: 15,
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
