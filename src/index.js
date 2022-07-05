const stateForm = document.querySelector("#select-state-form");
const apiURL = "https://api.openbrewerydb.org/breweries";

const state = {
  types: ["regional"],
  usState: "",
  breweries: [],
};

stateForm.addEventListener("submit", (event) => {
  console.log("my event", event, event.target);
  event.preventDefault();
  state.usState = event.target[0].value;
  fetch(`${apiURL}?by_state${state.usState}&per_page=100`)
    .then((res) => {
      console.log("my fetch", res);
      return res.json();
    })
    .then((data) => {
      console.log("mydata", data);
      state.breweries = data;
      render();
    });
});

function render() {
  const BreweriesList = document.querySelector(".breweries-list");

  state.breweries.forEach((brewery) => {
    const liEl = document.createElement("li");
    const breweryName = document.createElement("h2");
    const tyepEl = document.createElement("div");
    tyepEl.className = "type";
    const addressSec = document.createElement("section");
    addressSec.className = "address";
    const addressHeader = document.createElement("h3");
    const addressFirstLine = document.createElement("p");
    const addressSecondLine = document.createElement("p");
    const phoneSec = document.createElement("section");
    phoneSec.className = "phone";
    const phoneHeader = document.createElement("h3");
    const phoneNumber = document.createElement("p");
    const linkSec = document.createElement("section");
    linkSec.className = "link";
    const linkAnchor = document.createElement("a");

    BreweriesList.appendChild(liEl);
    liEl.appendChild(breweryName);
    liEl.appendChild(tyepEl);
    liEl.appendChild(addressSec);
    liEl.appendChild(phoneSec);
    liEl.appendChild(linkSec);
    addressSec.appendChild(addressHeader);
    addressSec.appendChild(addressFirstLine);
    addressSec.appendChild(addressSecondLine);
    phoneSec.appendChild(phoneHeader);
    phoneSec.appendChild(phoneNumber);
    linkSec.appendChild(linkAnchor);

    breweryName.innerText = brewery["name"];
    tyepEl.innerText = brewery["brewery_type"];
    addressHeader.innerText = "address:";
    addressFirstLine.innerText = brewery["street"];
    addressSecondLine.innerText = brewery["city"];
    phoneHeader.innerText = "Phone:";
    phoneNumber.innerText = brewery["phone"];
    linkAnchor.innerText = "visit website";
  });
}
