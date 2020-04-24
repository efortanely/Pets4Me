import 'jsdom-global/register';
import React from 'react';
import { configure, mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import chai, { expect } from 'chai';
import ShelterInstancePage from '../../model-instancepages/Shelters/ShelterInstancePage';
import { Shelter } from '../../models/Shelter';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon'
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import { MemoryRouter } from 'react-router-dom';
import * as MapMedia from '../../common/components/MapMedia';
import ModelInstanceService from '../../common/services/ModelInstanceService';
import { ObjectsPage } from '../../models/ObjectsPage';
import { mockModelInstanceService } from '../TestMocks';
chai.use(sinonChai)

describe('<ShelterInstancePage/>', () => {
  let testComponent: ShallowWrapper
  let testShelter: Shelter
  let mobile_elements: any
  let desktop_elements: any
  const emptyShelter = { } as Shelter

  before( () => {
    sinon.stub(MapMedia, "default").returns(<div></div>);
  })

  function spyOnSheltersService(shelter: Shelter) {
    let testSheltersService: ModelInstanceService<Shelter> = mockModelInstanceService<Shelter>(shelter)

    ShelterInstancePage.providers.sheltersService = testSheltersService

    return testSheltersService
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
      all_pets: {"0":{ name: "bob", species: "Cat", id:1}, "1":{name: "Alice", species: "Dog", id:2}},
      distance: 1,
      adoption_policy: 'bar',
      mission: 'mar',
      top_cat_breed_id: 1,
      top_dog_breed_id: 2
    }

    let mobileComponent = () => testComponent.find('.mobile')
    let desktopComponent = () => testComponent.find('.desktop')

    mobile_elements = {
      name: () => mobileComponent().find('#name'),
      address: () => mobileComponent().find('#address'),
      email: () => mobileComponent().find('#email'),
      phone_number: () => mobileComponent().find('#phone-number'),
      adoption_policy: () => mobileComponent().find('#adoption-policy'),
      mission: () => mobileComponent().find('#mission')
    }

    desktop_elements = {
      name: () => desktopComponent().find('#name'),
      address: () => desktopComponent().find('#address'),
      email: () => desktopComponent().find('#email'),
      phone_number: () => desktopComponent().find('#phone-number'),
      adoption_policy: () => desktopComponent().find('#adoption-policy'),
      mission: () => desktopComponent().find('#mission')
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
  it('should render all details on mobile', () => {
    shallowWithShelter(testShelter)

    expect(mobile_elements.name().text()).to.include(testShelter.name)
    expect(mobile_elements.address().text()).to.include(testShelter.address.address1)
        .and.to.include(testShelter.address.address2)
        .and.to.include(testShelter.address.postcode)
        .and.to.include(testShelter.address.city)
        .and.to.include(testShelter.address.state)
    expect(mobile_elements.email().text()).to.include(testShelter.contact.email)
    expect(mobile_elements.phone_number().text()).to.include(testShelter.contact.phone_number)
    expect(mobile_elements.adoption_policy().text()).to.include(testShelter.adoption_policy)
    expect(mobile_elements.mission().text()).to.include(testShelter.mission)
  })

  // author Rosemary
  it('should render all details on desktop', () => {
    shallowWithShelter(testShelter)

    expect(desktop_elements.name().text()).to.include(testShelter.name)
    expect(desktop_elements.address().text()).to.include(testShelter.address.address1)
        .and.to.include(testShelter.address.address2)
        .and.to.include(testShelter.address.postcode)
        .and.to.include(testShelter.address.city)
        .and.to.include(testShelter.address.state)
    expect(desktop_elements.email().text()).to.include(testShelter.contact.email)
    expect(desktop_elements.phone_number().text()).to.include(testShelter.contact.phone_number)
    expect(desktop_elements.adoption_policy().text()).to.include(testShelter.adoption_policy)
    expect(desktop_elements.mission().text()).to.include(testShelter.mission)
  })

  // author Andrew
  it('should GET shelter on component mount if no shelter supplied in props', () => {
    let getShelterSpy = spyOnSheltersService(testShelter)

    mountWithShelter(emptyShelter, `${testShelter.id}`)

    expect(getShelterSpy.getInstanceById).to.have.been.calledWith(`${testShelter.id}`)
  })
})
