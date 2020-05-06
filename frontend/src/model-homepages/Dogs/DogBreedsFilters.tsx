import React from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Slider from "@material-ui/core/Slider";
import {
  DogBreedsFilterOptions,
  DogBreedsFiltersState,
  defaultFilterState,
} from "../../models/DogBreedsFilterOptions";
import { ThemeProvider } from "@material-ui/core";
import {
  sliderTheme,
  SelectItem,
  selectifyDataArray,
} from "../ModelHomepageUtils";

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
  selectedFilters: DogBreedsFiltersState
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
  if (selectedFilters.breedGroup.length > 0)
    filters.push({
      name: "breed_group",
      op: "in",
      val: selectedFilters.breedGroup,
    });
  filters.push({
    name: "height_imperial_low",
    op: "ge",
    val: selectedFilters.minHeight,
  });
  filters.push({
    name: "height_imperial_high",
    op: "le",
    val: selectedFilters.maxHeight,
  });
  filters.push({
    name: "weight_imperial_low",
    op: "ge",
    val: selectedFilters.minWeight,
  });
  filters.push({
    name: "weight_imperial_high",
    op: "le",
    val: selectedFilters.maxWeight,
  });
  filters.push({
    name: "life_span_low",
    op: "ge",
    val: selectedFilters.lifespanMin,
  });
  filters.push({
    name: "life_span_high",
    op: "le",
    val: selectedFilters.lifespanMax,
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

export class DogBreedsFilters extends React.Component<
  DogBreedsFilterOptions,
  DogBreedsFiltersState
> {
  public sortData: SelectItem[] = [
    { label: "Name", value: "name" },
    { label: "Height", value: "height_imperial_low" },
    { label: "Weight", value: "weight_imperial_low" },
    { label: "Breed group", value: "breed_group" },
  ];
  public nameInitials: SelectItem[] = [];
  public breedGroup: SelectItem[] = [];

  constructor(props: DogBreedsFilterOptions) {
    super(props);
    selectifyDataArray(this.props.unique_letters, this.nameInitials);
    selectifyDataArray(this.props.breed_groups, this.breedGroup);
    this.state = defaultFilterState;
  }

  handleFilterUpdate() {
    this.props.updateFilters(constructQuery(this.props.dog_breeds, this.state));
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
          options={this.nameInitials}
          placeholder="Select a letter..."
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
          isMulti
          options={this.breedGroup}
          placeholder="Select a breed group..."
          isClearable={true}
          onChange={(newFilters: any) => {
            if (newFilters) {
              this.setState({
                breedGroup: newFilters.map((selectItem: SelectItem) => {
                  return selectItem.value;
                }),
              });
            } else {
              this.setState({ breedGroup: [] });
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

        <ThemeProvider theme={sliderTheme}>
          <h5>Height (in.)</h5>
          <Slider
            defaultValue={[
              this.props.height_span.min,
              this.props.height_span.max,
            ]}
            valueLabelDisplay="auto"
            min={this.props.height_span.min}
            max={this.props.height_span.max}
            onChange={(event: any, value: any) =>
              this.setState({ minHeight: value[0], maxHeight: value[1] })
            }
          />
          <h5>Weight (lb.)</h5>
          <Slider
            defaultValue={[
              this.props.weight_span.min,
              this.props.weight_span.max,
            ]}
            valueLabelDisplay="auto"
            min={this.props.weight_span.min}
            max={this.props.weight_span.max}
            onChange={(event: any, value: any) =>
              this.setState({ minWeight: value[0], maxWeight: value[1] })
            }
          />
          <h5>Lifespan (years)</h5>
          <Slider
            defaultValue={[this.props.life_span.min, this.props.life_span.max]}
            valueLabelDisplay="auto"
            min={this.props.life_span.min}
            max={this.props.life_span.max}
            onChange={(event: any, value: any) =>
              this.setState({ lifespanMin: value[0], lifespanMax: value[1] })
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
export default DogBreedsFilters;
