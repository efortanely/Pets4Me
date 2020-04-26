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
import DogBreedInstancePage from "../../../model-instancepages/Breeds/DogBreedInstancePage";
import { DogBreed } from "../../../models/DogBreed";
import Adapter from "enzyme-adapter-react-16";
import { spy } from "sinon";
import sinonChai from "sinon-chai";
import { MemoryRouter } from "react-router-dom";
import ModelInstanceService from "../../../common/services/ModelInstanceService";
import { mockModelInstanceService } from "../../TestMocks";
chai.use(sinonChai);

describe("<DogBreedInstancePage />", () => {
  let testComponent: ShallowWrapper;
  let testBreed: DogBreed;
  let mobile_elements: any;
  let desktop_elements: any;
  const emptyBreed = {} as DogBreed;

  function spyOnDogBreedsService(breed?: DogBreed) {
    let testDogBreedsService: ModelInstanceService<DogBreed> = mockModelInstanceService<
      DogBreed
    >(breed);

    DogBreedInstancePage.providers.dogBreedsService = testDogBreedsService;

    return testDogBreedsService;
  }

  function mountWithBreed(breed: DogBreed, breed_id: string = `${breed.id}`) {
    return mount(
      <MemoryRouter>
        <DogBreedInstancePage
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

  function shallowWithBreed(breed: DogBreed, breed_id: string = `${breed.id}`) {
    testComponent = shallow(
      <DogBreedInstancePage
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
      breed_group: "bar",
      life_span: { low: 5, high: 6 },
      height_imperial: { low: 7, high: 11 },
      weight_imperial: { low: 4, high: 20 },
      temperament: "foobar",
      bred_for: "barfoo",
      dog_ids: [1, 2],
      shelters_with_breed: [1],
      photo: "",
      video_url: "",
    };

    let mobileComponent = () => testComponent.find(".mobile");
    let desktopComponent = () => testComponent.find(".desktop");

    mobile_elements = {
      name: () => mobileComponent().find("#name"),
      group: () => mobileComponent().find("#group"),
      lifeSpan: () => mobileComponent().find("#life-span"),
      height: () => mobileComponent().find("#height"),
      weight: () => mobileComponent().find("#weight"),
      temperament: () => mobileComponent().find("#temperament"),
      bredFor: () => mobileComponent().find("#bred-for"),
    };

    desktop_elements = {
      name: () => desktopComponent().find("#name"),
      group: () => desktopComponent().find("#group"),
      lifeSpan: () => desktopComponent().find("#life-span"),
      height: () => desktopComponent().find("#height"),
      weight: () => desktopComponent().find("#weight"),
      temperament: () => desktopComponent().find("#temperament"),
      bredFor: () => desktopComponent().find("#bred-for"),
    };
  });

  // author Connor
  it("should not crash when breed is empty", () => {
    shallowWithBreed(emptyBreed);
    expect(testComponent.html()).to.exist;
  });

  // author Connor
  it("should not crash when DogBreed is undefined", () => {
    spyOnDogBreedsService(undefined);
    let testPage = mountWithBreed({} as DogBreed, "1");

    expect(testPage.html()).to.exist;
  });

  // author Connor
  it("should not crash when api DogBreed is empty", () => {
    spyOnDogBreedsService(emptyBreed);
    let testPage: ReactWrapper<DogBreedInstancePage> = mountWithBreed(
      emptyBreed
    );
    testPage.setState(emptyBreed);

    expect(testPage.html()).to.exist;
  });

  // author Connor
  it("should render all details on mobile", () => {
    shallowWithBreed(testBreed);

    expect(mobile_elements.name().text()).to.include(testBreed.name);
    expect(mobile_elements.group().text()).to.include(testBreed.breed_group);
    expect(mobile_elements.lifeSpan().text())
      .to.include(testBreed.life_span.low)
      .and.to.include(testBreed.life_span.high);
    expect(mobile_elements.height().text())
      .to.include(testBreed.height_imperial.low)
      .and.to.include(testBreed.height_imperial.high);
    expect(mobile_elements.weight().text())
      .to.include(testBreed.weight_imperial.low)
      .and.to.include(testBreed.weight_imperial.high);
    expect(mobile_elements.temperament().text()).to.include(
      testBreed.temperament
    );
    expect(mobile_elements.bredFor().text()).to.include(testBreed.bred_for);
  });

  // author Rosemary
  it("should render all details on desktop", () => {
    shallowWithBreed(testBreed);

    expect(desktop_elements.name().text()).to.include(testBreed.name);
    expect(desktop_elements.group().text()).to.include(testBreed.breed_group);
    expect(desktop_elements.lifeSpan().text())
      .to.include(testBreed.life_span.low)
      .and.to.include(testBreed.life_span.high);
    expect(desktop_elements.height().text())
      .to.include(testBreed.height_imperial.low)
      .and.to.include(testBreed.height_imperial.high);
    expect(desktop_elements.weight().text())
      .to.include(testBreed.weight_imperial.low)
      .and.to.include(testBreed.weight_imperial.high);
    expect(desktop_elements.temperament().text()).to.include(
      testBreed.temperament
    );
    expect(desktop_elements.bredFor().text()).to.include(testBreed.bred_for);
  });

  // author Connor
  it("should GET breed on component mount if no breed supplied in props", () => {
    let getDogBreedSpy = spyOnDogBreedsService(testBreed);

    mountWithBreed(emptyBreed, `${testBreed.id}`);

    expect(getDogBreedSpy.getInstanceById).to.have.been.calledWith(
      `${testBreed.id}`
    );
  });
});
