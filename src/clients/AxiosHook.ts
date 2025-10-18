import Axios, { AxiosInstance } from 'axios';

export default class AxiosHook {
  protected axios: AxiosInstance;
  private accessToken: string = "";

  constructor(baseURL: string) {
    this.axios = Axios.create({
      baseURL,
    });
  }

  public get token() {
    return this.accessToken;
  }

  public set token(value: string) {
    this.accessToken = value;
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${value}`;
  }
}