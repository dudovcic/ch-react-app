import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Provider } from './state';
import { State } from './state/state';
import Api from './api/index';
import Companies from './routes/Companies';
import InputField from './components/common/InputField';
import { observer } from 'mobx-react';

const state = new State();
const api = new Api(state);

const App: React.FC = () => {
  return (
    <Provider state={state} api={api}>
      <div className="App">
        <header className="App-header">
          <InputField value={state.token} onChange={api.setToken} />
          <Companies />
        </header>
      </div>
    </Provider>
  );
};

export default observer(App);
