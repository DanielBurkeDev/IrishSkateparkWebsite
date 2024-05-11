import View from "./View.js";
// import icons from "url:../../img/icons.svg"; // Parcel 2

class PreviewView extends View {
  _parentEl = "";

  _generateMarkup() {
    const id = Math.floor(window.location.hash.slice(1));

    return `
      <div class="preview park-list-item" data-id="">
        <a class=" show-modal preview__link ${
          this._data.id === id ? "preview__link--active" : ""
        }" href="#${this._data.id}">
          <div class="list-container">
              <div class="thumb-container">
                  <img class="list-thumb"src="${this._data.image}" alt="${
      this._data.image
    }"/></div>
            <div class="details-container">
              <h3 class="park__name">${this._data.name}</h3>
              <div class="addr-container">
                <span class="material-symbols-outlined">
                location_on
                </span>
                <p class="park__address">${this._data.addrs}</p>
              </div>
              <div class="openhrs-container">
                <span class="material-symbols-outlined">
                schedule
                </span>
                <p class="park__openhrs">Opening Hours: ${
                  this._data.openhrs
                }</p>
              </div>
              
            </div>
            
          </div>
        </a>
      </div>
    `;
  }
}

export default new PreviewView();

/* <li class="preview">
<a class="preview__link ${
  this._data.id === id ? "preview__link--active" : ""
}" href="#${this._data.id}">
  <figure class="preview__fig">
    <img src="${this._data.image}" alt="${this._data.title}" />
  </figure>
  <div class="preview__data">
    <h4 class="preview__title">${this._data.title}</h4>
    <p class="preview__publisher">${this._data.publisher}</p>
    <div class="preview__user-generated ${
      this._data.key ? "" : "hidden"
    }">
      <svg>
      <use href="${icons}#icon-user"></use>
      </svg>
    </div>
  </div>
</a>
</li> */
