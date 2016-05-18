import { combineReducers } from 'redux';
import { SET_PAGE } from '../actions';
import { SEARCH_VALUE_CHANGED } from '../actions';
import { SEARCH_RESULTS_PENDING, SEARCH_RESULTS_FULFILLED, SEARCH_RESULTS_ERRORED } from '../actions';
import { resultsPerPage } from '../actions';

const value = (state = '', action) => {
  switch (action.type) {
    case SEARCH_VALUE_CHANGED:
      return action.value;

    default:
      return state;
  }
};

const results = (state = [], action) => {
  switch (action.type) {
    case SEARCH_RESULTS_FULFILLED:
      return action.value.items;

    default:
      return state;
  }
};

const totalResultsCount = (state = 0, action) => {
  switch (action.type) {
    case SEARCH_RESULTS_FULFILLED:
      return action.value.total_count;

    default:
      return state;
  }
};

const pageCount = (state = 1, action) => {
  switch (action.type) {
    case SEARCH_RESULTS_FULFILLED:
      return Math.ceil(Math.min(action.value.total_count, 1000) / resultsPerPage);

    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case SEARCH_RESULTS_ERRORED:
      return action.value;

    case SEARCH_RESULTS_FULFILLED:
      return null;

    default:
      return state;
  }
};

const isPending = (state = false, action) => {
  switch (action.type) {
    case SEARCH_RESULTS_PENDING:
      return true;

    case SEARCH_RESULTS_FULFILLED:
    case SEARCH_RESULTS_ERRORED:
      return false;

    default:
      return state;
  }
};

const page = (state = 1, action) => {
  switch (action.type) {
    case SET_PAGE:
      return action.value;

    default:
      return state;
  }
};

export default combineReducers({
  search: combineReducers({
    value,
    results,
    totalResultsCount,
    pageCount,
    error,
    isPending,
    page
  })
});
