import React from 'react';
import './Director.scss';

interface Props {
  director: company.Director;
}

export default (props: Props) => {
  const { director } = props;
  return (
    <div className="Director">
      <p>Name: {director.name}</p>
      <p>Nationality: {director.nationality}</p>
    </div>
  );
};
