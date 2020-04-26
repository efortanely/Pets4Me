import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import {
  SheltersFilters,
  SheltersFiltersState,
  constructQuery,
} from "../../../model-homepages/Shelters/SheltersFilters";
import { SheltersFiltersData } from "../../../models/SheltersFiltersData";
chai.use(sinonChai);

describe("<SheltersFilters />", () => {
  let testDefaultFilterState = {
    city: [],
    postcode: 0,
    state: [],
    distanceMax: 1000,
    shelterWithSpecies: "",
    sortType: undefined,
    sortDir: "desc",
  };

  function mountWithPage(filterOptions: SheltersFiltersData) {
    return mount(<SheltersFilters {...filterOptions} />);
  }

  // author Cristian
  it("default call to the submit button with no options selected", () => {
    expect(constructQuery(testDefaultFilterState)).to.equal(
      "zip_code=78705&max_dist=1000"
    );
  });
});
