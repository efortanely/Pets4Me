import React from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Slider from '@material-ui/core/Slider'
import { ThemeProvider } from '@material-ui/core';
import { sliderTheme, SelectItem, selectifyDataArray } from '../ModelHomepageUtils'
import { CatBreedsFiltersData } from '../../models/CatBreedsFiltersData';
import '../ModelHomepage.css'

interface CatBreedsFiltersState {
    nameInitials: string[] | undefined;
    doorsiness: string | undefined;
    dogLevel: number;
    childLevel: number;
    groomingLevel: number;
    minLifespan: number;
    maxLifespan: number;
    sortType: string | undefined;
    sortDir: string | undefined;
}

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

export class CatBreedsFilters extends React.Component<CatBreedsFiltersData, CatBreedsFiltersState> {

    public sortData: SelectItem[] = [
        {label: "Name", value: "Name"},
        {label: "Life span", value: "Life span"},
        {label: "Dog-friendliness", value: "Dog-friendliness"},
        {label: "Child-friendliness", value: "Child-friendliness"},
        {label: "Grooming level", value: "Grooming level"},
    ]

    public doorsinessData = [
        { label: "Indoor", value: "Indoor" },
        { label: "Outdoor", value: "Outdoor" }] as SelectItem[];

    public qualitativeQuantifier = [
        { label: "Low", value: 0 },
        { label: "Moderate", value: 2 },
        { label: "High", value: 4 }];

    public nameData: SelectItem[] = [];

    constructor(props: CatBreedsFiltersData) {
        super(props);
        selectifyDataArray(this.props.name_initials, this.nameData);
        this.state = {
            nameInitials: [],
            doorsiness: undefined,
            dogLevel: 0,
            childLevel: 0,
            groomingLevel: 0,
            minLifespan: 0,
            maxLifespan: 30,
            sortType: undefined,
            sortDir: undefined
        } as CatBreedsFiltersState;
    }

    handleChange = (event: any, newValue: number | number[]) => {
        this.setState({dogLevel: newValue as number});
    };

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
                <Select isMulti options={this.nameData} placeholder="Select a first letter..." isClearable={true}
                  onChange={(newFilters: any) => {
                      if (newFilters) {
                          this.setState({nameInitials: newFilters.map((selectItem: SelectItem) => {
                              return selectItem.value;
                          })});
                      } else {
                          this.setState({nameInitials: undefined});
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
                <Select options={this.doorsinessData} placeholder="Indoor/outdoor?" isClearable={true}
                    onChange={(value: any) => this.setState({doorsiness: value?.value})}
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

                <h5 className='slider-header'>Minimum dog-friendliness level</h5>
                <Select options={this.qualitativeQuantifier} isClearable={true}
                    onChange={(value: any) => this.setState({dogLevel: value?.value})}
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

                <h5>Minimum child-friendliness level</h5>
                <Select options={this.qualitativeQuantifier} isClearable={true}
                    onChange={(value: any) => this.setState({childLevel: value?.value})}
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

                <h5>Minimum grooming level</h5>
                <Select options={this.qualitativeQuantifier} isClearable={true}
                    onChange={(value: any) => this.setState({groomingLevel: value?.value})}
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

                <ThemeProvider theme={sliderTheme}>
                    <h5>Lifespan</h5>
                    <Slider
                        defaultValue={[this.props.lifespan_min, this.props.lifespan_max]}
                        min={this.props.lifespan_min} max={this.props.lifespan_max} valueLabelDisplay='auto'
                        onChange={(event: any, value: any) => this.setState({minLifespan: value[0], maxLifespan: value[1]})}
                    />
                </ThemeProvider>
                <Button variant='primary' onClick={() => console.log("current filters:: ", this.state)}>Submit</Button>
            </div>
        );
    }
} export default CatBreedsFilters;
