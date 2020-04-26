import "jsdom-global/register";
import React from "react";
import {
  configure,
  mount,
  shallow,
  ShallowWrapper,
  ReactWrapper,
} from "enzyme";
import chai, { expect } from "chai";
import CatBreedInstancePage from "../../../model-instancepages/Breeds/CatBreedInstancePage";
import { CatBreed } from "../../../models/CatBreed";
import Adapter from "enzyme-adapter-react-16";
import { spy } from "sinon";
import sinonChai from "sinon-chai";
import { MemoryRouter } from "react-router-dom";
import ModelInstanceService from "../../../common/services/ModelInstanceService";
import { mockModelInstanceService } from "../../TestMocks";
chai.use(sinonChai);

describe("<CatBreedInstancePage/>", () => {
  let testComponent: ShallowWrapper;
  let testBreed: CatBreed;
  let mobile_elements: any;
  let desktop_elements: any;
  const emptyBreed = {} as CatBreed;

  function spyOnCatBreedsService(breed: CatBreed) {
    let testCatBreedsService: ModelInstanceService<CatBreed> = mockModelInstanceService<
      CatBreed
    >(breed);

    CatBreedInstancePage.providers.catBreedService = testCatBreedsService;

    return testCatBreedsService;
  }

  function mountWithBreed(breed: CatBreed, breed_id: string = `${breed.id}`) {
    return mount(
      <MemoryRouter>
        <CatBreedInstancePage
          breed={breed}
          match={{
            params: { breed_id: `${breed_id}` },
            isExact: true,
            path: "",
            url: "",
          }}
        />
      </MemoryRouter>
    );
  }

  function shallowWithBreed(breed: CatBreed, breed_id: string = `${breed.id}`) {
    testComponent = shallow(
      <CatBreedInstancePage
        breed={breed}
        match={{
          params: { breed_id: `${breed.id}` },
          isExact: true,
          path: "",
          url: "",
        }}
      />
    );
  }

  beforeEach(() => {
    configure({ adapter: new Adapter() });
    if (testComponent) {
      testComponent = testComponent.unmount();
    }

    testBreed = {
      id: 1,
      name: "foo",
      alt_names: ["bar"],
      temperament: "epic B)",
      life_span: { low: 10, high: 12 },
      indoor: 1,
      dog_friendly: 1,
      child_friendly: 1,
      grooming_level: 2,
      cat_ids: [2, 3],
      shelters_with_breed: [1],
      photo: "",
      video_url: "",
    };

    let mobileComponent = () => testComponent.find(".mobile");
    let desktopComponent = () => testComponent.find(".desktop");

    mobile_elements = {
      name: () => mobileComponent().find("#name"),
      alt_names: () => mobileComponent().find("#alt-names"),
      temperament: () => mobileComponent().find("#temperament"),
      lifeSpan: () => mobileComponent().find(".life-span"),
      indoor: () => mobileComponent().find("#indoor"),
    };

    desktop_elements = {
      name: () => desktopComponent().find("#name"),
      alt_names: () => desktopComponent().find("#alt-names"),
      temperament: () => desktopComponent().find("#temperament"),
      lifeSpan: () => desktopComponent().find(".life-span"),
      indoor: () => desktopComponent().find("#indoor"),
    };
  });

  // author Cristian
  it("should not crash when breed is empty", () => {
    shallowWithBreed(emptyBreed);
    expect(testComponent.html()).to.exist;
  });

  // author Cristian
  it("should not crash when CatBreed is undefined", () => {
    spyOnCatBreedsService(testBreed);
    let testPage = mount(
      <CatBreedInstancePage
        breed={undefined}
        match={{
          params: { breed_id: `${testBreed.id}` },
          isExact: true,
          path: "",
          url: "",
        }}
      />
    );

    expect(testPage.html()).to.exist;
  });

  // author Cristian
  it("should not crash when api CatBreed is empty", () => {
    spyOnCatBreedsService(emptyBreed);
    let testPage: ReactWrapper<CatBreedInstancePage> = mountWithBreed(
      emptyBreed
    );
    testPage.setState(emptyBreed);

    expect(testPage.html()).to.exist;
  });

  // author Cristian
  it("should render all details on mobile", () => {
    shallowWithBreed(testBreed);

    expect(mobile_elements.name().text()).to.include(testBreed.name);
    expect(mobile_elements.alt_names().text()).to.include(testBreed.alt_names);
    expect(mobile_elements.temperament().text()).to.include(
      testBreed.temperament
    );
    expect(mobile_elements.lifeSpan().text())
      .to.include(testBreed.life_span.low)
      .and.to.include(testBreed.life_span.high);
    expect(mobile_elements.indoor().text()).to.include("Indoor");
  });

  // author Rosemary
  it("should render all details on desktop", () => {
    shallowWithBreed(testBreed);

    expect(desktop_elements.name().text()).to.include(testBreed.name);
    expect(desktop_elements.alt_names().text()).to.include(testBreed.alt_names);
    expect(desktop_elements.temperament().text()).to.include(
      testBreed.temperament
    );
    expect(desktop_elements.lifeSpan().text())
      .to.include(testBreed.life_span.low)
      .and.to.include(testBreed.life_span.high);
    expect(desktop_elements.indoor().text()).to.include("Indoor");
  });

  // author Cristian
  it("should GET breed on component mount if no breed supplied in props", () => {
    let getCatBreedSpy = spyOnCatBreedsService(testBreed);

    mountWithBreed(emptyBreed, `${testBreed.id}`);

    expect(getCatBreedSpy.getInstanceById).to.have.been.calledWith(
      `${testBreed.id}`
    );
  });
});
