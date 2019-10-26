import { action, observable } from 'mobx';

export class State {
  @observable
  public token?: string;

  @action
  public setToken = (token?: string): void => {
    if (token) {
      this.token = token;
    } else {
      this.token = '';
    }
  };
}
