import React, { useState, useEffect } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { ExpansionPanelSummary } from '@material-ui/core';
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
    <div className="Company">
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
        <p>
          Status:
          <p
            style={{ display: 'inline' }}
            className={classnames('uppercase', {
              active: props.company.company_status === 'active',
              inactive: props.company.company_status !== 'active'
            })}
          >
            {` ${props.company.company_status}`}
          </p>
        </p>
        <p>Company Number: {props.company.company_number}</p>
        <p>Address: {props.company.address_snippet}</p>
        <p>Directors</p>
        <InputField
          value={directorFilter}
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
