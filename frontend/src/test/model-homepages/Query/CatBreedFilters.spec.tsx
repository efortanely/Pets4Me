import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme';
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { CatBreedsFilters, constructQuery } from '../../../model-homepages/Cats/CatBreedsFilters';
import { CatBreedsFilterOptions } from '../../../models/CatBreedsFilterOptions'
chai.use(sinonChai)

describe('<CatBreedsFilters />', () => {

  let testDefaultFilterState = {
    nameInitials: [],
    doorsiness: undefined,
    dogLevel: 0,
    childLevel: 0,
    groomingLevel: 0,
    minLifespan: 0,
    maxLifespan: 30,
    sortType: undefined,
    sortDir: "desc"
  }

  let expectedFilters = [
    {
    "name": "life_span_low",
    "op": "ge",
    "val": 0
    },
    {
    "name": "life_span_high",
    "op": "le",
    "val": 30
    }]

  function mountWithPage(filterOptions: CatBreedsFilterOptions) {
    return mount(<CatBreedsFilters {...filterOptions}/>)
  }

  // author Cristian
  it('default call to the submit button with no options selected', () => {
    expect(constructQuery([], testDefaultFilterState)).to.equal("q=" + JSON.stringify({"filters": expectedFilters}));
  });
})
