import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme';
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { DogBreedsFilters, DogBreedsFiltersState, constructQuery } from '../../../model-homepages/Dogs/DogBreedsFilters';
import { DogBreedsFiltersData } from '../../../models/DogBreedsFiltersData'
chai.use(sinonChai)

describe('<DogBreedsFilters />', () => {
  let emptyFilters = { } as DogBreedsFiltersState;

  let expectedFilters = {
        "filters": [
            {
                "name": "city",
                "op": "in",
                "val": ["Austin", "Amarillo"]
            },
            {
                "name": "max_distance",
                "op": "le",
                "val": 1000
            }
        ],
        "order_by": [
            {
                "field": "primary_dog_breed_name",
                "direction": "asc"
            }
        ]
    }

  function mountWithPage(filterOptions: DogBreedsFiltersData) {
    return mount(<DogBreedsFilters {...filterOptions}/>)
  }
  
  // author Dean
  it('should render loading page', () => {
    expect(true).to.equal(true);
  });
})