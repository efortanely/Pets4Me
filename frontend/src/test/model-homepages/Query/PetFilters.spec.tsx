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
      sortType: undefined,
      sortDir: "desc"
  }

  function mountWithPage(filterOptions: PetsFiltersData) {
    return mount(<PetsFilters {...filterOptions}/>)
  }

  // author Cristian
  it('default call to the submit button with no options selected', () => {
    expect(constructQuery(testDefaultFilterState)).to.equal("?zip_code=78705&max_dist=1000")
  });
})
