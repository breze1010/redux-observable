import React from 'react';
import { connect } from 'react-redux';
import { dispatchOnMount } from 'react-redux-observable';
import { streamSearchResults } from '../actions';
import SearchErrors from './SearchErrors';
import RepoList from './RepoList';
import Pagination from './Pagination';

const SearchResults = ({ results, totalResultsCount, error }) => (
  <div>
    <SearchErrors />
    {results.length > 0 ?
      <div>
        <h3>We’ve found {totalResultsCount.toLocaleString()} repository results</h3>
        <RepoList repos={results} />
        <Pagination />
      </div>
      :
      <div>No results...</div>
    }
  </div>
);

const mapStateToProps = ({ search: { results, totalResultsCount } }) => ({ results, totalResultsCount });

export default connect(mapStateToProps)(
  dispatchOnMount(streamSearchResults)(
    SearchResults
  )
);
