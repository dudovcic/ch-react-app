import { HttpClient } from './client';
import { config } from '../config/index';
import { State } from '../state/state';

export default class Api extends HttpClient {
  constructor(private state: State) {
    super({
      url: config.apiBaseUrl,
      errorHandler: async e => {
        throw e;
      },
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
  ): Promise<company.SearchResult<company.Company>> =>
    this.GET(`/search/companies?q=${query}`);

  public searchDirectors = (
    companyNumber: string
  ): Promise<company.SearchResult<company.Director>> =>
    // To search directors add ?register_view=true&register_type=directors
    // Todo: figure out how to make it work
    this.GET(`/company/${companyNumber}/officers`);
}
