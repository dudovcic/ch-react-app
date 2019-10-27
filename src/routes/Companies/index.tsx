import React from 'react';
import { container } from '../../state';
import { ContainerProps } from '../../state/index';
import Company from '../../components/Company';
import { observer } from 'mobx-react';

interface Props extends Pick<ContainerProps, 'state' | 'api'> {
  companies: company.Company[];
}

@observer
class Companies extends React.Component<Props> {
  render() {
    const { companies = [] } = this.props;
    return (
      <div>
        {companies &&
          companies.map(c => (
            <Company
              key={c.company_number}
              company={c}
              directors={this.props.state.getDirectors(c.company_number)}
              onExpand={() => this.onExpand(c.company_number)}
            />
          ))}
      </div>
    );
  }

  private onExpand = async (cn: string) => {
    const directors = this.props.state.getDirectors(cn);
    if (!directors) {
      const d = await this.props.api.searchDirectors(cn);
      this.props.state.setDirectors(cn, d.items);
    }
  };
}

export default container('api', 'state')(Companies);
