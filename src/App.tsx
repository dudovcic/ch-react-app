import React, { useState } from 'react';
import './App.scss';
import { Provider } from './state';
import { State } from './state/state';
import Api from './api/index';
import Companies from './routes/Companies';
import InputField from './components/common/InputField';
import { observer } from 'mobx-react';
import Loading from './components/common/Loading';
import { AxiosError } from 'axios';

const state = new State();
const api = new Api(state);

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
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
            />
            <InputField
              value={query}
              onTextChange={async q => {
                setLoading(true);
                try {
                  setQuery(q);
                  const { items } = await api.searchCompanies(q);
                  state.setCompanies(items);
                } catch (e) {
                  console.log((e as AxiosError).code);
                } finally {
                  setLoading(false);
                }
              }}
              placeholder="Search for companies..."
            />
          </div>
          {loading && <Loading />}
          <Companies companies={state.companies} />
        </header>
      </div>
    </Provider>
  );
};

export default observer(App);
