import React, { useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { ExpansionPanelSummary } from '@material-ui/core';

interface Props {
  company: company.Company;
}

export default (props: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="Company">
      <ExpansionPanel
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
      >
        <ExpansionPanelSummary>
          <p>{props.company.title}</p>
        </ExpansionPanelSummary>
        <p>{props.company.company_status}</p>
        <p>{props.company.company_number}</p>
      </ExpansionPanel>
    </div>
  );
};
