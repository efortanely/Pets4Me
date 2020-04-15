import React from 'react';
import Slider from '@material-ui/core/Slider'
import Select from 'react-select';
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Form from 'react-bootstrap/Form'
import { SheltersFiltersData } from '../../models/SheltersFiltersData'
import { ThemeProvider } from '@material-ui/core';
import { sliderTheme, SelectItem, selectifyDataArray } from '../ModelHomepageUtils'
import '../ModelHomepage.css'

interface SheltersFiltersState {
    city: string[];
    postcode: number;
    state: string[];
    distanceMax: number;
    shelterWithSpecies: string;
    sortType: string | undefined;
    sortDir: string | undefined;
}

export class SheltersFilters extends React.Component<SheltersFiltersData, SheltersFiltersState> {

    public sortData: SelectItem[] = [
        {label: "Name", value: "Name"},
        {label: "City", value: "City"},
        {label: "State", value: "State"},
        {label: "Distance", value: "Distance"}
    ]
    public cityData: SelectItem[] = [];
    public stateData: SelectItem[] = [];
    public speciesData = [
        { label: "Cat", value: "cats" },
        { label: "Dog", value: "dogs" }] as SelectItem[];

    constructor(props: SheltersFiltersData) {
        super(props);
        selectifyDataArray(this.props.cities, this.cityData);
        selectifyDataArray(this.props.states, this.stateData);
        this.state = {
            city: [],
            postcode: 0,
            state: [],
            distanceMax: 1000,
            shelterWithSpecies: "",
            sortType: undefined,
            sortDir: "desc"
        }
    }

    public constructQuery(){
      let filters = []
      let order_by = []
      let query = "?zip_code=78705&max_dist=" + this.state.distanceMax
      if (this.state.city.length > 0)
        filters.push({ "name": "city", "op": "eq", "val": this.state.city})
      if (this.state.state.length > 0)
        filters.push({ "name": "state", "op": "eq", "val": this.state.state})
      if (this.state.postcode !== 0)
        filters.push({ "name": "postcode", "op": "eq", "val": this.state.postcode})
      if (this.state.shelterWithSpecies === "dogs")
         filters.push({ "name": "has_dogs", "op": "eq", "val": 1})
      if (this.state.shelterWithSpecies === "cats")
        filters.push({ "name": "has_cats", "op": "eq", "val": 1})
      if (this.state.sortType)
        order_by.push({ "field": this.state.sortType, "direction": this.state.sortDir})

      if (filters.length > 0){
        if (order_by.length > 0)
          query += "&q=" + JSON.stringify({"filters": filters, "order_by": order_by})
        else
          query += "&q=" + JSON.stringify({"filters": filters})
      }
      else if (order_by.length > 0)
        query += "&q=" + JSON.stringify({"order_by": order_by})
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
                <Select isMulti options={this.cityData} placeholder="Select a city..." isClearable={true}
                    onChange={(newFilters: any) => {
                        if (newFilters) {
                            this.setState({city: newFilters.map((selectItem: SelectItem) => {
                                return selectItem.value;
                            })});
                        } else {
                            this.setState({city: []});
                        }}} />
                <Select isMulti options={this.stateData} placeholder="Select a state..." isClearable={true}
                    onChange={(newFilters: any) => {
                        if (newFilters) {
                            this.setState({state: newFilters.map((selectItem: SelectItem) => {
                                return selectItem.value;
                            })});
                        } else {
                            this.setState({state: []});
                        }}} />
                <Form className="postcode">
                    <Form.Group controlId="postcode">
                        <Form.Control type="number" placeholder="Enter a postcode..."
                            onInput={(value: any) => this.setState({postcode: value.target.value})} />
                    </Form.Group>
                </Form>
                <Select options={this.speciesData} placeholder="Select a species..." isClearable={true}
                    onChange={(value: any) => this.setState({shelterWithSpecies: value?.value})} />
                <ThemeProvider theme={sliderTheme}>
                    <h5>Max distance from ${this.state.postcode} (mi.)</h5>
                    <Slider
                        defaultValue={0} max={this.props.max_distance} valueLabelDisplay='auto'
                        onChange={(event: any, value: any) => this.setState({distanceMax: value})}
                    />
                </ThemeProvider>
            <Button variant='primary' onClick={() => console.log("current filters:: ", this.constructQuery())}>Submit</Button>
            </div>
        );
    }
} export default SheltersFilters;
