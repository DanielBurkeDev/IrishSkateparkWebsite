import View from "./View.js";

class SkateparkView extends View {
  _parentEl = document.querySelector(".park-details");
  _errorMessage = "No Skateparks found for your query! Please try again ;)";
  _message = "";

  addHandlerRender(handler) {
    // listen for when the url changes and load event
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _generateMarkup() {
    return `
        <div class="park-img-container">
            <img class="park-img"src="./images/bushypark.jpg" alt="" />
          </div>
          <div class="park-description-container">
            <h2 class="park-title">${this._data.name}</h2>
            <p class="park-description">
            ${this._data.descr}
            </p>
          </div>
          <div class="park-text-container">
            <div class="park-address-container spec">
              <h3 class="park-address-title">Address</h3>
              <p class="park-address-text">${this._data.addrs}</p>
            </div>
            <div class="park-county-container spec">
              <h3 class="park-county-title">County</h3>
              <p class="park-county-text">${this._data.county}</p>
            </div>

              <div class="park-openinghours-container spec">
                <h3 class="park-openinghours-title">Opening hours</h3>
                <p class="park-openinghours-text">${this._data.openhrs}</p>
              </div>
              <div class="park-phone-container spec">
                <h3 class="park-phone-title">Phone</h3>
                <p class="park-phone-text">${this._data.phone}</p>
              </div>
              <div class="park-email-container spec">              
                <h3 class="park-email-title">Email</h3>
                <p class="park-email-text">${this._data.email}</p>
              </div>
              <div class="park-website-container spec">              
                <h3 class="park-website-title">Website</h3>
                <p class="park-website-text">${this._data.website}</p>
              </div>

          </div>

          <div class="park-specs-container">

            <div class="park-lights-container spec">
              <h3 class="park-lights-title">Lights</h3>
              <p class="park-lights-text">${this._data.lights}</p>
            </div>

            <div class="park-helmets-container spec">
              <h3 class="park-helmets-title">Helmets</h3>
              <p class="park-helmets-text">${this._data.helmets}</p>
            </div>   

            <div class="park-surface-container spec">
              <h3 class="park-surface-title">Surface</h3>
              <p class="park-surface-text">${this._data.surface}</p>
            </div>

            <div class="park-indooroutdoor-container spec">
              <h3 class="park-indooroutdoor-title">Indoor/Outdoor</h3>
              <p class="park-indooroutdoor-text">${this._data.indoutd}</p>
            </div>

            <div class="park-fee-container spec">
              <h3 class="park-fee-title">Fee</h3>
              <p class="park-fee-text">${this._data.fee}</p>
            </div>          

          </div>

            <h3 class="park-pros-title">Pros</h3>
            <p class="park-pros-text">${this._data.pros}</p>
            <h3 class="park-cons-title">Cons</h3>
            <p class="park-cons-text">${this._data.cons}</p>
    
    
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
export default new SkateparkView();
