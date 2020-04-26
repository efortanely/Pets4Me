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
import { Pet, BackendEntity, Photos } from "../../models/Pet";
import Adapter from "enzyme-adapter-react-16";
import { spy } from "sinon";
import sinonChai from "sinon-chai";
import { MemoryRouter } from "react-router-dom";
import ModelInstanceService from "../../common/services/ModelInstanceService";
import { Shelter } from "../../models/Shelter";
import PetInstancePage from "../../model-instancepages/Pets/PetInstancePage";
import { mockModelInstanceService } from "../TestMocks";
chai.use(sinonChai);

describe("<PetInstancePage/>", () => {
  let testComponent: ShallowWrapper;
  let testPet: Pet;
  let mobile_elements: any;
  let desktop_elements: any;
  const emptyPet = {} as Pet;

  function spyOnSheltersService(shelter?: Shelter) {
    let testSheltersService = mockModelInstanceService<Shelter>(shelter);

    PetInstancePage.providers.sheltersService = testSheltersService;

    return testSheltersService;
  }

  function spyOnPetsService(pet?: Pet) {
    let testPetsService = mockModelInstanceService<Pet>(pet);

    PetInstancePage.providers.petsService = testPetsService;

    return testPetsService;
  }

  function mountWithPet(pet: Pet, pet_id: string = `${pet.id}`) {
    return mount(
      <MemoryRouter>
        <PetInstancePage
          pet={pet}
          match={{
            params: { pet_id: `${pet_id}` },
            isExact: true,
            path: "",
            url: "",
          }}
        />
      </MemoryRouter>
    );
  }

  function shallowWithPet(pet: Pet, pet_id: string = `${pet.id}`) {
    testComponent = shallow(
      <PetInstancePage
        pet={pet}
        match={{
          params: { pet_id: `${pet.id}` },
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

    let testEntity = {
      id: 343,
      name: "entity",
    } as BackendEntity;

    testPet = {
      age: "15",
      color: "greenish-purple",
      description: "mildly dog-like, with a reasonable sense of fashion",
      id: 1,
      name: "She",
      photos: { full: [], small: [] } as Photos,
      primary_breed: testEntity,
      secondary_breed: testEntity,
      shelter: testEntity,
      size: "all-encompassing",
      species: "SUPERMASSIVE",
      url: "http://example.net/",
    } as Pet;

    let mobileComponent = () => testComponent.find(".mobile");
    let desktopComponent = () => testComponent.find(".desktop");

    mobile_elements = {
      age: () => mobileComponent().find(".age"),
      breed: () => mobileComponent().find("#breed-header"),
      color: () => mobileComponent().find(".color"),
      description: () => mobileComponent().find(".about"),
      name: () => mobileComponent().find("#name"),
      photos: () => mobileComponent().find("#photos"),
      shelter: () => mobileComponent().find(".shelter-name-for-testing"),
      size: () => mobileComponent().find(".size"),
    };

    desktop_elements = {
      age: () => desktopComponent().find(".age"),
      breed: () => desktopComponent().find("#breed-header"),
      color: () => desktopComponent().find(".color"),
      description: () => desktopComponent().find(".about"),
      name: () => desktopComponent().find("#name"),
      photos: () => desktopComponent().find("#photos"),
      shelter: () => desktopComponent().find(".shelter-name-for-testing"),
      size: () => desktopComponent().find(".size"),
    };
  });

  // author: Dean
  it("should not crash when pet is empty", () => {
    shallowWithPet(emptyPet);
    expect(testComponent.html()).to.exist;
  });

  // author: Dean
  it("should not crash when Pet is undefined", () => {
    spyOnPetsService(undefined);
    let testPage = mount(
      <PetInstancePage
        pet={undefined}
        match={{
          params: { pet: `${testPet.id}` },
          isExact: true,
          path: "",
          url: "",
        }}
      />
    );

    expect(testPage.html()).to.exist;
  });

  // author: Dean
  it("should not crash when api Pet is empty", () => {
    spyOnPetsService(emptyPet);
    let testPage: ReactWrapper<PetInstancePage> = mountWithPet(emptyPet);
    testPage.setState(emptyPet);

    expect(testPage.html()).to.exist;
  });

  // author: Dean
  it("should render all details on mobile", () => {
    shallowWithPet(testPet);

    expect(mobile_elements.age().text()).to.include(testPet.age);
    expect(mobile_elements.color().text()).to.include(testPet.color);
    expect(mobile_elements.description().text()).to.include(
      testPet.description
    );
    expect(mobile_elements.name().text()).to.include(testPet.name);
    expect(mobile_elements.breed().text()).to.include(
      testPet.primary_breed.name
    );
    expect(mobile_elements.breed().text()).to.include(
      testPet.secondary_breed.name
    );
    expect(mobile_elements.photos()).to.be.empty;
    expect(mobile_elements.shelter().text()).to.include(testPet.shelter.name);
    expect(mobile_elements.size().text()).to.include(testPet.size);
  });

  // author: Rosemary
  it("should render all details on desktop", () => {
    shallowWithPet(testPet);

    expect(desktop_elements.age().text()).to.include(testPet.age);
    expect(desktop_elements.color().text()).to.include(testPet.color);
    expect(desktop_elements.description().text()).to.include(
      testPet.description
    );
    expect(desktop_elements.name().text()).to.include(testPet.name);
    expect(desktop_elements.breed().text()).to.include(
      testPet.primary_breed.name
    );
    expect(desktop_elements.breed().text()).to.include(
      testPet.secondary_breed.name
    );
    expect(desktop_elements.photos()).to.be.empty;
    expect(desktop_elements.shelter().text()).to.include(testPet.shelter.name);
    expect(desktop_elements.size().text()).to.include(testPet.size);
  });

  // author: Dean
  it("should GET pet on component mount if no pet supplied in props", () => {
    let getPetsSpy = spyOnPetsService(testPet);

    mountWithPet(emptyPet, `${testPet.id}`);

    expect(getPetsSpy.getInstanceById).to.have.been.calledWith(`${testPet.id}`);
  });

  // author Dean
  it("should GET pet on component mount if different pet supplied in props than url param", () => {
    let getPetsSpy = spyOnPetsService(testPet);
    let urlPetId = testPet.id + 1;
    mountWithPet(testPet, `${urlPetId}`);

    expect(getPetsSpy.getInstanceById).to.have.been.calledWith(`${urlPetId}`);
  });
});
