import React from 'react';
import { container, containerDecorator } from '../../state';
import { ContainerProps } from '../../state/index';
import Company from '../../components/Company';

interface Props extends Pick<ContainerProps, 'state' | 'api'> {
  companies?: company.Company[];
}

class Companies extends React.Component<Props> {
  render() {
    const { companies = [] } = this.props;
    return companies.map(c => (
      <Company
        key={c.company_number}
        company={c}
        directors={this.props.state.getDirectors(c.company_number)}
        onExpand={() => this.onExpand(c.company_number)}
      />
    ));
  }

  private onExpand = async (cn: string) => {
    const directors = this.props.state.getDirectors(cn);
    if (!directors) {
      const d = await this.props.api.searchDirectors(cn);
      this.props.state.setDirectors(cn, d.items);
    }
  };
}

export { Companies };

export default containerDecorator('api', 'state')(Companies);
