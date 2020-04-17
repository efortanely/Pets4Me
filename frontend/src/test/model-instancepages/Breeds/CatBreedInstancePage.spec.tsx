import 'jsdom-global/register'
import React from 'react'
import { configure, mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import chai, { expect } from 'chai'
import CatBreedInstancePage from '../../../model-instancepages/Breeds/CatBreedInstancePage'
import { Pets4meCatBreedsService } from '../../../common/services/Pets4meCatBreedsService';
import { CatBreed } from '../../../models/CatBreed';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon'
import sinonChai from 'sinon-chai'
import { MemoryRouter } from 'react-router-dom';
import ModelInstanceService from '../../../common/services/ModelInstanceService';
chai.use(sinonChai)


describe('<CatBreedInstancePage/>', () => {
  let testComponent: ShallowWrapper
  let testBreed: CatBreed
  let elements: any
  const emptyBreed = { } as CatBreed

  function spyOnCatBreedsService(breed: CatBreed) {
    let testPets4meCatBreedsService = new Pets4meCatBreedsService()
    let getCatBreedSpy = spy((breed_id: string) => new Promise<CatBreed>(() => breed))
    testPets4meCatBreedsService.getInstanceById = getCatBreedSpy

    let testContext = React.createContext<ModelInstanceService<CatBreed>>(testPets4meCatBreedsService)
    CatBreedInstancePage.contextType = testContext

    return getCatBreedSpy
  }

  function mountWithBreed(breed: CatBreed, breed_id: string = `${breed.id}`) {
    return mount(<MemoryRouter><CatBreedInstancePage
      breed={breed}
      match={{params: { breed_id: `${breed_id}` }, isExact: true, path: "", url: ""}}
    /></MemoryRouter>)
  }

  function shallowWithBreed(breed: CatBreed, breed_id: string = `${breed.id}`) {
    testComponent = shallow(<CatBreedInstancePage
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
      alt_names: ['bar'],
      temperament: 'epic B)',
      life_span: {low: 10, high: 12},
      indoor: 1,
      dog_friendly: 1,
      child_friendly: 1,
      grooming_level: 2,
      cat_ids: [2, 3],
      local_shelters_with_breed: [1],
      photo: ''
    }

    elements = {
      name: () => testComponent.find('#name'),
      alt_names: () => testComponent.find('#alt-names'),
      temperament: () => testComponent.find('#temperament'),
      lifeSpan: () => testComponent.find('#life-span'),
      indoor: () => testComponent.find('#indoor'),
      dog_friendly: () => testComponent.find('#dog-friendly'),
      child_friendly: () => testComponent.find('#child-friendly'),
      grooming_level: () => testComponent.find('#grooming-level'),
      petsWithBreed: () => testComponent.find('#pets-with-breed'),
      sheltersWithBreed: () => testComponent.find('#shelters-with-breed')
    }
  })

  // author Cristian
  it('should not crash when breed is empty', () => {
    shallowWithBreed(emptyBreed)
    expect(testComponent.html()).to.exist
  })

  // author Cristian
  it('should not crash when CatBreed is undefined', () => {
    spyOnCatBreedsService(testBreed)
    let testPage = mount(<CatBreedInstancePage
      breed={undefined}
      match={{params: { breed_id: `${testBreed.id}` }, isExact: true, path: "", url: ""}}
    />)

    expect(testPage.html()).to.exist
  })

  // author Cristian
  it('should not crash when api CatBreed is empty', () => {
    spyOnCatBreedsService(emptyBreed)
    let testPage: ReactWrapper<CatBreedInstancePage> = mountWithBreed(emptyBreed)
    testPage.setState(emptyBreed)

    expect(testPage.html()).to.exist
  })

  // author Cristian
  it('should render all details', () => {

    shallowWithBreed(testBreed)

    expect(elements.name().text()).to.include(testBreed.name)
    expect(elements.alt_names().text()).to.include(testBreed.alt_names)
    expect(elements.temperament().text()).to.include(testBreed.temperament)
    expect(elements.lifeSpan().text()).to.include(testBreed.life_span.low)
        .and.to.include(testBreed.life_span.high)
    expect(elements.indoor().text()).to.include('Indoor')
    expect(elements.dog_friendly().text()).to.include('No')
    expect(elements.child_friendly().text()).to.include('No')
    expect(elements.grooming_level().text()).to.include(testBreed.grooming_level)
    expect(elements.petsWithBreed().text()).to.include(testBreed.cat_ids.length)
    expect(elements.sheltersWithBreed().text()).to.include(testBreed.local_shelters_with_breed.length)
  })

  // author Cristian
  it('should GET breed on component mount if no breed supplied in props', () => {
    let getCatBreedSpy = spyOnCatBreedsService(testBreed)

    mountWithBreed(emptyBreed, `${testBreed.id}`)

    expect(getCatBreedSpy).to.have.been.calledWith(`${testBreed.id}`)
  })

  // author Connor
  it('should GET breed on component mount if different breed supplied in props than url param', () => {
    let getCatBreedSpy = spyOnCatBreedsService(testBreed)
    let urlBreedId = testBreed.id + 1
    mountWithBreed(testBreed, `${urlBreedId}`)

    expect(getCatBreedSpy).to.have.been.calledWith(`${urlBreedId}`)
  })
})
