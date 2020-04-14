import ApiService from '../../common/services/ApiService'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('ApiService', () => {

    let apiUrl = 'http//example.com';
    let testApiService = new ApiService(apiUrl);

    // author: Dean
    it('should correctly setup query params with missing key', () => {
        let params = {
            foo: 'bar',
            baz: ''
        }
        let url = testApiService.buildUrl('quux', params);
        let expectedUrl = `${apiUrl}/quux?foo=bar`;
        expect(url).to.equal(expectedUrl);
    });

    // author: Dean
    it('should correctly setup query params with multiple keys', () => {
        let params = {
            foo: 'bar',
            baz: 'bup'
        }
        let url = testApiService.buildUrl('quux', params);
        let expectedUrl = `${apiUrl}/quux?foo=bar&baz=bup`;
        expect(url).to.equal(expectedUrl);
    });
});