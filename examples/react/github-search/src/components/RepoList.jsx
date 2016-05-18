import React from 'react';
import Repo from './Repo';

const RepoList = ({ repos }) => (
  <ul className="repo-list">
    {repos.map(repo =>
      <Repo key={repo.full_name} {...repo} />
    )}
  </ul>
);

export default RepoList;
