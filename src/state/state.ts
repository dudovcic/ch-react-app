import { action, observable } from 'mobx';

export class State {
  @observable
  public token?: string;

  @observable
  public companies: company.Company[] = [];

  @observable
  public directors: Map<
    company.Company['company_number'],
    company.Director[]
  > = new Map();

  @action
  public setToken = (token?: string): void => {
    if (token) {
      this.token = token;
    } else {
      this.token = '';
    }
  };

  @action
  public setCompanies = (companies: company.Company[]): void => {
    this.companies = companies || [];
  };

  @action
  public setDirectors = (
    companyNumber: string,
    directors: company.Director[]
  ): void => {
    this.directors.set(companyNumber, directors);
  };

  public getDirectors = (companyNumber: string) => {
    const directors = this.directors.get(companyNumber);
    return directors;
  };
}
