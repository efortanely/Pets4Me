import ApiService from "../../common/services/ApiService";
import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
chai.use(sinonChai);

describe("ApiService", () => {
  let apiUrl: string;
  let testPath: string;
  let testApiService: ApiService;

  beforeEach(() => {
    apiUrl = "http//example.com";
    testPath = "quux";
    testApiService = new ApiService(apiUrl);
  });

  // author: Connor
  it("should correctly setup query params with missing key", () => {
    let params = {
      foo: "bar",
      baz: undefined,
    };
    let url = testApiService.buildUrl(testPath, params, "");
    let expectedUrl = `${apiUrl}/${testPath}?foo=bar`;
    expect(url).to.equal(expectedUrl);
  });

  // author: Dean
  it("should correctly setup query params with empty key", () => {
    let params = {
      foo: "bar",
      baz: "",
    };
    let url = testApiService.buildUrl(testPath, params, "");
    let expectedUrl = `${apiUrl}/${testPath}?foo=bar`;
    expect(url).to.equal(expectedUrl);
  });

  // author: Dean
  it("should correctly setup query params with multiple keys", () => {
    let params = {
      foo: "bar",
      baz: "bup",
    };
    let url = testApiService.buildUrl(testPath, params, "");
    let expectedUrl = `${apiUrl}/${testPath}?foo=bar&baz=bup`;
    expect(url).to.equal(expectedUrl);
  });

  // author: Connor
  it('should allow "0" as query parameter', () => {
    let params = {
      foo: 0,
    };
    let url = testApiService.buildUrl(testPath, params, "");
    let expectedUrl = `${apiUrl}/${testPath}?foo=0`;
    expect(url).to.equal(expectedUrl);
  });

  // author: Dean
  it("should correctly setup query params with multiple keys and a pre-constructed filter string", () => {
    let params = {
      foo: "bar",
      baz: "bup",
    };
    let url = testApiService.buildUrl(testPath, params, "bonklevel=master");
    let expectedUrl = `${apiUrl}/${testPath}?foo=bar&baz=bup&bonklevel=master`;
    expect(url).to.equal(expectedUrl);
  });
});
