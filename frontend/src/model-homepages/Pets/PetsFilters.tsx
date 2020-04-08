import React from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button'
import Slider from '@material-ui/core/Slider'
import { PetsFiltersData } from '../../models/PetsFiltersData'
import { ThemeProvider } from '@material-ui/core';
import { sliderTheme, SelectItem, selectifyDataArray } from '../ModelHomepageUtils'

interface PetsFiltersState {
    species: string | undefined;
    gender: string | undefined;
    primaryBreed: string | undefined;
    secondaryBreed: string | undefined;
    color: string | undefined;
    size: string | undefined;
    age: string | undefined;
    distanceMax: number;
}

export class PetsFilters extends React.Component<PetsFiltersData, PetsFiltersState> {

    public speciesData = [
        {
            label: "Cat",
            value: "Cat"
        },
        {
            label: "Dog",
            value: "Dog"
        }]
    public genderData = [
        {
            label: "Female",
            value: "Female"
        },
        {
            label: "Male",
            value: "Male"
        }]
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
            primaryBreed: undefined,
            secondaryBreed: undefined,
            color: undefined,
            size: undefined,
            age: undefined,
            distanceMax: 1000
        } as PetsFiltersState;
    }

    

    render() {
        return (
            <div className='filters'>
                <Select options={this.speciesData} placeholder="Select a species..." isClearable={true}
                    onChange={(value: any) => this.setState({species: value?.value})} />
                <Select options={this.genderData} placeholder="Select a gender..." isClearable={true}
                    onChange={(value: any) => this.setState({gender: value?.value})} />
                <Select options={this.breedData} placeholder="Select a primary breed..." isClearable={true}
                    onChange={(value: any) => this.setState({primaryBreed: value?.value})} />
                <Select options={this.breedData} placeholder="Select a secondary breed..." isClearable={true}
                    onChange={(value: any) => this.setState({secondaryBreed: value?.value})} />
                <Select options={this.colorData} placeholder="Select a color..." isClearable={true}
                    onChange={(value: any) => this.setState({color: value?.value})} />
                <Select options={this.sizeData} placeholder="Select a size..." isClearable={true}
                    onChange={(value: any) => this.setState({size: value?.value})} />
                <Select options={this.ageData} placeholder="Select an age..." isClearable={true}
                    onChange={(value: any) => this.setState({age: value?.value})} />
                <ThemeProvider theme={sliderTheme}>
                    <h5>Distance</h5>
                    <Slider
                        defaultValue={0} max={this.props.max_distance} valueLabelDisplay='auto'
                        onChange={(event: any, value: any) => this.setState({distanceMax: value})}
                    />
                </ThemeProvider>
                <Button variant='primary' onClick={() => console.log("current filters:: ", this.state)}>Submit</Button>
            </div>
        );
    }
} export default PetsFilters;