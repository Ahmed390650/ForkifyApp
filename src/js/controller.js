'use strict';
import {
  addBookMark,
  deleteBookmark,
  getSearchResultPage,
  loadRecipe,
  loadSearchResult,
  state,
  updateServings,
  uploadRecipe,
} from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeViewe from './views/recipeViewe.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}
const showRecipe = async () => {
  try {
    //get id
    const id = window.location.hash.slice(1);
    if (!id) return;
    //loading recipe
    recipeViewe.renderSpinner();
    resultView.update(getSearchResultPage());
    await loadRecipe(id);
    bookmarkView.render(state.bookMarks);
    recipeViewe.render(state.recipe);
  } catch (error) {
    recipeViewe.renderMessage(error);
  }
};
const controlSearchResult = async () => {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    resultView.renderSpinner();
    await loadSearchResult(query);
    controlPagination(1);
  } catch (error) {}
};
const controlPagination = goToPAGE => {
  resultView.render(getSearchResultPage(goToPAGE));
  paginationView.render(state.search);
};
const controlServings = newServings => {
  updateServings(newServings);
  recipeViewe.update(state.recipe);
};
const controlAddBookMark = function () {
  if (!state.recipe.bookmarked) addBookMark(state.recipe);
  else deleteBookmark(state.recipe.id);
  recipeViewe.update(state.recipe);
  bookmarkView.render(state.bookMarks);
};
const controlUpload = async function (recipeForm) {
  try {
    addRecipeView.renderSpinner();
    await uploadRecipe(recipeForm);
    recipeViewe.render(state.recipe);
    addRecipeView.renderMessage();
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, 2000);
  } catch (error) {
    addRecipeView.renderMessage(error.message);
  }
};
const newFeatures = () => {
  console.log(`welcome to app`);
};
const init = () => {
  recipeViewe.addHandleRender(showRecipe);
  searchView.addHandleSeach(controlSearchResult);
  paginationView.addHandleClicker(controlPagination);
  recipeViewe.addHandlerUpadateServings(controlServings);
  recipeViewe.addHandleBookmark(controlAddBookMark);
  addRecipeView._addHandlerUpload(controlUpload);
};
init();
