import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

export const SET_PAGE = 'SET_PAGE';
export const SEARCH_VALUE_CHANGED = 'SEARCH_VALUE_CHANGED';
export const SEARCH_RESULTS_PENDING = 'SEARCH_RESULTS_PENDING';
export const SEARCH_RESULTS_FULFILLED = 'SEARCH_RESULTS_FULFILLED';
export const SEARCH_RESULTS_ERRORED = 'SEARCH_RESULTS_ERRORED';

export const setPage = value => ({ type: SET_PAGE, value });
export const searchValueChanged = value => ({ type: SEARCH_VALUE_CHANGED, value });
export const searchResultsFulfilled = value => ({ type: SEARCH_RESULTS_FULFILLED, value });
export const searchResultsErrored = value => ({ type: SEARCH_RESULTS_ERRORED, value });
export const searchResultsPending = () => ({ type: SEARCH_RESULTS_PENDING });

export const resultsPerPage = 8;

const createStreamOfURLs = (actions, { getState }) =>
  Observable.combineLatest(
    actions.ofType(SEARCH_VALUE_CHANGED)
      .debounceTime(250)
      .map(action => action.value)
      .startWith(getState().search.value)
      .filter(value => !!value),
    actions.ofType(SET_PAGE)
      .map(action => action.value)
      .startWith(getState().search.page),
    (q, page) => `https://api.github.com/search/repositories?q=${q}&page=${page}&per_page=${resultsPerPage}`
  );

export const streamSearchResults = () =>
  (actions, store) =>
    createStreamOfURLs(actions, store)
      .switchMap(url =>
        Observable.ajax.getJSON(url)
          .map(searchResultsFulfilled)
          .catch(({ xhr }) => Observable.of(searchResultsErrored(xhr.response.message)))
          .startWith(searchResultsPending())
      );
