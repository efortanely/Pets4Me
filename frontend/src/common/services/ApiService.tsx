class ApiService {
  private api_url: string

  constructor(api_url: string) {
    this.api_url = api_url
  }

  buildUrl(path: string, params: any): string {
    let queryString = Object.keys(params).map((key) => {
      if(!!params[key])
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    }).filter((elem) => {
      return !!elem;
    }).join('&');

    return `${this.api_url}/${path}?${queryString}`
  }

  fetchJsonAsObject<T>(path: string, params: any): Promise<T> {
    return fetch(this.buildUrl(path, params))
        .then(res => res.json() as Promise<T>)
  }
}

export default ApiService