import { createMuiTheme } from '@material-ui/core';

export const sliderTheme = createMuiTheme({
    overrides:{
      MuiSlider: {
        thumb:{
        color: "#581730"
        },
        track: {
          color: '#528C8B'
        },
        rail: {
          color: '#84747B',
          width: '100%',
        }
      }
  }});

export interface SelectItem {
    value: string;
    label: string;
}


export function selectifyDataArray(data: string[], selectList: SelectItem[]): void {
  data.forEach((datum: string) => selectList.push({
      value: datum,
      label: datum
  }));
}