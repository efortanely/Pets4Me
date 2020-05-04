import { createMuiTheme } from '@material-ui/core';

export interface SelectItem {
  value: string;
  label: string;
}

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

export function selectifyDataArray(data: string[], selectList: SelectItem[]): void {
  data.forEach((datum: string) => selectList.push({
      value: datum,
      label: datum
  }));
}

export const getPostcodeOrDefault = (postcode: number) => {
  if (postcode > 9999 && postcode < 100000) 
      return postcode;
  return 78705;
}
