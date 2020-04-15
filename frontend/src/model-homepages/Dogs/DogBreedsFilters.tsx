import React from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Slider from '@material-ui/core/Slider'
import { DogBreedsFiltersData } from '../../models/DogBreedsFiltersData'
import { ThemeProvider } from '@material-ui/core';
import { sliderTheme, SelectItem, selectifyDataArray } from '../ModelHomepageUtils'

interface DogBreedsFiltersState {
  nameInitials: string[];
  breedGroup: string[];
  maxHeight: number;
  minHeight: number;
  maxWeight: number;
  minWeight: number;
  lifespanMin: number;
  lifespanMax: number;
  sortType: string | undefined;
  sortDir: string | undefined;
}

export class DogBreedsFilters extends React.Component<DogBreedsFiltersData, DogBreedsFiltersState> {

    public sortData: SelectItem[] = [
        {label: "Name", value: "Name"},
        {label: "Height", value: "Height"},
        {label: "Weight", value: "Weight"},
        {label: "Breed group", value: "Breed group"}
    ]
    public nameInitials: SelectItem[] = [];
    public breedGroup: SelectItem[] = [];

    constructor(props: DogBreedsFiltersData) {
        super(props);
        selectifyDataArray(this.props.name_initials, this.nameInitials);
        selectifyDataArray(this.props.breed_group, this.breedGroup);
        this.state = {
            nameInitials: [],
            breedGroup: [],
            maxHeight: 1000,
            minHeight: 0,
            maxWeight: 1000,
            minWeight: 0,
            lifespanMin: 0,
            lifespanMax: 100,
            sortType: undefined,
            sortDir: "desc"
        } as DogBreedsFiltersState;
    }

    public constructQuery(){
      let filters = []
      let order_by = []
      let query = ""
      //FIXME: NameInitials query
      if (this.state.nameInitials.length > 0)
        filters.push({ "name": "name", "op": "opname", "val": this.state.nameInitials})
      if (this.state.breedGroup.length > 0)
        filters.push({ "name": "breed_group", "op": "eq", "val": this.state.breedGroup})
      filters.push({ "name": "height_imperial_low", "op": "gt", "val": this.state.minHeight})
      filters.push({ "name": "height_imperial_high", "op": "lt", "val": this.state.maxHeight})
      filters.push({ "name": "weight_imperial_low", "op": "gt", "val": this.state.minWeight})
      filters.push({ "name": "weight_imperial_high", "op": "lt", "val": this.state.maxWeight})
      filters.push({ "name": "life_span_low", "op": "gt", "val": this.state.lifespanMin})
      filters.push({ "name": "life_span_high", "op": "lt", "val": this.state.lifespanMax})
      if (this.state.sortType)
        order_by.push({ "field": this.state.sortType, "direction": this.state.sortDir})

      if (filters.length > 0){
        if (order_by.length > 0)
          query += "?q=" + JSON.stringify({"filters": filters, "order_by": order_by})
        else
          query += "?q=" + JSON.stringify({"filters": filters})
      }
      else if (order_by.length > 0)
        query += "?q=" + JSON.stringify({"order_by": order_by})
      return query;
    }

render() {
    return (
        <div className='filters'>
            <Select options={this.sortData} placeholder="Sort by..." isClearable={true}
                    onChange={(value: any) => this.setState({sortType: value?.value})} />
            {/* React is tragically very stupid and this is the only way I could style it right*/}
            <div className="sort-button-group">
                <ToggleButtonGroup type="radio" name="sortOrder" defaultValue={2}>
                    <ToggleButton value={1} onClick={(value: any) => this.setState({sortDir: "asc"})}>Ascending</ToggleButton>
                    <ToggleButton value={2} onClick={(value: any) => this.setState({sortDir: "desc"})}>Descending</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <Select isMulti options={this.nameInitials} placeholder="Select a letter..." isClearable={true}
            onChange={(newFilters: any) => {
                if (newFilters) {
                    this.setState({nameInitials: newFilters.map((selectItem: SelectItem) => {
                        return selectItem.value;
                    })});
                } else {
                    this.setState({nameInitials: []});
                }}} />
            <Select isMulti options={this.breedGroup} placeholder="Select a breed group..." isClearable={true}
            onChange={(newFilters: any) => {
                if (newFilters) {
                    this.setState({breedGroup: newFilters.map((selectItem: SelectItem) => {
                        return selectItem.value;
                    })});
                } else {
                    this.setState({breedGroup: []});
                }}} />

            <ThemeProvider theme={sliderTheme}>
                <h5>Height</h5>
                <Slider
                    defaultValue={[this.props.min_height, this.props.max_height]} valueLabelDisplay='auto'
                    min={this.props.min_height} max={this.props.max_height}
                    onChange={(event: any, value: any) => this.setState({minHeight: value[0], maxHeight: value[1]})}
                />
                <h5>Weight</h5>
                <Slider
                    defaultValue={[this.props.min_weight, this.props.max_weight]} valueLabelDisplay='auto'
                    min={this.props.min_weight} max={this.props.max_weight}
                    onChange={(event: any, value: any) => this.setState({minWeight: value[0], maxWeight: value[1]})}
                />
                <h5>Lifespan</h5>
                <Slider
                    defaultValue={[this.props.lifespan_min, this.props.lifespan_max]} valueLabelDisplay='auto'
                    min={this.props.lifespan_min} max={this.props.lifespan_max}
                    onChange={(event: any, value: any) => this.setState({lifespanMin: value[0], lifespanMax: value[1]})}
                />
            </ThemeProvider>

            <Button variant='primary' onClick={() => console.log("current filters:: ", this.constructQuery())}>Submit</Button>
        </div>
    );
}
} export default DogBreedsFilters;
