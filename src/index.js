import "./styles.css";
var selectedCharacter = "";
var characterList = [
  "batman",
  "finn",
  "superman",
  "bugs",
  "shaggy",
  "jake",
  "lebron",
  "harley",
  "taz",
  "arya",
  "steven",
  "velma",
  "reindog",
  "garnet",
  "wonder_woman",
  "tom_and_jerry",
  "iron_giant"
];

var rankingOrder = [{ S: [] }, { A: [] }, { B: [] }, { C: [] }, { D: [] }];

function clg(content) {
  console.log(`${content}`, content);
}

// var rankingOrder = [
//   { S: ["batman", "finn", "superman", "bugs"] },
//   { A: ["shaggy", "jake", "lebron", "harley"] },
//   { B: ["taz", "arya", "steven", "velma", "reindog"] },
//   { C: ["garnet", "wonder_woman", "tom_and_jerry"] },
//   { D: ["iron_giant"] }
// ];

const inputField = document.getElementById("input-field-character");

function searchCharacter() {
  // Declare variables
  var input, filter, tierDiv, img, i, txtValue;
  input = document.getElementById("input-field-character");
  filter = input.value.toUpperCase();
  tierDiv = document.getElementById("tier-row-full-list");
  img = tierDiv.getElementsByTagName("img");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < img.length; i++) {
    txtValue = img[i].attributes["datavalue"].value;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      img[i].style.display = "";
    } else {
      img[i].style.display = "none";
    }
  }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const rankingOrderKeys = rankingOrder.map((item) => Object.keys(item)[0]);

// function searchCharacter(array, inputValue) {
//   console.log(inputValue);
//   var score = 0;
//   array.filter((word) => (word === inputValue ? console.log(word) : ""));

// }
/**
 * Empty Row Field
 * Add New Row
 *
 */
// const Add New Character = document.getElementsByClassName("btn-new");
// const tierRow = document.getElementById("tier-row");
// const rank_selection_list = document.querySelectorAll(".ranking-key-text");

const tier_row_container = document.getElementById("tier-row-container");
const tier_row_full_list = document.getElementById("tier-row-full-list");
const tier_modal_selection_container = document.getElementById(
  "tier-modal-selection-container"
);
// const characterIcon = document.querySelectorAll(".characterIcon");

// array.forEach(element => {

// });
// constcharacterIcon.forEach((element)=>{
//   element.addEventListener("click", (event) => {
//     console.log(event.target.attributes["charKey"].value);
//   });

// })

function tierModalSelectRow() {
  let icons = rankingOrderKeys.map((rankKey) => {
    return `
    <div class="ranking-key-text" dataValue="${rankKey}" >
      ${rankKey}
    </div>`;
  });
  let tierRow = `<div class="ranking-select-row glassmorph">${icons
    .join(",")
    .replace(/,/g, "")}</div>`;
  return tierRow;
}

function renderRankingOrder(content) {
  let rank = content.map((rank) => {
    let key = Object.keys(rank);
    let images = rank[key].map((img, index) => {
      return `<img class="avatar characterRemoveIcon" charKey="${index}" src="./image/${img}.webp" dataValue="${img}" alt="${img}">`;
    });
    return ` 
    <div class="tier-row">
      <div class="tier-heading-wrapper"><p class="tier-heading">${key}:</p></div>
      <div class="tier-body avatar-wrapper">
        ${images.join(",").replace(/,/g, "")}
      </div>
    </div>`;
  });
  return rank;
}

function renderCharacterRankList2() {
  let images = characterList.map((img, index) => {
    return `<img class="characterIcon" src="./image/${img}.webp" dataValue="${img}" alt="${img}">`;
  });
  return [
    `<div class=" tier-full-list">
    <div class="tier-heading-wrapper"><p class="tier-heading"> List: </p></div>
    <div class="tier-full-body avatar-wrapper">
      ${images.join(",").replace(/,/g, "")}
    </div>
  </div>`
  ];
}
function renderCharacterRankList(content) {
  let characterImage = content.map((img, index) => {
    return `<img class="characterIcon" src="./image/${img}.webp" dataValue="${img}" alt="${img}">`;
  });
  let characterDivArray = [
    `<div class=" tier-full-list">
    <div class="tier-heading-wrapper"><p class="tier-heading"> List: </p></div>
    <div class="tier-full-body avatar-wrapper">
      ${characterImage.join(",").replace(/,/g, "")}
    </div>
  </div>`
  ];
  return characterDivArray;
}
/* Content Has Loaded Render Table */

function updateTierRowContainer(content) {
  tier_row_container.innerHTML = content.join(",").replace(/,/g, "");
  console.log(tier_row_container);
}
function updateCharacterRankList(content) {
  tier_row_full_list.innerHTML = content;
}
// tier_row_full_list.innerHTML = renderCharacterRankList();
tier_modal_selection_container.innerHTML = tierModalSelectRow();

const tier_row_full_list_CharacterList = document.querySelectorAll(
  ".characterIcon"
);
const ranking_key_text = document.querySelectorAll(".ranking-key-text");

/*-------------------
 * Event Listeners
 -------------------*/

// Event - Display Modal
function handleDisplayModal() {
  inputField.addEventListener("input", (event) => {
    // modal.style.display = "block";
    searchCharacter(characterList, event.target.value);
  });
}
// Event - Search Character in Modal
function handleSearchCharacterModal() {
  inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      console.log(event.key);
      console.log(event.target.value);
    }
  });
}

function modalDisplayEventListner() {
  console.log("trigger modal display");
  let tierFullList = document.querySelectorAll(".characterIcon");
  for (let i = 0; i < tierFullList.length; i++) {
    debugger;
    tierFullList[i].addEventListener("click", (event) => {
      modal.style.display = "block";
      console.log(event.target.attributes["datavalue"].value);
      selectedCharacter = event.target.attributes["datavalue"].value;
    });
  }
}

function AddCharacterToRow(rank_Key, character) {
  for (let i = 0; i < rankingOrder.length; i++) {
    if (rankingOrder[i][rank_Key] !== undefined) {
      rankingOrder[i][rank_Key].push(character);
    }
  }
  updateTierRowContainer(renderRankingOrder(rankingOrder));
}

function removeFromCharacterList(content) {
  const findCharacter = (element) => element === content;
  let matchCharacterIndex = characterList.findIndex(findCharacter);
  characterList.splice(matchCharacterIndex, 1);
  updateCharacterRankList(renderCharacterRankList(characterList));
  modalDisplayEventListner();
}
function handlAddCharacterRow() {
  for (let i = 0; i < ranking_key_text.length; i++) {
    ranking_key_text[i].addEventListener("click", (event) => {
      let rank = event.target.attributes["datavalue"].value;
      modal.style.display = "none";
      AddCharacterToRow(rank, selectedCharacter);
      removeFromCharacterList(selectedCharacter);
    });
  }
}

updateTierRowContainer(renderRankingOrder(rankingOrder));
updateCharacterRankList(renderCharacterRankList(characterList));
handleSearchCharacterModal();
modalDisplayEventListner();
handleDisplayModal();
handlAddCharacterRow();

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
