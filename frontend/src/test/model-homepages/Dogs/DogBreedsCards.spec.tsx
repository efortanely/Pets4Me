import 'jsdom-global/register'
import React from 'react'
import { configure, mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import chai, { expect } from 'chai'
import { DogBreed } from '../../../models/DogBreed';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon'
import sinonChai from 'sinon-chai'
import { ObjectsPage } from '../../../models/ObjectsPage';
import DogBreedsInfoCards from '../../../model-homepages/Dogs/DogBreedsInfoCards';
import { Pets4meDogBreedsService } from '../../../common/services/Pets4meDogBreedsService';
import DogBreedsService from '../../../common/services/DogBreedsService';
chai.use(sinonChai)

const itemsPerPage = 12

describe('<DogBreedsInfoCards />', () => {
  let testComponent: ShallowWrapper
  let testBreed: DogBreed
  let testBreedPage: ObjectsPage<DogBreed>
  let elements: any

  function mountWithPage(page: ObjectsPage<DogBreed>, pageNumber: number = 1) {
    let testDogBreedsService = new Pets4meDogBreedsService()
    testDogBreedsService.getDogBreeds = (pageNumber?: number) => new Promise<ObjectsPage<DogBreed>>(()=> page)
    DogBreedsInfoCards.contextType = React.createContext<DogBreedsService>(testDogBreedsService)

    return mount(<DogBreedsInfoCards />)
  }

  function makeDummyPageFunction(page: ObjectsPage<DogBreed>): (pageNumber?: number) => Promise<ObjectsPage<DogBreed>> {
    return (pageNumber?: number) => new Promise<ObjectsPage<DogBreed>>(()=> page)
  }

  function addBreedToTestPage(breed: DogBreed) {
    testBreedPage.objects.push(breed)
    testBreedPage.num_results += 1
  }

  beforeEach(() => {
    configure({ adapter: new Adapter() });
    if(testComponent) {
      testComponent = testComponent.unmount()
    }
    
    testBreed = {
      id: 1,
      name: 'foo',
      breed_group: 'bar',
      life_span: {low: 5, high: 6},
      height_imperial: {low: 7, high: 11},
      weight_imperial: {low: 4, high: 20},
      temperament: 'foobar',
      bred_for: 'barfoo',
      dog_ids: [1, 2],
      local_shelters_with_breed: [1],
      photo: ''
    }

    testBreedPage = {
      num_results: 0,
      objects: [],
      page: 1,
      total_pages: 1
    }

    elements = {
    }

  })
  
  // author Connor
  it('should render loading page', () => {
    let testPage = mountWithPage(testBreedPage)

    expect(testPage.find('.spinner-border')).to.exist
  });
})