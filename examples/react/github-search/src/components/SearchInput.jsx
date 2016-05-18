import React from 'react';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import { searchValueChanged } from '../actions';

const SearchInput = ({ value, onChange, isPending }) => (
  <div className="search-input-container">
    <input
      className="form-control"
      placeholder="Search Github..."
      onChange={event => onChange(event.target.value)}
      autoFocus
    />
    {isPending && <Spinner />}
  </div>
);

const mapStateToProps = ({ search: { value, isPending} }) => ({ value, isPending });
const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(searchValueChanged(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
