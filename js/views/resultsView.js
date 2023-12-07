import View from "./View.js";

class ResultsView extends View {
  _parentEl = document.querySelector(".park-list");
  _errorMessage = "No Skateparks found for your query! Please try again ;)";
  _message = "";

  _generateMarkup() {
    console.log("from resultsView _data", this._data);
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview park-list-item" data-id="">
      <a class="preview__link" href="#${result.id}">
      <div class="list-container">
        <div class="thumb-container"><img class="list-thumb"src="./images/bushypark.jpg" alt="${result.name}"/></div>
          <div class="details-container">
            <h3 class="park__name">${result.name}</h3>
            <h4 class="park__address">${result.addrs}</h4>
            <p class="park__description">Opening Hours: ${result.openhrs}</p>
            <p class="park-details-surface-text">${result.surface}</p>
          </div>
        </div>
        </a>
      </li>
    `;
  }
}

export default new ResultsView();
