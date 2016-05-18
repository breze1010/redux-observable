import React from 'react';
import SearchResults from './SearchResults';
import Nav from './Nav';

const App = () => (
  <div className="container">
    <h1 className="page-header">Github Search</h1>
    <p>Uses the real Github API to instant search for repos with <b>debouncing</b>, <b>ajax cancellation</b> (via switchMap), <b>error handling</b>, and more.form</p>
    <p>The Github API has a <b>rate-limit of 10 requests per minute</b>, so it's perfect to demo error handling!</p>
    <Nav />
    <SearchResults />
  </div>
);

export default App;
