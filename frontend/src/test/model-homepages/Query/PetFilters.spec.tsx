import 'jsdom-global/register'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { constructQuery } from '../../../model-homepages/Pets/PetsFilters';
chai.use(sinonChai)

describe('<PetsFilters />', () => {

  let testDefaultFilterState = {
      species: undefined,
      gender: undefined,
      primaryBreed: [],
      secondaryBreed: [],
      color: [],
      size: [],
      age: [],
      postcode: 0,
      distanceMax: 1000,
      sortType: "",
      sortDir: "desc"
  }

  // author Cristian
  it('default call to the submit button with no options selected', () => {
    expect(constructQuery(testDefaultFilterState)).to.equal("zip_code=78705&max_dist=1000")
  });

  // author Dean
  it('should put size filter in separate url param', () => {
    let sizeFilterAsc = {...testDefaultFilterState};
    sizeFilterAsc.sortDir = "asc";
    sizeFilterAsc.sortType = "size";
    let query = constructQuery(sizeFilterAsc); 
    expect(query).to.contain("sort=size&dir=asc")
    expect(query).not.to.contain("order_by")
  })

  // author Dean
  it('should put age filter in separate url param', () => {
    let ageFilterDesc = {...testDefaultFilterState};
    ageFilterDesc.sortDir = "desc";
    ageFilterDesc.sortType = "age";
    let query = constructQuery(ageFilterDesc); 
    expect(query).to.contain("sort=age&dir=desc")
    expect(query).not.to.contain("order_by")
  })

  // author Dean
  it('should use 78705 if bad postcode given', () => {
    let badPostcode = testDefaultFilterState;
    badPostcode.postcode = 5000;
    expect(constructQuery(testDefaultFilterState)).to.equal("zip_code=78705&max_dist=1000");
  })

  // author Dean
  it('should use user postcode if valid', () => {
    let badPostcode = testDefaultFilterState;
    badPostcode.postcode = 90210;
    expect(constructQuery(testDefaultFilterState)).to.equal("zip_code=90210&max_dist=1000");
  })
})
