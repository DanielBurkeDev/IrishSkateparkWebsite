import View from "./View.js";
import previewView from "./previewView.js";

class ResultsView extends View {
  _parentEl = document.querySelector(".parks");
  _errorMessage = "No Skateparks found for your query! Please try again ;)";
  _message = "";

  _generateMarkup() {
    console.log("from resultsView _data", this._data);
    // return this._data.map(this._generateMarkupPreview).join("");

    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }

  // _generateMarkupPreview(result) {
  //   const id = window.location.hash.slice(1);
  //   // console.log("url id: ", id);
  //   // console.log("result.id: ", result.id);

  //   return `

  //   <div class="preview park-list-item" data-id="">
  //     <a class="preview__link ${
  //       result.id === id ? "preview__link--active" : ""
  //     }" href="#${result.id}">
  //      <div class="list-container">
  //           <div class="thumb-container"><img class="list-thumb"src="${
  //             result.image
  //           }" alt="${result.image}"/>
  //           </div>
  //           <div class="details-container">
  //             <h3 class="park__name">${result.name}</h3>
  //             <h4 class="park__address">${result.addrs}</h4>
  //             <p class="park__description">Opening Hours: ${result.openhrs}</p>
  //             <p class="park-details-surface-text">${result.surface}</p>
  //           </div>
  //       </div>
  //     </a>
  //   </div>
  //   `;
  // }
}

export default new ResultsView();
