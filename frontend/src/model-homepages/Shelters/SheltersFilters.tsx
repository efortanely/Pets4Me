import React from 'react';
import Slider from '@material-ui/core/Slider'
import Select from 'react-select';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { SheltersFiltersData } from '../../models/SheltersFiltersData'
import { ThemeProvider } from '@material-ui/core';
import { sliderTheme, SelectItem, selectifyDataArray } from '../ModelHomepageUtils'

interface SheltersFiltersState {
    city: string | undefined;
    postcode: string | undefined;
    state: string | undefined;
    distanceMax: number;
    shelterWithSpecies: string | undefined;
}
/*
City (dropdown [bonus - with search])
Postcode (Text entry)
State (dropdown)
Distance from given postcode (slider)
Shelter has cats/dogs (dropdown)
*/

export class SheltersFilters extends React.Component<SheltersFiltersData, SheltersFiltersState> {

    public cityData: SelectItem[] = [];
    public stateData: SelectItem[] = [];
    public speciesData = [
        {
            label: "Cat",
            value: "Shelter has cats"
        },
        {
            label: "Dog",
            value: "Shelter has dogs"
        }]

    constructor(props: SheltersFiltersData) {
        super(props);
        selectifyDataArray(this.props.cities, this.cityData);
        selectifyDataArray(this.props.states, this.stateData);
        this.state = {
            city: undefined,
            postcode: undefined,
            state: undefined,
            distanceMax: 1000,
            shelterWithSpecies: undefined
        }
    }

    render() {
        return (
            <div className='filters'>
                <Select options={this.cityData} placeholder="Select a city..." isClearable={true}
                    onChange={(value: any) => this.setState({city: value?.value})} />
                <Select options={this.stateData} placeholder="Select a state..." isClearable={true}
                    onChange={(value: any) => this.setState({state: value?.value})} />
                <Form className="postcode">
                    <Form.Group controlId="postcode">
                        <Form.Control type="number" placeholder="Enter a postcode..." />
                    </Form.Group>
                </Form>
                <Select options={this.speciesData} placeholder="Select a species..." isClearable={true}
                    onChange={(value: any) => this.setState({shelterWithSpecies: value?.value})} />
                <ThemeProvider theme={sliderTheme}>
                    <h5>Distance from your postcode (miles)</h5>
                    <Slider
                        defaultValue={0} max={300} valueLabelDisplay='auto'
                        onChange={(event: any, value: any) => this.setState({distanceMax: value})}
                    />
                </ThemeProvider>
            <Button variant='primary' onClick={() => console.log("current filters:: ", this.state)}>Submit</Button>
            </div>
        );
    }
} export default SheltersFilters;