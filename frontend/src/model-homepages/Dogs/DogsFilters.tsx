import React from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button'
import Slider from '@material-ui/core/Slider'
import { DogsFiltersData } from '../../models/DogsFiltersData'
import { ThemeProvider } from '@material-ui/core';
import { sliderTheme, SelectItem, selectifyDataArray } from '../ModelHomepageUtils'

interface DogsFiltersState {
  nameInitials: string | undefined;
  breedGroup: string | undefined;
  maxHeight: number;
  maxWeight: number;
  lifespanMin: number;
  lifespanMax: number;
  sortType: string | undefined;
  sortDir: string | undefined;
}

export class DogsFilters extends React.Component<DogsFiltersData, DogsFiltersState> {

    public sortData: SelectItem[] = [
        {label: "Name", value: "Name"},
        {label: "Height", value: "Height"},
        {label: "Weight", value: "Weight"},
        {label: "Breed group", value: "Breed group"}
    ]

    public genderData = [
        {
            label: "Female",
            value: "Female"
        },
        {
            label: "Male",
            value: "Male"
        }]
        public nameInitials: SelectItem[] = [];
        public breedGroup: SelectItem[] = [];

    constructor(props: DogsFiltersData) {
        super(props);
        selectifyDataArray(this.props.name_initials, this.nameInitials);
        selectifyDataArray(this.props.breed_group, this.breedGroup);
        this.state = {
            nameInitials: undefined,
            breedGroup: undefined,
            maxHeight: 100,
            maxWeight: 100,
            lifespanMin: 100,
            lifespanMax: 100,
            sortType: undefined,
            sortDir: undefined
        } as DogsFiltersState;
    }

render() {
    return (
        <div className='filters'>
            <Select options={this.sortData} placeholder="Sort by..." isClearable={true}
                    onChange={(value: any) => this.setState({sortType: value?.value})} />
            {/* React is tragically very stupid and this is the only way I could style it right*/}
            <div className='sort-buttons'>
                <div>
                <Button className='sort-buttons' variant='outline-secondary' onClick={(value: any) => this.setState({sortDir: "asc"})}>Ascending</Button>
                <Button className='sort-buttons' variant='outline-secondary' onClick={(value: any) => this.setState({sortDir: "desc"})}>Descending</Button>
                </div>
            </div>
            <Select options={this.nameInitials} placeholder="Select a letter..." isClearable={true}
                onChange={(value: any) => this.setState({nameInitials: value?.value})} />
            <Select options={this.breedGroup} placeholder="Select a breed group..." isClearable={true}
                onChange={(value: any) => this.setState({breedGroup: value?.value})} />

            <ThemeProvider theme={sliderTheme}>
                <h5>Height</h5>
                <Slider
                    defaultValue={0} max={this.props.max_height} valueLabelDisplay='auto'
                    onChange={(event: any, value: any) => this.setState({maxHeight: value})}
                />
            </ThemeProvider>
            <ThemeProvider theme={sliderTheme}>
                <h5>Weight</h5>
                <Slider
                    defaultValue={0} max={this.props.max_weight} valueLabelDisplay='auto'
                    onChange={(event: any, value: any) => this.setState({maxWeight: value})}
                />
            </ThemeProvider>
            <ThemeProvider theme={sliderTheme}>
                <h5>Lifespan</h5>
                <Slider
                    defaultValue={0} min={this.props.lifespan_min} max={this.props.lifespan_max} valueLabelDisplay='auto'
                    onChange={(event: any, value: any) => this.setState({lifespanMax: value})}
                />
            </ThemeProvider>

            <Button variant='primary' onClick={() => console.log("current filters:: ", this.state)}>Submit</Button>
        </div>
    );
}
} export default DogsFilters;
