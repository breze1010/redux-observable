import React from 'react';
import StringReplace from 'react-string-replace';

const Em = ({ needle, children }) => (
  <span>
    {needle ? StringReplace(children, needle, (match, i) =>
      <em key={i}>{match}</em>
    ) : children}
  </span>
);

export default Em;
