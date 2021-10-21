import { combineReducers } from 'redux';
import displayReducer from './display/displayModal.reducer';
import beerReducer from './beer/beer.reducer';
import pageNumberReducer from './display/pageNumber.reducer';

const rootReducer = combineReducers({
  display: displayReducer,
  pageNumber: pageNumberReducer,
  beer: beerReducer,
});

export default rootReducer;
