import 'jsdom-global/register'
import React from 'react'
import { configure, mount, ShallowWrapper } from 'enzyme';
import chai, { expect } from 'chai'
import { DogBreed } from '../../../models/DogBreed';
import Adapter from 'enzyme-adapter-react-16';
import Modal from 'react-modal';
import sinonChai from 'sinon-chai'
import { ObjectsPage } from '../../../models/ObjectsPage';
import DogBreedsInfoCards from '../../../model-homepages/Dogs/DogBreedsInfoCards';
import ModelInstanceService from '../../../common/services/ModelInstanceService';
import { MemoryRouter } from 'react-router-dom';
import { mockModelInstanceService } from '../../TestMocks';
import sinon from 'sinon'
chai.use(sinonChai)


describe('<DogBreedsInfoCards />', () => {
  let testComponent: ShallowWrapper
  let testBreedPage: ObjectsPage<DogBreed>

  function mountWithPage(page: ObjectsPage<DogBreed>) {
    let testDogBreedsService: ModelInstanceService<DogBreed> = mockModelInstanceService<DogBreed>(undefined, page)

    DogBreedsInfoCards.providers.dogBreedsService = testDogBreedsService
    let stub = sinon.stub(Modal)
    
    return mount(<MemoryRouter><div id="mainContent"></div><DogBreedsInfoCards /></MemoryRouter>)
  }

  beforeEach(() => {
    configure({ adapter: new Adapter() });
    if(testComponent) {
      testComponent = testComponent.unmount()
    }

    testBreedPage = {
      num_results: 0,
      objects: [],
      page: 1,
      total_pages: 1
    }

  })
  
  // author Connor
  it('should render loading page', () => {
    let testPage = mountWithPage(testBreedPage)

    expect(testPage.find('.spinner-border')).to.exist
  });
})