import View from "./View.js";

class SkateparkView extends View {
  _parentEl = document.querySelector(".park-details");
  _modalEl = document.querySelector(".modal");
  _errorMessage = "No Skateparks found for your query! Please try again ;)";
  _message = "";
  _modalCloseBtn = document.querySelectorAll(".close-modal");

  addHandlerRender(handler) {
    // listen for when the url changes and load event
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerModal() {
    const modalCloseBtn = document.querySelector(".close-modal");
    // listen for when the url changes and load event

    modalCloseBtn.addEventListener("click", () => this.openModal());
  }

  openModal() {
    this._modalEl.classList.toggle("hidden");
    // overlay.classList.remove("hidden");
  }

  closeModal() {
    // const modalCloseBtn = document.querySelector(".modal");
    console.log("from closeModal method");
    this._modalEl.classList.add("hidden");
  }

  // HIDING OR SHOWING PARK SPECS/INFO IF INFO EXISTS IN API DATA ABOUT PARK
  // SPEC IS SHORT FOR SPECIFICATION
  ifContentExists(data, spec) {
    let htmlMarkup;

    switch (spec) {
      case spec:
        if (spec === "cons" && data !== "") {
          htmlMarkup = `
          <div class="park-cons-container park-spec">
              <div class="spec-title-plus-icon">
                <span class="material-symbols-outlined">
                close
                </span>
                <h3 class="park-cons-title">Cons</h3>
              </div>
              <p class="park-cons-text">${this._data.cons}</p>
          </div>
          `;
          return htmlMarkup;
        }

      case spec:
        if (spec === "pros" && data !== "") {
          htmlMarkup = `
          <div class="park-pros-container park-spec">
              <div class="spec-title-plus-icon">
                <span class="material-symbols-outlined">
                check
                </span>
                <h3 class="park-pros-title">Pros</h3>
              </div>
                  <p class="park-pros-text">${this._data.pros}</p>
            </div>
          `;
          return htmlMarkup;
        }

      default:
        if (data === "") {
          htmlMarkup = "";
        }

        return htmlMarkup;
    }
  }

  _generateMarkup() {
    const prkNameWithSpace = this._data.name;
    const prkNameWithPlus = prkNameWithSpace.replace(/\s+/g, "+");
    const mapURL = `https://www.google.com/maps/place/${prkNameWithPlus}/`;
    console.log(this._data.lat);

    return `
        <h2 class="park-title">${this._data.name}</h2>
        <div class="park-img-container">
            <img class="park-img"src="${this._data.image}" alt="" />
          </div>
          <div class="park-description-container">
            
            <p class="park-description">
            ${this._data.descr}
            </p>
          </div>
          <div class="park-text-container">
            <div class="park-address-container park-spec">
              <div class="spec-title-plus-icon">
                <span class="material-symbols-outlined">
                location_on
                </span>
                <h3 class="park-address-title">Address</h3>
              </div>
              <p class="park-address-text">${this._data.addrs}</p>
            </div>

              <div class="park-openinghours-container park-spec">
              <div class="spec-title-plus-icon">
                <span class="material-symbols-outlined">
                schedule
                </span>
                  <h3 class="park-openinghours-title">Opening hours</h3>
              </div>
                <p class="park-openinghours-text">${this._data.openhrs}</p>
              </div>

            <div class="park-contact-container park-spec">
              <div class="spec-title-plus-icon">
                <span class="material-symbols-outlined">
                call
                </span>
                <h3 class="park-contact-title">Contact</h3>
              </div>
                <ul>
                  <li>                   
                    <span>${this._data.phone}</span>
                  </li>
                  <li>
                    <span>${this._data.email}</span>
                  </li>
                  <li>
                    <span>${this._data.website}</span>
                  </li>
                </ul>               
            </div>

              <div class="park-lights-container park-spec">
                <div class="spec-title-plus-icon">
                  <span class="material-symbols-outlined">
                  lightbulb
                  </span>
                  <h3 class="park-lights-title">Lights</h3>
                </div>
                <p class="park-lights-text">${this._data.lights}</p>
            </div>

            <div class="park-helmets-container park-spec">
              <div class="spec-title-plus-icon">
                <span class="material-symbols-outlined">
                sports_motorsports
                </span>
                <h3 class="park-helmets-title">Helmets</h3>
              </div>
              <p class="park-helmets-text">${this._data.helmets}</p>
            </div>   

            <div class="park-surface-container park-spec">
              <div class="spec-title-plus-icon">
                <span class="material-symbols-outlined">
                skateboarding
                </span>
                <h3 class="park-surface-title">Surface</h3>
              </div>
              <p class="park-surface-text">${this._data.surface}</p>
            </div>

            <div class="park-indooroutdoor-container park-spec">
              <h3 class="park-indooroutdoor-title">Indoor/Outdoor</h3>
              <p class="park-indooroutdoor-text">${this._data.indoutd}</p>
            </div>

            <div class="park-fee-container park-spec">
              <div class="spec-title-plus-icon">
                <span class="material-symbols-outlined">
                euro_symbol
                </span>
                <h3 class="park-fee-title">Fee</h3>
              </div>
              <p class="park-fee-text">${this._data.fee}</p>
            </div>            

            ${this.ifContentExists(this._data.pros, "pros")}
            ${this.ifContentExists(this._data.cons, "cons")}

          </div>
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
