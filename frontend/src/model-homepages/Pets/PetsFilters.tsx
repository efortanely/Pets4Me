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

const customStyles = {
    control: (base: any, state: { isFocused: any; }) => ({
        ...base,
        borderColor: state.isFocused ? "#D3D3D3" : "#D3D3D3",
        boxShadow: null,
        "&:hover": {
        borderColor: "none"
        }
    })
  };

export class PetsFilters extends React.Component<PetsFiltersData, PetsFiltersState> {

    public sortData: SelectItem[] = [
        {label: "Primary breed", value: "Primary breed"},
        {label: "Secondary breed", value: "Secondary breed"},
        {label: "Shelter", value: "Shelter"},
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
    public dogBreedData: SelectItem[] = [];
    public catBreedData: SelectItem[] = [];
    public colorData: SelectItem[] = [];
    public sizeData: SelectItem[] = [];
    public ageData: SelectItem[] = [];

    constructor(props: PetsFiltersData) {
        super(props);
        selectifyDataArray(this.props.dogBreeds, this.dogBreedData);
        selectifyDataArray(this.props.catBreeds, this.catBreedData);
        selectifyDataArray(this.props.colors, this.colorData);
        selectifyDataArray(this.props.sizes, this.sizeData);
        selectifyDataArray(this.props.ages, this.ageData);
        this.state = defaultFilterState;
    }

    handleFilterUpdate() {
        this.props.updateFilters(this.state);
    }

    getBreedData() {
        if (this.state.species === "Dog") {
            return this.dogBreedData;
        } else {
            return this.catBreedData;
        }
    }

    
    breedPlaceholderText(importance: string) {
        if (!this.state.species) {
            return "Please select a species first."
        } else {
            return `Select a ${importance} ${this.state.species} species...`
        }
    }

    render() {
        return (
            <div className='filters'>
                <Select options={this.sortData} placeholder="Sort by..." isClearable={true}
                    onChange={(value: any) => this.setState({sortType: value?.value})}
                    styles={customStyles}
                    theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: '#966a7d',
                          primary: '#581730',
                          primary50: '#966a7d'
                        },
                    })}
                    />
                {/* React is tragically very stupid and this is the only way I could style it right*/}
                <div className="sort-button-group">
                    <ToggleButtonGroup type="radio" name="sortOrder" defaultValue={2}>
                        <ToggleButton value={1} onClick={(value: any) => this.setState({sortDir: "asc"})}>Ascending</ToggleButton>
                        <ToggleButton value={2} onClick={(value: any) => this.setState({sortDir: "desc"})}>Descending</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <Select options={this.speciesData} placeholder="Select a species..." isClearable={true}
                    onChange={(value: any) => this.setState({species: value?.value})}
                    styles={customStyles}
                    theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                        ...theme.colors,
                        primary25: '#966a7d',
                        primary: '#581730',
                        primary50: '#966a7d'
                        },
                    })}
                    />
                <Select isMulti isDisabled={!this.state.species} options={this.getBreedData()} placeholder={this.breedPlaceholderText("primary")} isClearable={true}
                    onChange={(newFilters: any) => {
                        if (newFilters) {
                            this.setState({primaryBreed: newFilters.map((selectItem: SelectItem) => {
                                return selectItem.value;
                            })});
                        } else {
                            this.setState({primaryBreed: []});
                        }}}
                        styles={customStyles}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                            ...theme.colors,
                            primary25: '#966a7d',
                            primary: '#581730',
                            primary50: '#966a7d',
                            dangerLight: '#966a7d',
                            danger: '#581730',
                            neutral10: '#966a7d',
                            neutral20: '#966a7d',
                            },
                        })}
                        />
                <Select isMulti isDisabled={!this.state.species} options={this.getBreedData()} placeholder={this.breedPlaceholderText("secondary")} isClearable={true}
                    onChange={(newFilters: any) => {
                        if (newFilters) {
                            this.setState({secondaryBreed: newFilters.map((selectItem: SelectItem) => {
                                return selectItem.value;
                            })});
                        } else {
                            this.setState({secondaryBreed: []});
                        }}}
                        styles={customStyles}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                            ...theme.colors,
                            primary25: '#966a7d',
                            primary: '#581730',
                            primary50: '#966a7d',
                            dangerLight: '#966a7d',
                            danger: '#581730',
                            neutral10: '#966a7d',
                            neutral20: '#966a7d',
                            },
                        })}
                        />
                <Select options={this.genderData} placeholder="Select a gender..." isClearable={true}
                    onChange={(value: any) => this.setState({gender: value?.value})}
                    styles={customStyles}
                    theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                        ...theme.colors,
                        primary25: '#966a7d',
                        primary: '#581730',
                        primary50: '#966a7d',
                        dangerLight: '#966a7d',
                        danger: '#581730',
                        neutral10: '#966a7d',
                        neutral20: '#966a7d',
                        },
                    })}
                    />
                <Select isMulti options={this.colorData} placeholder="Select a color..." isClearable={true}
                    onChange={(newFilters: any) => {
                        if (newFilters) {
                            this.setState({color: newFilters.map((selectItem: SelectItem) => {
                                return selectItem.value;
                            })});
                        } else {
                            this.setState({color: []});
                        }}}
                        styles={customStyles}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                            ...theme.colors,
                            primary25: '#966a7d',
                            primary: '#581730',
                            primary50: '#966a7d',
                            dangerLight: '#966a7d',
                            danger: '#581730',
                            neutral10: '#966a7d',
                            neutral20: '#966a7d',
                            },
                        })}
                        />
                <Select isMulti options={this.sizeData} placeholder="Select a size..." isClearable={true}
                    onChange={(newFilters: any) => {
                        if (newFilters) {
                            this.setState({size: newFilters.map((selectItem: SelectItem) => {
                                return selectItem.value;
                            })});
                        } else {
                            this.setState({size: []});
                        }}} 
                        styles={customStyles}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                            ...theme.colors,
                            primary25: '#966a7d',
                            primary: '#581730',
                            primary50: '#966a7d',
                            dangerLight: '#966a7d',
                            danger: '#581730',
                            neutral10: '#966a7d',
                            neutral20: '#966a7d',
                            },
                        })}
                        />
                <Select isMulti options={this.ageData} placeholder="Select an age..." isClearable={true}
                    onChange={(newFilters: any) => {
                    if (newFilters) {
                        this.setState({age: newFilters.map((selectItem: SelectItem) => {
                            return selectItem.value;
                        })});
                    } else {
                        this.setState({age: []});
                    }}}
                    styles={customStyles}
                    theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                        ...theme.colors,
                        primary25: '#966a7d',
                        primary: '#581730',
                        primary50: '#966a7d',
                        dangerLight: '#966a7d',
                        danger: '#581730',
                        neutral10: '#966a7d',
                        neutral20: '#966a7d',
                        },
                    })}
                    />
                <ThemeProvider theme={sliderTheme}>
                    <h5>Distance</h5>
                    <Slider
                        defaultValue={0} max={this.props.max_distance} valueLabelDisplay='auto'
                        onChange={(event: any, value: any) => this.setState({distanceMax: value})}
                    />
                </ThemeProvider>
                <Button className="submit" variant='primary' onClick={() => this.handleFilterUpdate()}>Submit</Button>
            </div>
        );
    }
} export default PetsFilters;
