document.addEventListener("DOMContentLoaded", () => {

  // QUESTION: WILL THIS COUNT AS HAVING MULTIPLE APIs?

  const foodAPIBaseUrl = `https://api.spoonacular.com/recipes/`;
  const wineAPIBaseUrl = "https://api.spoonacular.com/food/wine/";
  

  const wineType = 'merlot';


  // console.log(wineType);
  const pairingSearch = new URLSearchParams({
    wine: wineType,
    apiKey: "bdf9eb43726a4fec87cc0d370296753d",
  });

  
  const getPairings = async () => {
      
    // ---- Get dish examples from wine API
    const response = await fetch(wineAPIBaseUrl + "dishes?" + pairingSearch);
    const pairingData = await response.json();
    console.log(pairingData);
    const pairings = pairingData["pairings"];
    const pairingTags = pairings.join(",");
    console.log(pairings.length());
    
    const pairingExample = [ "tacos", "curry", "sushi" ]
    
    const getRecipe = async (ingredient) => {

      const dishSearch = new URLSearchParams({
        'query': ingredient,
        'number': 1,
        'apiKey' : "bdf9eb43726a4fec87cc0d370296753d",
      });

      const response = await fetch(foodAPIBaseUrl + "complexSearch?" + dishSearch);
      const dishData = await response.json();
      console.log(dishData);

    };
    getRecipe();

    const getDishesByIngredient = async () => {
      for (const ingredient of pairingExample) {
        await getRecipe(ingredient);
      }
    };
    getDishesByIngredient();
  };
  getPairings();


});
