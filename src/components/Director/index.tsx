import React from 'react';
import './Director.scss';
import { ListItem, ListItemText } from '@material-ui/core';

interface Props {
  director: company.Director;
}

export default (props: Props) => {
  const { director } = props;
  return (
    <ListItem className="Director">
      <ListItemText className="name" primary="Name" secondary={director.name} />
      <ListItemText
        primary="Nationality"
        secondary={director.nationality || 'Unavailable'}
      />
    </ListItem>
  );
};
