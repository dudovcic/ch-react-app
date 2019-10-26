import React from 'react';
import { container } from '../../state';
import { ContainerProps } from '../../state/index';
import Company from '../../components/Company';

interface Props extends Pick<ContainerProps, 'state' | 'api'> {
  companies?: company.Company[];
}

interface State {
  info?: company.Company[];
  error: any;
}

class Companies extends React.Component<Props, State> {
  state: State = {
    info: undefined,
    error: ''
  };
  componentDidMount() {
    this.props.api
      .searchCompanies('ltd')
      .then(i => {
        console.log(i);
        this.setState({ info: i.items });
      })
      .catch(e => this.setState({ error: e }));
    console.log(this.props.state.token);
  }
  render() {
    const companies = this.state.info;
    return (
      <div>{companies && companies.map(c => <Company company={c} />)}</div>
    );
  }
}

export default container('state', 'api')(Companies);
