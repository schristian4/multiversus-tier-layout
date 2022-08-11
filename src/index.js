import "./styles.css";

let rankingOrder = [
  { S: ["batman", "finn", "superman", "bugs"] },
  { A: ["shaggy", "jake", "lebron", "harley"] },
  { B: ["taz", "arya", "steven", "velma", "reindog"] },
  { C: ["garnet", "wonder_woman", "tom_and_jerry"] },
  { D: ["iron_giant"] }
];

// const newButton = document.getElementsByClassName("btn-new");
// const tierRow = document.getElementById("tier-row");
let bodyContainer = document.getElementById("body-container");

let rank = rankingOrder.map((rank) => {
  let key = Object.keys(rank);
  let images = rank[key].map((img) => {
    return `<img class="avatar" src="./image/${img}.webp" alt="">`;
  });
  return ` 
  <div class="tier-row">
    <div class="tier-heading-wrapper"><p class="tier-heading">${key}</p></div>
    <div class="tier-body avatar-wrapper">
      ${images.join(",").replace(/,/g, "")}
    </div>
  </div>
  `;
});

bodyContainer.innerHTML = rank.join(",").replace(/,/g, "");
