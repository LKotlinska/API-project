import { getPairedRecipes } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("wine-select");
  const form = document.getElementById("submit-winetype");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    // On click: select and submit value
    const dropdown = document.getElementById("wine-select");
    const wineType = dropdown.value;

    const { wineInfo, recipes } = await getPairedRecipes(wineType);

    // ---- Show info about selected wine
    function showSelectedWine(wineType, wineInfo) {
      const wineSelected = document.querySelector(".wine-selected");
      // Clear previous content
      wineSelected.innerHTML = "";
      wineType = formatName(wineType);
      const wineName = document.createElement("p");
      wineName.innerText = wineType + ", great choice!";
      wineSelected.appendChild(wineName);

      const wineDesc = document.createElement("p");
      wineDesc.innerText = wineInfo;
      wineSelected.appendChild(wineDesc);
    }
    showSelectedWine(wineType, wineInfo);

    function showRecipes() {
      const recipeSection = document.getElementById("recipe-section");
      // Clear previous content
      recipeSection.innerHTML = "";

      recipes.forEach((recipe) => {
        // Create details toggle
        const details = document.createElement('details');
        recipeSection.appendChild(details);
        const summary = document.createElement('summary');
        details.appendChild(summary);
        const title = document.createElement("h4");
        title.innerText = recipe.title;
        summary.appendChild(title);
      });
      
      

    }
    showRecipes();
    dropdown.value = null;
  });

  // Fetch and display wine selection
  try {
    fetch("resources/wines.json")
      .then((response) => response.json())
      .then((wines) => {
        for (let category in wines) {
          // Name cleanup and create selection groups
          const categoryName = formatName(category);
          const optgroup = document.createElement("optgroup");
          optgroup.setAttribute("label", categoryName);
          dropdown.appendChild(optgroup);

          wines[category].forEach((wine) => {
            const wineName = formatName(wine);
            const option = document.createElement("option");
            option.innerText = wineName;
            option.setAttribute("value", wine);
            optgroup.appendChild(option);
          });
        }
      });
  } catch (error) {
    console.log(error);
  }

  function formatName(string) {
  return string
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  }
});
