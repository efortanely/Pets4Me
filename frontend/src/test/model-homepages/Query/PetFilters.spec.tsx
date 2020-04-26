import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme';
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { PetsFilters, PetsFiltersState, constructQuery } from '../../../model-homepages/Pets/PetsFilters';
import { PetsFiltersData } from '../../../models/PetsFiltersData'
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
      distanceMax: 1000,
      sortType: "",
      sortDir: "desc"
  }

  function mountWithPage(filterOptions: PetsFiltersData) {
    return mount(<PetsFilters {...filterOptions}/>)
  }

  // author Cristian
  it('default call to the submit button with no options selected', () => {
    expect(constructQuery(testDefaultFilterState)).to.equal("zip_code=78705&max_dist=1000")
  });

  // author Dean
  it('should put size filter in separate url param', () => {
    let sizeFilterAsc = testDefaultFilterState;
    sizeFilterAsc.sortDir = "asc";
    sizeFilterAsc.sortType = "size";
    let query = constructQuery(sizeFilterAsc); 
    expect(query).to.contain("sort=size&dir=asc")
    expect(query).not.to.contain("order_by")
  })

  // author Dean
  it('should put age filter in separate url param', () => {
    let ageFilterDesc = testDefaultFilterState;
    ageFilterDesc.sortDir = "desc";
    ageFilterDesc.sortType = "age";
    let query = constructQuery(ageFilterDesc); 
    expect(query).to.contain("sort=age&dir=desc")
    expect(query).not.to.contain("order_by")
  })
})
