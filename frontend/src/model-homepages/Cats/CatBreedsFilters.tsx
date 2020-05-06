import React from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Slider from "@material-ui/core/Slider";
import { ThemeProvider } from "@material-ui/core";
import {
  sliderTheme,
  SelectItem,
  selectifyDataArray,
} from "../ModelHomepageUtils";
import {
  CatBreedsFilterOptions,
  CatBreedsFiltersState,
  defaultFilterState,
} from "../../models/CatBreedsFilterOptions";
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

export const constructQuery = (
  breeds: string[],
  selectedFilters: CatBreedsFiltersState
) => {
  let filters = [];
  let order_by = [];
  let query = "";
  if (selectedFilters.nameInitials.length > 0) {
    let listOfBreeds = breeds.filter((breedName: string) => {
      if (selectedFilters.nameInitials.includes(breedName.slice(0, 1)))
        return true;
      return false;
    });
    filters.push({ name: "name", op: "in", val: listOfBreeds });
  }
  if (selectedFilters.doorsiness) {
    let val = 0;
    if (selectedFilters.doorsiness === "Indoor") val = 1;
    filters.push({ name: "indoor", op: "eq", val: val });
  }
  if (selectedFilters.dogLevel > 0)
    filters.push({
      name: "dog_friendly",
      op: "ge",
      val: selectedFilters.dogLevel,
    });
  if (selectedFilters.childLevel > 0)
    filters.push({
      name: "child_friendly",
      op: "ge",
      val: selectedFilters.childLevel,
    });
  if (selectedFilters.groomingLevel > 0)
    filters.push({
      name: "grooming_level",
      op: "le",
      val: selectedFilters.groomingLevel,
    });
  filters.push({
    name: "life_span_low",
    op: "ge",
    val: selectedFilters.minLifespan,
  });
  filters.push({
    name: "life_span_high",
    op: "le",
    val: selectedFilters.maxLifespan,
  });
  if (selectedFilters.sortType)
    order_by.push({
      field: selectedFilters.sortType,
      direction: selectedFilters.sortDir,
    });
  if (filters.length > 0) {
    query += "q=";
    if (order_by.length > 0)
      query += JSON.stringify({ filters: filters, order_by: order_by });
    else query += JSON.stringify({ filters: filters });
  } else if (order_by.length > 0)
    query += JSON.stringify({ order_by: order_by });
  return query;
};

export class CatBreedsFilters extends React.Component<
  CatBreedsFilterOptions,
  CatBreedsFiltersState
> {
  public sortData: SelectItem[] = [
    { label: "Name", value: "name" },
    { label: "Life span", value: "life_span_low" },
    { label: "Dog-friendliness", value: "dog_friendly" },
    { label: "Child-friendliness", value: "child_friendly" },
    { label: "Grooming level", value: "grooming_level" },
  ];

  public doorsinessData = [
    { label: "Indoor", value: "Indoor" },
    { label: "Outdoor", value: "Outdoor" },
  ] as SelectItem[];

  public qualitativeQuantifier = [
    { label: "Low", value: 1 },
    { label: "Moderate", value: 2 },
    { label: "High", value: 4 },
  ];

  public nameData: SelectItem[] = [];

  constructor(props: CatBreedsFilterOptions) {
    super(props);
    selectifyDataArray(this.props.unique_letters, this.nameData);
    this.state = defaultFilterState;
  }

  handleChange = (event: any, newValue: number | number[]) => {
    this.setState({ dogLevel: newValue as number });
  };

  handleFilterUpdate() {
    this.props.updateFilters(constructQuery(this.props.cat_breeds, this.state));
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
          options={this.nameData}
          placeholder="Select a first letter..."
          isClearable={true}
          onChange={(newFilters: any) => {
            if (newFilters) {
              this.setState({
                nameInitials: newFilters.map((selectItem: SelectItem) => {
                  return selectItem.value;
                }),
              });
            } else {
              this.setState({ nameInitials: [] });
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
          options={this.doorsinessData}
          placeholder="Indoor/outdoor?"
          isClearable={true}
          onChange={(value: any) => this.setState({ doorsiness: value?.value })}
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

        <h5 className="slider-header">Minimum dog-friendliness level</h5>
        <Select
          options={this.qualitativeQuantifier}
          isClearable={true}
          onChange={(value: any) => this.setState({ dogLevel: value?.value })}
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

        <h5>Minimum child-friendliness level</h5>
        <Select
          options={this.qualitativeQuantifier}
          isClearable={true}
          onChange={(value: any) => this.setState({ childLevel: value?.value })}
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

        <h5>Maximum grooming level</h5>
        <Select
          options={this.qualitativeQuantifier}
          isClearable={true}
          onChange={(value: any) =>
            this.setState({ groomingLevel: value?.value })
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
            },
          })}
        />

        <ThemeProvider theme={sliderTheme}>
          <h5>Lifespan (years)</h5>
          <Slider
            defaultValue={[this.props.life_span.min, this.props.life_span.max]}
            min={this.props.life_span.min}
            max={this.props.life_span.max}
            valueLabelDisplay="auto"
            onChange={(event: any, value: any) =>
              this.setState({ minLifespan: value[0], maxLifespan: value[1] })
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
export default CatBreedsFilters;
