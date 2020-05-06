import React from "react";
import Slider from "@material-ui/core/Slider";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from "react-bootstrap/Form";
import {
  SheltersFilterOptions,
  SheltersFiltersState,
  defaultFilterState,
} from "../../models/SheltersFilterOptions";
import { ThemeProvider } from "@material-ui/core";
import {
  sliderTheme,
  SelectItem,
  selectifyDataArray,
  getPostcodeOrDefault,
} from "../ModelHomepageUtils";
import "../ModelHomepage.css";

const customStyles = {
  control: (base: any, state: { isFocused: any }) => ({
    ...base,
    borderColor: state.isFocused ? "#D3D3D3" : "#D3D3D3",
    boxShadow: null,
    "&:hover": {
      borderColor: "none",
    },
  }),
};

export const constructQuery = (selectedFilters: SheltersFiltersState) => {
  let filters = [];
  let order_by = [];
  let query = `zip_code=${getPostcodeOrDefault(
    selectedFilters.postcode
  )}&max_dist=${selectedFilters.distanceMax}`;
  if (selectedFilters.city.length > 0)
    filters.push({ name: "city", op: "in", val: selectedFilters.city });
  if (selectedFilters.state.length > 0)
    filters.push({ name: "state", op: "in", val: selectedFilters.state });
  if (selectedFilters.shelterWithSpecies === "dogs")
    filters.push({ name: "has_dogs", op: "eq", val: 1 });
  if (selectedFilters.shelterWithSpecies === "cats")
    filters.push({ name: "has_cats", op: "eq", val: 1 });
  if (selectedFilters.sortType)
    order_by.push({
      field: selectedFilters.sortType,
      direction: selectedFilters.sortDir,
    });

  if (filters.length > 0) {
    if (order_by.length > 0)
      query += "&q=" + JSON.stringify({ filters: filters, order_by: order_by });
    else query += "&q=" + JSON.stringify({ filters: filters });
  } else if (order_by.length > 0)
    query += "&q=" + JSON.stringify({ order_by: order_by });
  return query;
};

export class SheltersFilters extends React.Component<
  SheltersFilterOptions,
  SheltersFiltersState
> {
  public sortData: SelectItem[] = [
    { label: "Name", value: "name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];
  public cityData: SelectItem[] = [];
  public stateData: SelectItem[] = [];
  public speciesData = [
    { label: "Shelter has cats", value: "cats" },
    { label: "Shelter has dogs", value: "dogs" },
  ] as SelectItem[];

  constructor(props: SheltersFilterOptions) {
    super(props);
    selectifyDataArray(this.props.cities, this.cityData);
    selectifyDataArray(this.props.states, this.stateData);
    this.state = defaultFilterState;
  }

  handleFilterUpdate() {
    this.props.updateFilters(constructQuery(this.state));
  }

  render() {
    return (
      <div className="filters">
        <Select
          options={this.sortData}
          placeholder="Sort by..."
          isClearable={true}
          onChange={(value: any) => this.setState({ sortType: value?.value })}
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "#966a7d",
              primary: "#581730",
              primary50: "#966a7d",
            },
          })}
        />
        {/* React is tragically very stupid and this is the only way I could style it right*/}
        <div className="sort-button-group">
          <ToggleButtonGroup type="radio" name="sortOrder" defaultValue={2}>
            <ToggleButton
              value={1}
              onClick={(value: any) => this.setState({ sortDir: "asc" })}
            >
              Ascending
            </ToggleButton>
            <ToggleButton
              value={2}
              onClick={(value: any) => this.setState({ sortDir: "desc" })}
            >
              Descending
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Select
          isMulti
          options={this.cityData}
          placeholder="Select a city..."
          isClearable={true}
          onChange={(newFilters: any) => {
            if (newFilters) {
              this.setState({
                city: newFilters.map((selectItem: SelectItem) => {
                  return selectItem.value;
                }),
              });
            } else {
              this.setState({ city: [] });
            }
          }}
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "#966a7d",
              primary: "#581730",
              primary50: "#966a7d",
              dangerLight: "#966a7d",
              danger: "#581730",
              neutral10: "#966a7d",
              neutral20: "#966a7d",
            },
          })}
        />
        <Select
          isMulti
          options={this.stateData}
          placeholder="Select a state..."
          isClearable={true}
          onChange={(newFilters: any) => {
            if (newFilters) {
              this.setState({
                state: newFilters.map((selectItem: SelectItem) => {
                  return selectItem.value;
                }),
              });
            } else {
              this.setState({ state: [] });
            }
          }}
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "#966a7d",
              primary: "#581730",
              primary50: "#966a7d",
              dangerLight: "#966a7d",
              danger: "#581730",
              neutral10: "#966a7d",
              neutral20: "#966a7d",
            },
          })}
        />
        <Select
          options={this.speciesData}
          placeholder="Select a species..."
          isClearable={true}
          onChange={(value: any) =>
            this.setState({ shelterWithSpecies: value?.value })
          }
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "#966a7d",
              primary: "#581730",
              primary50: "#966a7d",
              dangerLight: "#966a7d",
              danger: "#581730",
              neutral10: "#966a7d",
              neutral20: "#966a7d",
            },
          })}
        />
        <Form className="postcode">
          <Form.Group controlId="postcode">
            <Form.Control
              type="number"
              placeholder="Enter a postcode..."
              onInput={(value: any) =>
                this.setState({ postcode: value.target.value })
              }
            />
          </Form.Group>
        </Form>
        <ThemeProvider theme={sliderTheme}>
          <h5>
            Max distance from {getPostcodeOrDefault(this.state.postcode)} (mi.)
          </h5>
          <Slider
            defaultValue={this.props.max_distance}
            max={this.props.max_distance}
            valueLabelDisplay="auto"
            valueLabelFormat={(x) =>
              x === this.props.max_distance ? "Any" : x
            }
            onChange={(event: any, value: any) =>
              this.setState({ distanceMax: value })
            }
          />
        </ThemeProvider>
        <Button
          className="submit-button"
          variant="primary"
          onClick={() => this.handleFilterUpdate()}
        >
          Submit
        </Button>
      </div>
    );
  }
}
export default SheltersFilters;
