import React from 'react';
import './App.scss';
import { Provider } from './state';
import { State } from './state/state';
import Api from './api/index';
import Companies from './containers/Companies';
import InputField from './components/common/InputField';
import { observer } from 'mobx-react';
import Loading from './components/common/Loading';
import { AxiosError } from 'axios';

const state = new State();
const api = new Api(state);

interface AppState {
  query: string;
  loading: boolean;
}

@observer
class App extends React.Component<any, AppState> {
  queryTimeout: NodeJS.Timeout | null = null;
  state: AppState = {
    query: '',
    loading: false
  };
  render() {
    return (
      <Provider state={state} api={api}>
        <div className="App">
          <header className="App-header">
            <div
              className="InputWrapper"
              style={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <InputField
                value={state.token}
                onTextChange={api.setToken}
                placeholder="Please enter your API key..."
                label="API Key"
              />
              <InputField
                value={this.state.query}
                onTextChange={this.searchCompanies}
                placeholder="Search for companies..."
                label="Company name"
              />
            </div>
            {this.state.loading && <Loading />}
            <div>
              {this.state.loading ? null : (
                <Companies companies={state.companies} />
              )}
            </div>
          </header>
        </div>
      </Provider>
    );
  }

  private searchCompanies = (q: string) => {
    this.setState({ loading: true, query: q });
    if (this.queryTimeout) {
      clearTimeout(this.queryTimeout);
    }
    this.queryTimeout = (setTimeout(async () => {
      try {
        const { items } = await api.searchCompanies(q);
        state.setCompanies(items);
      } catch (e) {
        const error = e as AxiosError;
        // TODO: abstract + make it a nice modal
        if (error.response && error.response.status === 401) {
          window.alert('Please enter valid api key!');
        }
      } finally {
        this.setState({ loading: false });
      }
    }, 250) as unknown) as NodeJS.Timeout;
  };
}

export default App;
