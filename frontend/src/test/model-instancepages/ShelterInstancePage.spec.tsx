import 'jsdom-global/register';
import React from 'react';
import { configure, mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import chai, { expect } from 'chai';
import ShelterInstancePage from '../../model-instancepages/Shelters/ShelterInstancePage';
import { Pets4meSheltersService } from '../../common/services/Pets4meSheltersService';
import { Shelter } from '../../models/Shelter';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon'
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import { MemoryRouter } from 'react-router-dom';
import * as MapMedia from '../../common/components/MapMedia';
import ModelInstanceService from '../../common/services/ModelInstanceService';
chai.use(sinonChai)

describe('<ShelterInstancePage/>', () => {
  let testComponent: ShallowWrapper
  let testShelter: Shelter
  let elements: any
  const emptyShelter = { } as Shelter

  before( () => {
    sinon.stub(MapMedia, "default").returns(<div></div>);
  })

  function spyOnSheltersService(shelter: Shelter) {
    let testPets4meSheltersService = new Pets4meSheltersService()
    let getShelterSpy = spy((shelter_id: string) => new Promise<Shelter>(() => shelter))
    testPets4meSheltersService.getInstanceById = getShelterSpy

    let testContext = React.createContext<ModelInstanceService<Shelter>>(testPets4meSheltersService)
    ShelterInstancePage.contextType = testContext

    return getShelterSpy
  }

  function mountWithShelter(shelter: Shelter, shelter_id: string = `${shelter.id}`) {
    return mount(<MemoryRouter><ShelterInstancePage
      shelter={shelter}
      match={{params: { shelter_id: `${shelter_id}` }, isExact: true, path: "", url: ""}}
    /></MemoryRouter>)
  }

  function shallowWithShelter(shelter: Shelter, shelter_id: string = `${shelter.id}`) {
    testComponent = shallow(<ShelterInstancePage
      shelter={shelter}
      match={{params: { shelter_id: `${shelter.id}` }, isExact: true, path: "", url: ""}}
    />)
  }
  
  beforeEach(() => {
    configure({ adapter: new Adapter() });
    if(testComponent) {
      testComponent = testComponent.unmount()
    }
    
    testShelter = {
      id: 1,
      name: 'foo',
      address: {"country": "US","state":"CA", "postcode":91301, "address1": "29525 Agoura Road", "address2":"", "city":"Agoura"},
      contact: {"email":"foo@bar.bar", "phone_number":"123-456-7890"},
      photos: {full:[],small:[]},
      all_pets: {"0":{"species": "Cat", id:1},"1":{"species": "Dog", id:2}},
      distance: 1,
      adoption_policy: 'bar',
      mission: 'mar',
      top_cat_breed_id: 1,
      top_dog_breed_id: 2
    }

    elements = {
      name: () => testComponent.find('#name'),
      address: () => testComponent.find('#address'),
      contact: () => testComponent.find('#contact'),
      adoption_policy: () => testComponent.find('#adoption-policy'),
      mission: () => testComponent.find('#mission'),
      distance: () => testComponent.find('#distance'),
      num_pets: () => testComponent.find('#num-pets'),
      top_dog_breed_id: () => testComponent.find('#top-dog-breed-id'),
      top_cat_breed_id: () => testComponent.find('#top-cat-breed-id'),
    }
  })

  // author Andrew
  it('should not crash when shelter is empty', () => {
    shallowWithShelter(emptyShelter)
    expect(testComponent.html()).to.exist
  })

  // author Andrew
  it('should not crash when Shelter is undefined', () => {
    spyOnSheltersService(testShelter)
    let testPage = mount(<ShelterInstancePage
      shelter={undefined}
      match={{params: { shelter_id: `${testShelter.id}` }, isExact: true, path: "", url: ""}}
    />)

    expect(testPage.html()).to.exist
  })

  // author Andrew
  it('should not crash when api Shelter is empty', () => {
    spyOnSheltersService(emptyShelter)
    let testPage: ReactWrapper<ShelterInstancePage> = mountWithShelter(emptyShelter)
    testPage.setState(emptyShelter)

    expect(testPage.html()).to.exist
  })

  // author Andrew
  it('should render all details', () => {

    shallowWithShelter(testShelter)

    expect(elements.name().text()).to.include(testShelter.name)
    expect(elements.address().text()).to.include(testShelter.address.address1)
        .and.to.include(testShelter.address.address2)
        .and.to.include(testShelter.address.postcode)
        .and.to.include(testShelter.address.city)
        .and.to.include(testShelter.address.state)
        .and.to.include(testShelter.address.country)
    expect(elements.contact().text()).to.include(testShelter.contact.email)
        .and.to.include(testShelter.contact.phone_number)
    expect(elements.adoption_policy().text()).to.include(testShelter.adoption_policy)
    expect(elements.mission().text()).to.include(testShelter.mission)
    expect(elements.distance().text()).to.include(testShelter.distance)
    // expect(elements.num_pets()).to.include(Object.values(testShelter.all_pets)[0].id)
    // expect(elements.num_pets().text()).to.include(Object.values(testShelter.all_pets)[0].species)
    // expect(elements.top_dog_breed_id().Li()).to.include(testShelter.top_dog_breed_id)
    // expect(elements.top_cat_breed_id().text()).to.include(testShelter.top_cat_breed_id)
  })

  // author Andrew
  it('should GET shelter on component mount if no shelter supplied in props', () => {
    let getShelterSpy = spyOnSheltersService(testShelter)

    mountWithShelter(emptyShelter, `${testShelter.id}`)

    expect(getShelterSpy).to.have.been.calledWith(`${testShelter.id}`)
  })
})
