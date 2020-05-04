import ApiService from './ApiService';

class Pets4meApiService extends ApiService {
  constructor() {
    if(process.env.REACT_APP_USE_LOCAL_BACKEND === "1") {
      super('http://localhost:5000/api');
    } else {
      super('https://api.pets4.me/api');
    }
  }
}

export default Pets4meApiService
