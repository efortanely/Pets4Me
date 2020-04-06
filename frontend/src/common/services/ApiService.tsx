class ApiService {
  private api_url: string

  protected constructor(api_url: string) {
    this.api_url = api_url
    process.argv.forEach((val, index) => {
      console.log(`${index}: ${val}`);
    });
  }

  buildUrl(path: string, params: any): string {
    var query_string = Object.keys(params).map((key): string => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    }).join('&');

    return `${this.api_url}/${path}?${query_string}`
  }

  fetchJsonAsObject<T>(path: string, params: any): Promise<T> {
    return fetch(this.buildUrl(path, params))
        .then(res => res.json() as Promise<T>)
  }
}

export default ApiService