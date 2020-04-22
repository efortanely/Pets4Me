import 'jsdom-global/register'
import React from 'react'
import { configure, mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import chai, { expect } from 'chai'
import { Pet, BackendEntity, Photos } from '../../models/Pet';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon'
import sinonChai from 'sinon-chai'
import { MemoryRouter } from 'react-router-dom';
import ModelInstanceService from '../../common/services/ModelInstanceService';
import { Shelter } from '../../models/Shelter';
import PetInstancePage from '../../model-instancepages/Pets/PetInstancePage';
import { mockModelInstanceService } from '../TestMocks';
chai.use(sinonChai)


describe('<PetInstancePage/>', () => {
  let testComponent: ShallowWrapper
  let testPet: Pet
  let elements: any
  const emptyPet = { } as Pet

  function spyOnSheltersService(shelter?: Shelter) {
    let testSheltersService = mockModelInstanceService<Shelter>(shelter)

    PetInstancePage.providers.sheltersService = testSheltersService

    return testSheltersService
  }


  function spyOnPetsService(pet?: Pet) {
    let testPetsService = mockModelInstanceService<Pet>(pet)

    PetInstancePage.providers.petsService = testPetsService

    return testPetsService
  }

  function mountWithPet(pet: Pet, pet_id: string = `${pet.id}`) {
    return mount(<MemoryRouter><PetInstancePage
      pet={pet}
      match={{params: { pet_id: `${pet_id}` }, isExact: true, path: "", url: ""}}
    /></MemoryRouter>)
  }

  function shallowWithPet(pet: Pet, pet_id: string = `${pet.id}`) {
    testComponent = shallow(<PetInstancePage
      pet={pet}
      match={{params: { pet_id: `${pet.id}` }, isExact: true, path: "", url: ""}}
    />)
  }
  
  beforeEach(() => {
    configure({ adapter: new Adapter() });
    if(testComponent) {
      testComponent = testComponent.unmount()
    }

    let testEntity = {
        id: 343,
        name: 'entity'
    } as BackendEntity;
    
    testPet = {
      age: '15',
      color: 'greenish-purple',
      description: 'mildly dog-like, with a reasonable sense of fashion',
      id: 1,
      name: 'She',
      photos: {full:[], small: []} as Photos,
      primary_breed: testEntity,
      shelter: testEntity,
      size: 'all-encompassing',
      species: 'SUPERMASSIVE',
      url: 'http://example.net/'
    } as Pet;

    elements = {
      age: () => testComponent.find('#age'),
      color: () => testComponent.find('#color'),
      description: () => testComponent.find('#description'),
      name: () => testComponent.find('#name'),
      photos: () => testComponent.find('#photos'),
      primary_breed: () => testComponent.find('#primary-breed'),
      secondary_breed: () => testComponent.find('#secondary-breed'),
      shelter: () => testComponent.find('#shelter'),
      size: () => testComponent.find('#size'),
      species: () => testComponent.find('#species'),
      url: () => testComponent.find('#url')
    }
  })

  // author: Dean
  it('should not crash when pet is empty', () => {
    shallowWithPet(emptyPet)
    expect(testComponent.html()).to.exist
  })

  // author: Dean
  it('should not crash when Pet is undefined', () => {
    spyOnPetsService(undefined)
    let testPage = mount(<PetInstancePage
      pet={undefined}
      match={{params: { pet: `${testPet.id}` }, isExact: true, path: "", url: ""}}
    />)

    expect(testPage.html()).to.exist
  })

  // author: Dean
  it('should not crash when api Pet is empty', () => {
    spyOnPetsService(emptyPet)
    let testPage: ReactWrapper<PetInstancePage> = mountWithPet(emptyPet)
    testPage.setState(emptyPet)

    expect(testPage.html()).to.exist
  })

  // author: Dean
  it('should render all details', () => {

    shallowWithPet(testPet)

    expect(elements.age().text()).to.include(testPet.age)
    expect(elements.color().text()).to.include(testPet.color)
    expect(elements.description().text()).to.include(testPet.description)
    expect(elements.name().text()).to.include(testPet.name)
    expect(elements.photos()).to.be.empty
    expect(elements.primary_breed().text()).to.include(testPet.primary_breed.name)
    expect(elements.secondary_breed().text()).to.include('Breed unknown.')
    expect(elements.shelter().text()).to.include(testPet.shelter.name)
    expect(elements.size().text()).to.include(testPet.size)
    expect(elements.species().text()).to.include(testPet.species)
    expect(elements.url().text()).to.include(testPet.url)
  })

  // author: Dean
  it('should GET pet on component mount if no pet supplied in props', () => {
    let getPetsSpy = spyOnPetsService(testPet)

    mountWithPet(emptyPet, `${testPet.id}`)

    expect(getPetsSpy.getInstanceById).to.have.been.calledWith(`${testPet.id}`)
  })

  // author Dean
  it('should GET pet on component mount if different pet supplied in props than url param', () => {
    let getPetsSpy = spyOnPetsService(testPet)
    let urlPetId = testPet.id + 1
    mountWithPet(testPet, `${urlPetId}`)

    expect(getPetsSpy.getInstanceById).to.have.been.calledWith(`${urlPetId}`)
  })
})
