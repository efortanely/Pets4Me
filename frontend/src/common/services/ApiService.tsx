import { isNullOrUndefined } from "util";

class ApiService {
  private api_url: string

  constructor(api_url: string) {
    this.api_url = api_url
  }

  buildUrl(path: string, params: any, preBuiltQuery: string): string {
    if (preBuiltQuery.length > 0)
      preBuiltQuery = "&" + preBuiltQuery;
    let queryString = Object.keys(params)
        .filter((k) => !isNullOrUndefined(params[k]) && !(params[k] === ''))
        .map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        }).join('&');

    return `${this.api_url}/${path}?${queryString}${preBuiltQuery}`
  }

  fetchJsonAsObject<T>(path: string, params: any = {}, preBuiltQuery: string = ''): Promise<T> {
    return fetch(this.buildUrl(path, params, preBuiltQuery))
        .then(res => res.json() as Promise<T>)
  }
}

export default ApiService