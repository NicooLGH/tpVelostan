const title = document.querySelector(".title");
const nameStation = document.getElementById("namestation");
const BASE_URL1 =
  "https://transport.data.gouv.fr/gbfs/nancy/station_information.json";
const BASE_URL2 =
  "https://transport.data.gouv.fr/gbfs/nancy/station_status.json";
const error = document.querySelector(".error");
const info = document.querySelector(".info");
let veloDisponible = document.getElementById("velodisponible");
let placeDisponible = document.getElementById("placedisponible");
let value = "";

nameStation.addEventListener("change", (e) => {
  value = e.target.value;
  console.log(value);
  informationDisplay(value);
});

function getInformations() {
  fetch(BASE_URL1)
    .then((reponse) => reponse.json())
    .then((reponse2) => {
      lesstations_html = "";
      for (let i = 0; i < reponse2.data.stations.length; i++) {
        lesstations_html =
          `<option value=` +
          i +
          `>` +
          reponse2.data.stations[i].name +
          ` </option>` +
          lesstations_html;
      }
      nameStation.innerHTML = lesstations_html;
    });
}

function informationDisplay() {
  fetch(BASE_URL2)
    .then((data) => data.json())
    .then((stats) => {
      bikes = stats.data.stations[value].num_bikes_available;
      docks = stats.data.stations[value].num_docks_available;
      maj = stats.data.stations[value].last_reported;
      veloDisponible.innerHTML = `<p>` + bikes + `</p>`;
      placeDisponible.innerHTML = docks;
    });
}

getInformations();
