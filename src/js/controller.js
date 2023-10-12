import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import { async } from 'regenerator-runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarkView from './views/bookmarkView.js';

import paginatioinView from './views/paginatioinView.js';
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    console.log(id);

    //1 loading recipe
    await model.loadRecipe(id);

    // const { recipe } = model.state;
    // rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderEroor();
  }
};
const contorlSearchResult = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    // load search results
    await model.loadSearchResult(query);

    resultsView.render(model.getSearchResultPage(1));

    paginatioinView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (page) {
  resultsView.render(model.getSearchResultPage(page));

  paginatioinView.render(model.state.search);
};
const controlServings = function (newServings) {
  // update the recipe serveings

  // update the recipe viewm
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);
};

const controlAddBookmark = function () {
  // add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  console.log(model.state.recipe);
  recipeView.render(model.state.recipe);
  // render bookmark
  bookmarkView.render(model.state.bookmarks);
};
const newFeature = function () {
  console.log('welcome to the application');
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHanderServing(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(contorlSearchResult);
  paginatioinView.addHandlerClick(controlPagination);
  newFeature();
};

init();
