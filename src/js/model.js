import { getJSON, sentJSON } from './helper';
import { API_KEY, API_URL, NUMBER_RESULT } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    resultPerPage: NUMBER_RESULT,
  },
  bookMarks: [],
};
const casheData = {
  recipe: [],
  search: {},
};
const createRecipeObject = function (data) {
  const { recipe } = data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    cookingtime: recipe.cooking_time,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async id => {
  try {
    const recipeCashe = casheData.recipe.find(recipes => recipes.id === id);
    if (recipeCashe) return (state.recipe = recipeCashe);
    const data = await getJSON(`${API_URL}/${id}`);
    state.recipe = createRecipeObject(data);
    casheData.recipe.push(state.recipe);
  } catch (error) {
    throw error;
  }
};
export const loadSearchResult = async query => {
  try {
    state.search.query = query;
    const casheSearch = casheData.search[query];
    if (casheSearch) return (state.search.result = casheSearch);
    const data = await getJSON(`${API_URL}?search=${query}`);
    casheData.search[query] = state.search.result = data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    localStorage.setItem('result', JSON.stringify(state.search.result));
  } catch (error) {}
};
export const getSearchResultPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return state.search.result.slice(start, end);
};
export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addBookMark = recipe => {
  state.bookMarks.push(recipe);
  if (
    recipe.id === state.recipe.id ||
    state.bookMarks.find(v => v.id === recipe.id)
  )
    state.recipe.bookmarked = true;
};
export const deleteBookmark = id => {
  const index = state.bookMarks.findIndex(e => e.id === id);
  state.bookMarks.slice(index, 1);
  state.recipe.bookmarked = false;
};
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map((ing = []) => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'wrong ingredient fromat! Please use the correct format '
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      cooking_time: newRecipe.cookingTime,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      servings: newRecipe.servings,
      ingredients,
    };
    const data = await sentJSON(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
  } catch (error) {
    throw error;
  }
};
