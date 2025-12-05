// QUESTION: WILL THIS COUNT AS HAVING MULTIPLE APIs?
export async function getPairedRecipes(wineType) {
  const foodAPIBaseUrl = `https://api.spoonacular.com/recipes/`;
  const wineAPIBaseUrl = "https://api.spoonacular.com/food/wine/";

  const pairingSearch = new URLSearchParams({
    wine: wineType,
    apiKey: "bdf9eb43726a4fec87cc0d370296753d",
  });

  const getPairings = async () => {
    // Get dish examples from wine API
    const response = await fetch(wineAPIBaseUrl + "dishes?" + pairingSearch);
    const pairingData = await response.json();
    console.log(pairingData);
    return pairingData["pairings"];
  };
  const getRecipe = async (query) => {
    const dishSearch = new URLSearchParams({
      query,
      number: 1,
      apiKey: "bdf9eb43726a4fec87cc0d370296753d",
    });

    const response = await fetch(
      foodAPIBaseUrl + "complexSearch?" + dishSearch
    );
    const dishData = await response.json();
    return dishData;
  };

  const pairings = await getPairings();
  const recipes = [];
  for (const query of pairings) {
    // Set timeout cuz stoopid max 5 request/s
    setTimeout(async () => {
      recipes.push((await getRecipe(query)).results[0]);
    }, 250);
  }
  return recipes;
}
