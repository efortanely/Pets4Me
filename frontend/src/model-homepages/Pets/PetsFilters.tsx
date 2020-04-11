import React from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Slider from '@material-ui/core/Slider'
import { PetsFiltersData, PetsFiltersState, defaultFilterState } from '../../models/PetsFiltersData'
import { ThemeProvider } from '@material-ui/core';
import { sliderTheme, SelectItem, selectifyDataArray } from '../ModelHomepageUtils'
import '../ModelHomepage.css'

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
        this.state = defaultFilterState;
    }

    handleFilterUpdate() {
        this.props.updateFilters(this.state);
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
                <Button variant='primary' onClick={() => this.handleFilterUpdate()}>Submit</Button>
            </div>
        );
    }
} export default PetsFilters;
