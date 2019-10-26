import Axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

export interface ClientHandlers {
  url: string;
  errorHandler(e: AxiosError): void;
  responseMapper<T>(res: AxiosResponse): T;
}

export abstract class HttpClient {
  private axiosClient: AxiosInstance;
  constructor(protected clientHandlers: ClientHandlers) {
    this.axiosClient = Axios.create({
      baseURL: this.clientHandlers.url,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public setAuthorizationToken = (token: string): void => {
    this.axiosClient = Axios.create({
      baseURL: this.clientHandlers.url,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    });
  };

  protected GET = <T>(url: string): Promise<T> =>
    this.axiosClient
      .get(url)
      .then((res: AxiosResponse) => this.clientHandlers.responseMapper<T>(res))
      .catch(this.clientHandlers.errorHandler) as Promise<T>;
}
