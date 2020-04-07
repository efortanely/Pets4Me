import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import Slider from '@material-ui/core/Slider'
import { ThemeProvider } from '@material-ui/core';
import { sliderTheme, SelectItem, selectifyDataArray } from '../ModelHomepageUtils'
import { CatsFiltersData } from '../../models/CatsFiltersData';

/*
    Name
    Indoor/outdoor
    Dog-friendly
    child friendly
    grooming level
    lifespan
*/
interface CatsFiltersState {
    nameInitial: string | undefined;
    doorsiness: string | undefined;
    dogLevel: number;
    childLevel: number;
    groomingLevel: number;
    lifespan_min: number;
    lifespan_max: number;
}
export class CatsFilters extends React.Component<CatsFiltersData, CatsFiltersState> {
    
    public doorsinessData = [
        {
            label: "Indoor",
            value: "Indoor"
        },
        {
            label: "Outdoor",
            value: "Outdoor"
        }]
    public nameData: SelectItem[] = [];
    
    constructor(props: CatsFiltersData) {
        super(props);
        selectifyDataArray(this.props.name_initials, this.nameData);
        this.maxDistance = this.props.max_distance;
        this.state = {
            species: undefined,
            gender: undefined,
            primaryBreed: undefined,
            secondaryBreed: undefined,
            color: undefined,
            size: undefined,
            age: undefined,
            distanceMax: 1000
        } as CatsFiltersState;
    }

    render() {
        return (
            <div className='filters'>
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                        Child friendly
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Bad cat no</Dropdown.Item>
                        <Dropdown.Item>Yes</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                        Dog friendly
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Hiss meow</Dropdown.Item>
                        <Dropdown.Item>Uh huh</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                        Indoor/outdoor
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Indoor</Dropdown.Item>
                        <Dropdown.Item>Outdoor</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                        Grooming level
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Hairy boi</Dropdown.Item>
                        <Dropdown.Item>Where's the fuzz??</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                        Name
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Abyssinian</Dropdown.Item>
                        <Dropdown.Item>Aegean</Dropdown.Item>
                        <Dropdown.Item>American Bobtail</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <ThemeProvider theme={sliderTheme}>
                    <div>
                        <h5>Lifespan</h5>
                        <Slider
                            defaultValue={[2,10]}
                            max={50}
                            valueLabelDisplay='auto'
                        />
                    </div>
                </ThemeProvider>
            </div>
        );
    }
} export default CatsFilters;