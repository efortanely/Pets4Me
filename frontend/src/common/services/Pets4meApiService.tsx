import ApiService from './ApiService';

class Pets4meApiService extends ApiService {
  constructor() {
    if(process.env.NODE_ENV === "development") {
      super('http://localhost:databasePort/');
      console.log('Connecting to local database');
    } else {
      super('https://api.pets4.me/api');
      console.log('Connecting to the Real databse')
    }
  }
}

export default Pets4meApiService