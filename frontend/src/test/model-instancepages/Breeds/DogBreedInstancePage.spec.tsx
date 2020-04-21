import 'jsdom-global/register'
import React from 'react'
import { configure, mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import chai, { expect } from 'chai'
import DogBreedInstancePage from '../../../model-instancepages/Breeds/DogBreedInstancePage'
import { Pets4meDogBreedsService } from '../../../common/services/Pets4meDogBreedsService';
import { DogBreed } from '../../../models/DogBreed';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon'
import sinonChai from 'sinon-chai'
import { MemoryRouter } from 'react-router-dom';
import ModelInstanceService from '../../../common/services/ModelInstanceService';
chai.use(sinonChai)


describe('<DogBreedInstancePage />', () => {
  let testComponent: ShallowWrapper
  let testBreed: DogBreed
  let elements: any
  const emptyBreed = { } as DogBreed

  function spyOnDogBreedsService(breed: DogBreed) {
    let testPets4meDogBreedsService = new Pets4meDogBreedsService()
    let getDogBreedSpy = spy((breed_id: string) => new Promise<DogBreed>(() => breed))
    testPets4meDogBreedsService.getInstanceById = getDogBreedSpy

    let testContext = React.createContext<ModelInstanceService<DogBreed>>(testPets4meDogBreedsService)
    DogBreedInstancePage.contextType = testContext

    return getDogBreedSpy
  }

  function mountWithBreed(breed: DogBreed, breed_id: string = `${breed.id}`) {
    return mount(<MemoryRouter><DogBreedInstancePage
      breed={breed}
      match={{params: { breed_id: `${breed_id}` }, isExact: true, path: "", url: ""}}
      /></MemoryRouter>)
  }

  function shallowWithBreed(breed: DogBreed, breed_id: string = `${breed.id}`) {
    testComponent = shallow(<DogBreedInstancePage
      breed={breed}
      match={{params: { breed_id: `${breed.id}` }, isExact: true, path: "", url: ""}}
    />)
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
      photo: '',
      video_url: ''
    }

    elements = {
      name: () => testComponent.find('#name'),
      group: () => testComponent.find('#group'),
      lifeSpan: () => testComponent.find('#life-span'),
      height: () => testComponent.find('#height'),
      weight: () => testComponent.find('#weight'),
      temperament: () => testComponent.find('#temperament'),
      bredFor: () => testComponent.find('#bred-for'),
      petsWithBreed: () => testComponent.find('#pets-with-breed'),
      sheltersWithBreed: () => testComponent.find('#shelters-with-breed')
    }
  })

  // author Connor
  it('should not crash when breed is empty', () => {
    shallowWithBreed(emptyBreed)
    expect(testComponent.html()).to.exist
  })

  // author Connor
  it('should not crash when DogBreed is undefined', () => {
    spyOnDogBreedsService(testBreed)
    let testPage = mountWithBreed({} as DogBreed, '1')

    expect(testPage.html()).to.exist
  })

  // author Connor
  it('should not crash when api DogBreed is empty', () => {
    spyOnDogBreedsService(emptyBreed)
    let testPage: ReactWrapper<DogBreedInstancePage> = mountWithBreed(emptyBreed)
    testPage.setState(emptyBreed)

    expect(testPage.html()).to.exist
  })

  // author Connor
  it('should render all details', () => {

    shallowWithBreed(testBreed)

    console.log(testComponent)

    expect(elements.name().text()).to.include(testBreed.name)
    expect(elements.group().text()).to.include(testBreed.breed_group)
    expect(elements.lifeSpan().text()).to.include(testBreed.life_span.low)
        .and.to.include(testBreed.life_span.high)
    expect(elements.height().text()).to.include(testBreed.height_imperial.low)
        .and.to.include(testBreed.height_imperial.high)
    expect(elements.weight().text()).to.include(testBreed.weight_imperial.low)
        .and.to.include(testBreed.weight_imperial.high)
    expect(elements.temperament().text()).to.include(testBreed.temperament)
    expect(elements.bredFor().text()).to.include(testBreed.bred_for)
    expect(elements.petsWithBreed().text()).to.include(testBreed.dog_ids.length)
    expect(elements.sheltersWithBreed().text()).to.include(testBreed.local_shelters_with_breed.length)
  })

  // author Connor
  it('should GET breed on component mount if no breed supplied in props', () => {
    let getDogBreedSpy = spyOnDogBreedsService(testBreed)

    mountWithBreed(emptyBreed, `${testBreed.id}`)

    expect(getDogBreedSpy).to.have.been.calledWith(`${testBreed.id}`)
  })
})