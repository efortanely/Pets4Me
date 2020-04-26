import 'jsdom-global/register'
import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme';
import chai, { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16';
import sinonChai from 'sinon-chai'
import { ObjectsPage } from '../../../models/ObjectsPage';
import ModelInstanceService from '../../../common/services/ModelInstanceService';
import { mockModelInstanceService } from '../../TestMocks';
import InfoCards from '../../../common/components/Cards/InfoCards';
import { spy } from 'sinon';
chai.use(sinonChai)

describe('<InfoCards />', () => {
  class TestInstance {

  }

  class TestInfoCards extends InfoCards<TestInstance> {
    getModelInstanceService(): ModelInstanceService<TestInstance> {
      return testModelInstanceService;
    }
    
    createInfoCard(o: TestInstance, key: any): JSX.Element {
      return <div></div>
    }
    
  }
  
  let testComponent: ShallowWrapper
  let testModelInstanceService: ModelInstanceService<TestInstance>

  function shallowWithPage(page: ObjectsPage<TestInstance>) {
    testModelInstanceService = mockModelInstanceService<TestInstance>(undefined, page)
    
    testComponent = shallow(<TestInfoCards />)
  }

  function createTestPage(num_objects: number = 0, total_results: number = 0, pageNumber: number = 1): ObjectsPage<TestInstance> {
    let testObjectsPage: ObjectsPage<TestInstance> = {
      objects: Array(num_objects).map(() => new TestInstance()),
      num_results: total_results,
      page: pageNumber,
      total_pages: Math.ceil(total_results / num_objects)
    }
    
    return testObjectsPage
  }

  function createTestState(pageNumber: number = 1, page: ObjectsPage<TestInstance> = createTestPage(), loading: boolean = false, searchParams: URLSearchParams = new URLSearchParams()) {
    return { pageNumber, loading, page, searchParams }
  }

  beforeEach(() => {
    configure({ adapter: new Adapter() });
    if(testComponent) {
      testComponent = testComponent.unmount()
    }
  })
  
  // author Connor
  it('should render loading page', () => {
    shallowWithPage(createTestPage())

    expect(testComponent.find('#loading').exists()).to.be.true
  });
})