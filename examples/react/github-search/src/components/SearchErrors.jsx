import React from 'react';
import { connect } from 'react-redux';

const SearchErrors = ({ error }) => (
  <div>
    {error &&
      <div className="alert alert-danger">
        <h4>Github API Error:</h4>
        {error}
      </div>

    }
  </div>
);

const mapStateToProps = ({ search: { error } }) => ({ error });

export default connect(mapStateToProps)(SearchErrors);
