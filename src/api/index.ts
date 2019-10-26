import { HttpClient } from './client';
import { config } from '../config/index';
import { State } from '../state/state';

export default class Api extends HttpClient {
  constructor(private state: State) {
    super({
      url: config.apiBaseUrl,
      errorHandler: async () => undefined,
      responseMapper: res => res.data
    });
    this.setToken(state.token);
  }

  public setToken = (token?: string) => {
    this.state.setToken(token);
    this.setAuthorizationToken(token!);
  };

  public searchCompanies = (
    query: string
  ): Promise<{ items: company.Company[] }> =>
    this.GET(`/search/companies?q=${query}`);
}
