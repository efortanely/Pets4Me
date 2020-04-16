import ApiService from './ApiService';

class Pets4meApiService extends ApiService {
  constructor() {
    if(process.env.REACT_APP_USE_LOCAL_BACKEND === "1") {
      super('http://localhost:5000/api');
      console.log('!!Connecting to local database');
    } else {
      super('https://api.pets4.me/api');
      console.log('!!Connecting to the Real database')
    }
  }

  getFilterOptions() {
    return this.fetchJsonAsObject<any>('/filter', { })
  }
}

export default Pets4meApiService
