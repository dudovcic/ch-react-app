import React, { useState, useEffect } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import {
  ExpansionPanelSummary,
  ListItem,
  ListItemText,
  Chip
} from '@material-ui/core';
import Director from '../Director';
import classnames from 'classnames';
import './Company.scss';
import InputField from '../common/InputField';

interface Props {
  company: company.Company;
  directors?: company.Director[];
  onExpand(): void;
}

export default (props: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [directorFilter, setDirectorFilter] = useState<string>('');

  return (
    <div className={classnames('Company', { expanded })}>
      <ExpansionPanel
        expanded={expanded}
        onChange={() => {
          props.onExpand();
          setExpanded(!expanded);
        }}
      >
        <ExpansionPanelSummary>
          <p>{props.company.title}</p>
        </ExpansionPanelSummary>
        <Chip
          color={
            props.company.company_status === 'active' ? 'primary' : 'secondary'
          }
          label={props.company.company_status.toUpperCase()}
        />
        {/* TODO: utilize this */}
        {[
          { label: 'Company Number', value: props.company.company_number },
          { label: 'Address', value: props.company.address_snippet },
          { label: 'Description', value: props.company.description }
        ].map(i => (
          <ListItem key={i.label}>
            <ListItemText primary={i.label} secondary={i.value} />
          </ListItem>
        ))}
        <InputField
          className="director-input"
          value={directorFilter}
          label="Directors"
          onTextChange={t => setDirectorFilter(t)}
          placeholder="Search directors..."
        />
        {props.directors &&
          props.directors.map(d => {
            if (directorFilter !== '') {
              if (
                !d.name.toLowerCase().includes(directorFilter.toLowerCase())
              ) {
                return;
              }
            }
            return <Director director={d} />;
          })}
      </ExpansionPanel>
    </div>
  );
};
