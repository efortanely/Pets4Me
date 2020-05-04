import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme';
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { DogBreedsFilters, constructQuery } from '../../../model-homepages/Dogs/DogBreedsFilters';
import { DogBreedsFilterOptions } from '../../../models/DogBreedsFilterOptions'
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
    "op": "ge",
    "val": 0
    },
    {
    "name": "height_imperial_high",
    "op": "le",
    "val": 4
    },
    {
    "name": "weight_imperial_low",
    "op": "ge",
    "val": 5
    },
    {
    "name": "weight_imperial_high",
    "op": "le",
    "val": 20
    },
    {
    "name": "life_span_low",
    "op": "ge",
    "val": 6
    },
    {
    "name": "life_span_high",
    "op": "le",
    "val": 9
    }]

  function mountWithPage(filterOptions: DogBreedsFilterOptions) {
    return mount(<DogBreedsFilters {...filterOptions}/>)
  }

  // author Dean
  it('default call to the submit button with no options selected', () => {
    expect(constructQuery([], testDefaultFilterState)).to.equal("q=" + JSON.stringify({"filters": expectedFilters}));
  });
})
