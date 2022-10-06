import { putRequest } from "./api.js";
const passengersInputEdit = document.getElementById("passengersInputEdit");
const nameInputEdit = document.getElementById("nameInputEdit");
const speedInputEdit = document.getElementById("speedInputEdit");
const itemm = JSON.parse(sessionStorage.getItem("itemm"));
sessionStorage.removeItem("itemm");
const helik = JSON.parse(sessionStorage.getItem("helik"));
sessionStorage.removeItem("helik");
const edit_button = document.getElementById("edit_button");

passengersInputEdit.value = itemm.passengers;
nameInputEdit.value = itemm.name;
speedInputEdit.value = itemm.speed;
edit_button.addEventListener("click", () => {
  const item = {
    id: itemm.id,
    passengers: passengersInputEdit.value,
    name: nameInputEdit.value,
    speed: speedInputEdit.value,
  };

  putRequest(item);
  window.location.href = "./index.html";
});
