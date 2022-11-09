const submitButton = document.getElementById("submit_button");
const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const countSpeed = document.getElementById("countSpeed");
const sortHelicopters = document.getElementById("sort_helicopters");
const passengersInput = document.getElementById("passengersInput");
const nameInput = document.getElementById("nameInput");
const speedInput = document.getElementById("speedInput");
const itemsContainer = document.getElementById("items_container");
const findInput = document.getElementById("findInput");
const ctn = document.getElementById("ctn");
import { getRequest, postRequest, deleteRequest } from "./api.js";

let storageContent = await getRequest();
sessionStorage.removeItem(getRequest());
let Helicopters = [];

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const inputValues = getInputValues();
  postRequest(inputValues);
  clearInputs();

  addItem(inputValues);
});

const addItem = (item) => {
  Helicopters.push(item);
  addItemToPage(item);
  const edit = document.getElementById("edit");
  edit.addEventListener("click", () => {
    sessionStorage.setItem("itemm", JSON.stringify(item));
    window.location.href = "./edit.html";
  });
  const remove = document.getElementById("remove");
  remove.addEventListener("click", () => {
    deleteRequest({ id: item.id });
    window.location.reload();
  });
};

const itemTemplate = ({ passengers, name, speed }) => {
  return `
  <ul id="invitedList">
  <li>
    <article>Passengers</article>
    <p>${passengers}</p>
    <article>Name</article>
    <p>${name}</p>
    <article>Speed</article>
    <p>${speed}</p>
    <button id="edit">edit</button>
    <button type="submit" id ="remove">remove</button>
  </li>
</ul>`;
};

const addItemToPage = (item) => {
  itemsContainer.insertAdjacentHTML("afterbegin", itemTemplate(item));
};

if (storageContent) {
  storageContent.map((item) => {
    addItem(item);
  });
}

const clearInputs = () => {
  passengersInput.value = "";
  nameInput.value = "";
  speedInput.value = "";
};

const getInputValues = () => {
  return {
    passengers: passengersInput.value,
    name: nameInput.value,
    speed: speedInput.value,
  };
};
export const renderItemsList = (items) => {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    addItemToPage(item);
  }
};

findButton.addEventListener("click", () => {
  const foundHelicopters = Helicopters.filter(
    (helicopter) => helicopter.speed.search(findInput.value) !== -1
  );

  renderItemsList(foundHelicopters);
});

cancelFindButton.addEventListener("click", () => {
  renderItemsList(Helicopters);

  findInput.value = "";
});

sortHelicopters.addEventListener("click", () => {
  const sortHelicopters = Helicopters.sort((a, b) => {
    return a.speed - b.speed;
  });
  renderItemsList(sortHelicopters);
});

countSpeed.addEventListener("click", (event) => {
  event.preventDefault();

  let totalSpeed = 0;

  for (const helicopter of Helicopters) {
    totalSpeed += parseInt(helicopter.speed);
  }

  if (document.getElementById("count"))
    ctn.removeChild(document.getElementById("count"));
  ctn.insertAdjacentHTML(
    "afterbegin",
    `
            <div id="count"><h4> All Speed: ${totalSpeed} </h4></div>`
  );
});
