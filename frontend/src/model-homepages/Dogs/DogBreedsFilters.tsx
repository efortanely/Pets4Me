import React from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Slider from '@material-ui/core/Slider'
import { DogBreedsFiltersData, DogBreedsFiltersState, defaultFilterState } from '../../models/DogBreedsFiltersData'
import { ThemeProvider } from '@material-ui/core';
import { sliderTheme, SelectItem, selectifyDataArray } from '../ModelHomepageUtils'

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
                <Select isMulti options={this.nameInitials} placeholder="Select a letter..." isClearable={true}
                onChange={(newFilters: any) => {
                    if (newFilters) {
                        this.setState({nameInitials: newFilters.map((selectItem: SelectItem) => {
                            return selectItem.value;
                        })});
                    } else {
                        this.setState({nameInitials: undefined});
                    }}} />
                <Select isMulti options={this.breedGroup} placeholder="Select a breed group..." isClearable={true}
                onChange={(newFilters: any) => {
                    if (newFilters) {
                        this.setState({breedGroup: newFilters.map((selectItem: SelectItem) => {
                            return selectItem.value;
                        })});
                    } else {
                        this.setState({breedGroup: undefined});
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

                <Button variant='primary' onClick={() => this.handleFilterUpdate()}>Submit</Button>
            </div>
        );
    }
} export default DogBreedsFilters;
