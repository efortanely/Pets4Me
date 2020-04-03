import ApiService from './ApiService';

class Pets4meApiService extends ApiService {
  constructor() {
    super('https://api.pets4.me/api')
  }
}

export default Pets4meApiService