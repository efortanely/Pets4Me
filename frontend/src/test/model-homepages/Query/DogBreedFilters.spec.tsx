import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme';
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { DogBreedsFilters, DogBreedsFiltersState, constructQuery } from '../../../model-homepages/Dogs/DogBreedsFilters';
import { DogBreedsFiltersData } from '../../../models/DogBreedsFiltersData'
chai.use(sinonChai)

describe('<DogBreedsFilters />', () => {

  let testDefaultFilterState = {
    nameInitials: [],
    breedGroup: [],
    maxHeight: 4,
    minHeight: 0,
    maxWeight: 20,
    minWeight: 5,
    lifespanMin: 6,
    lifespanMax: 9,
    sortType: undefined,
    sortDir: "desc",
  }

  let expectedFilters = [
    {
    "name": "height_imperial_low",
    "op": "gt",
    "val": 0
    },
    {
    "name": "height_imperial_high",
    "op": "lt",
    "val": 4
    },
    {
    "name": "weight_imperial_low",
    "op": "gt",
    "val": 5
    },
    {
    "name": "weight_imperial_high",
    "op": "lt",
    "val": 20
    },
    {
    "name": "life_span_low",
    "op": "gt",
    "val": 6
    },
    {
    "name": "life_span_high",
    "op": "lt",
    "val": 9
    }]

  function mountWithPage(filterOptions: DogBreedsFiltersData) {
    return mount(<DogBreedsFilters {...filterOptions}/>)
  }

  // author Dean
  it('default call to the submit button with no options selected', () => {
    expect(constructQuery(testDefaultFilterState)).to.equal(JSON.stringify({"filters": expectedFilters}));
  });
})