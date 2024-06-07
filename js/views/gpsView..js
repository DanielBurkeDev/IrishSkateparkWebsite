class GPSView extends View {
  _generateMarkup() {
    return `
      <div class="preview park-list-item" data-id="">
       
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

export default new GPSView();
