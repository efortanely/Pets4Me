import React from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Slider from '@material-ui/core/Slider'
import { PetsFiltersData } from '../../models/PetsFiltersData'
import { ThemeProvider } from '@material-ui/core';
import { sliderTheme, SelectItem, selectifyDataArray } from '../ModelHomepageUtils'
import '../ModelHomepage.css'

interface PetsFiltersState {
    species: string | undefined;
    gender: string | undefined;
    primaryBreed: string[];
    secondaryBreed: string[];
    color: string[];
    size: string[];
    age: string[];
    distanceMax: number;
    sortType: string | undefined;
    sortDir: string | undefined;
}

export class PetsFilters extends React.Component<PetsFiltersData, PetsFiltersState> {

    public sortData: SelectItem[] = [
        {label: "Primary breed", value: "Primary breed"},
        {label: "Secondary breed", value: "Secondary breed"},
        {label: "Shelter", value: "Shelter"},
        {label: "Distance", value: "Distance"},
        {label: "Size", value: "Size"},
        {label: "Color", value: "Color"},
        {label: "Age", value: "Age"}
    ]

    public speciesData = [
        { label: "Cat", value: "Cat" },
        { label: "Dog", value: "Dog" }] as SelectItem[];
    public genderData = [
        { label: "Female", value: "Female" },
        { label: "Male", value: "Male" }] as SelectItem[];
    public breedData: SelectItem[] = [];
    public colorData: SelectItem[] = [];
    public sizeData: SelectItem[] = [];
    public ageData: SelectItem[] = [];

    constructor(props: PetsFiltersData) {
        super(props);
        selectifyDataArray(this.props.breeds, this.breedData);
        selectifyDataArray(this.props.colors, this.colorData);
        selectifyDataArray(this.props.sizes, this.sizeData);
        selectifyDataArray(this.props.ages, this.ageData);
        this.state = {
            species: undefined,
            gender: undefined,
            primaryBreed: [],
            secondaryBreed: [],
            color: [],
            size: [],
            age: [],
            distanceMax: 1000,
            sortType: undefined,
            sortDir: "desc"
        } as PetsFiltersState;
    }

    public constructQuery(){
      let filters = []
      let order_by = []
      let query = "?zip_code=78705&max_dist=" + this.state.distanceMax
      if (this.state.species){
        filters.push({ "name": "name", "op": "eq", "val": this.state.species})
        if (this.state.primaryBreed.length > 0){
          if (this.state.species === "Dog")
            filters.push({ "name": "primary_dog_breed", "op": "eq", "val": {"name":"name","op":"eq","val":this.state.primaryBreed}})
          else if (this.state.species === "Cat")
            filters.push({ "name": "primary_cat_breed", "op": "eq", "val": {"name":"name","op":"eq","val":this.state.primaryBreed}})
        }
        if (this.state.secondaryBreed.length > 0){
          if (this.state.species === "Dog")
            filters.push({ "name": "secondary_dog_breed", "op": "eq", "val": {"name":"name","op":"eq","val":this.state.secondaryBreed}})
          else if (this.state.species === "Cat")
            filters.push({ "name": "secondary_cat_breed", "op": "eq", "val": {"name":"name","op":"eq","val":this.state.secondaryBreed}})
        }
      }
      if (this.state.gender)
        filters.push({ "name": "gender", "op": "eq", "val": this.state.gender})
      if (this.state.color.length > 0)
        filters.push({ "name": "color", "op": "eq", "val": this.state.color})
      if (this.state.size.length > 0)
        filters.push({ "name": "size", "op": "eq", "val": this.state.size})
      if (this.state.age.length > 0)
        filters.push({ "name": "age", "op": "eq", "val": this.state.age})
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
                <Select options={this.speciesData} placeholder="Select a species..." isClearable={true}
                    onChange={(value: any) => this.setState({species: value?.value})} />
                <Select options={this.genderData} placeholder="Select a gender..." isClearable={true}
                    onChange={(value: any) => this.setState({gender: value?.value})} />
                <Select isMulti options={this.breedData} placeholder="Select a primary breed..." isClearable={true}
                    onChange={(newFilters: any) => {
                        if (newFilters) {
                            this.setState({primaryBreed: newFilters.map((selectItem: SelectItem) => {
                                return selectItem.value;
                            })});
                        } else {
                            this.setState({primaryBreed: []});
                        }}} />
                <Select isMulti options={this.breedData} placeholder="Select a secondary breed..." isClearable={true}
                    onChange={(newFilters: any) => {
                        if (newFilters) {
                            this.setState({secondaryBreed: newFilters.map((selectItem: SelectItem) => {
                                return selectItem.value;
                            })});
                        } else {
                            this.setState({secondaryBreed: []});
                        }}} />
                <Select isMulti options={this.colorData} placeholder="Select a color..." isClearable={true}
                    onChange={(newFilters: any) => {
                        if (newFilters) {
                            this.setState({color: newFilters.map((selectItem: SelectItem) => {
                                return selectItem.value;
                            })});
                        } else {
                            this.setState({color: []});
                        }}} />
                <Select isMulti options={this.sizeData} placeholder="Select a size..." isClearable={true}
                    onChange={(newFilters: any) => {
                        if (newFilters) {
                            this.setState({size: newFilters.map((selectItem: SelectItem) => {
                                return selectItem.value;
                            })});
                        } else {
                            this.setState({size: []});
                        }}} />
                <Select isMulti options={this.ageData} placeholder="Select an age..." isClearable={true}
                    onChange={(newFilters: any) => {
                    if (newFilters) {
                        this.setState({age: newFilters.map((selectItem: SelectItem) => {
                            return selectItem.value;
                        })});
                    } else {
                        this.setState({age: []});
                    }}} />
                <ThemeProvider theme={sliderTheme}>
                    <h5>Distance</h5>
                    <Slider
                        defaultValue={0} max={this.props.max_distance} valueLabelDisplay='auto'
                        onChange={(event: any, value: any) => this.setState({distanceMax: value})}
                    />
                </ThemeProvider>
                <Button variant='primary' onClick={() => console.log("current filters:: ", this.constructQuery())}>Submit</Button>
            </div>
        );
    }
} export default PetsFilters;
