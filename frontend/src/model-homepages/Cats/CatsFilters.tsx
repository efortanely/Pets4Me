import React from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button'
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
        this.state = {
            nameInitial: undefined,
            doorsiness: undefined,
            dogLevel: 0,
            childLevel: 0,
            groomingLevel: 0,
            lifespan_min: 0,
            lifespan_max: 30
        } as CatsFiltersState;
    }

    handleChange = (event: any, newValue: number | number[]) => {
        this.setState({dogLevel: newValue as number});
    };

    render() {
        return (
            <div className='filters'>
                <Select options={this.nameData} placeholder="Select a first letter..." isClearable={true}
                    onChange={(value: any) => this.setState({nameInitial: value?.value})} />
                <Select options={this.doorsinessData} placeholder="Indoor/outdoor?" isClearable={true}
                    onChange={(value: any) => this.setState({doorsiness: value?.value})} />

                <ThemeProvider theme={sliderTheme}>
                    <h5>Minimum dog-friendliness level</h5>
                    <Slider
                        defaultValue={[0]} max={5} valueLabelDisplay='auto'
                        onChange={(event: any, value: any) => this.setState({dogLevel: value[0]})}
                    />
                    <h5>Minimum child-friendliness level</h5>
                    <Slider
                        defaultValue={[0]} max={5} valueLabelDisplay='auto'
                        onChange={(event: any, value: any) => this.setState({childLevel: value[0]})}
                    />
                    <h5>Minimum grooming level</h5>
                    <Slider
                        defaultValue={[0]} max={5} valueLabelDisplay='auto'
                        onChange={(event: any, value: any) => this.setState({groomingLevel: value[0]})}
                    />
                    <h5>Lifespan</h5>
                    <Slider
                        defaultValue={[this.props.lifespan_min, this.props.lifespan_max]}
                        max={this.props.lifespan_max} valueLabelDisplay='auto'
                        onChange={(event: any, value: any) => this.setState({lifespan_min: value[0], lifespan_max: value[1]})}
                    />
                </ThemeProvider>
                <Button variant='primary' onClick={() => console.log("current filters:: ", this.state)}>Submit</Button>
            </div>
        );
    }
} export default CatsFilters;