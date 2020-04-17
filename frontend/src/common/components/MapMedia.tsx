import React from 'react'
import ReactMapboxGl, { Layer, Popup, Marker } from 'react-mapbox-gl';
import "./MapMedia.css"
import "./mapbox-gl.css"

interface MapMediaProps { 
  address: string;
  postcode: number;
  country: string;
}

interface MapMediaState {
  long: number;
  lat: number;
  zoom: number;
}

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZGVhbnRvcmtlbHNvbiIsImEiOiJjazhienAxZDQwZWdpM2VxYzI2bWs0bWFvIn0.50o7Qc543TVjRT5XaXbFpA'
});


class MapMedia extends React.Component<MapMediaProps, MapMediaState> {

  mapContainer: any;
  DEFAULT_LONG = -97.7357368;
  DEFAULT_LAT = 30.2853668;
  usingPostcode: boolean = false;

  constructor(props: MapMediaProps) {
    super(props);
    // Default to the GDC
    this.state = {
      long: this.DEFAULT_LONG,
      lat: this.DEFAULT_LAT,
      zoom: 12
    };
  }

  componentDidUpdate(prevProps: MapMediaProps) {
    if (this.props !== prevProps) {
      let address = this.props.address.replace(/[, ]/g, '+')
      let nominatimUrl = "https://nominatim.openstreetmap.org/?q="+address+"&format=json&limit=1";
      fetch(nominatimUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(res => {
        res.json()
        .then((data) => {
          if (data.length !== 0) {
            this.setState({
              lat: data[0].lat,
              long: data[0].lon
            });
          } else {
            this.usingPostcode = true;
            this.getPostcodeData();
          }
        })
      })
    }
  }

  getPostcodeData() {
    let address = (this.props.postcode + " " + this.props.country).replace(/[, ]/g, '+')
    let nominatimUrl = "https://nominatim.openstreetmap.org/?q="+address+"&format=json&limit=1";
    fetch(nominatimUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      res.json()
      .then((data) => {
        if (data.length !== 0) {
          this.setState({
            lat: data[0].lat,
            long: data[0].lon
          });
        }
      });
    })
  }

  usingDefaults(): boolean {
    return this.state.lat === this.DEFAULT_LAT && this.state.long === this.DEFAULT_LONG;
  }

  getPopupText(): string {
    if (this.usingPostcode) {
      return "Shelter location (approximate)";
    } else if (this.usingDefaults()) {
      return "Home of Pets4me";
    } else {
      return "Shelter location";
    }
  }

  render() {
    return (
      <div>
        <Map
          // eslint-disable-next-line
          style={"mapbox://styles/mapbox/streets-v9"}
          center={[this.state.long, this.state.lat]}
          containerStyle={{
            height: '250px',
            width: '100%'
          }}>
          <Layer type="symbol" id="marker" layout={{ 'icon-image': 'dog-park-11' }}>
            <Marker
              className="marker"
              coordinates={[this.state.long, this.state.lat]}
              anchor="bottom">
                <img alt='' src={''}/>
            </Marker>
          </Layer>
          { <Popup
            coordinates={[this.state.long,this.state.lat]}
            offset={[0, -6]}>
            <h5>{this.getPopupText()}</h5>
          </Popup>}
        </Map>
        { this.usingDefaults() &&
        <div className='error'>Uh-oh! We encountered an error trying to display the map for this shelter. Displaying default location instead.</div>}
      </div>)
  }
}

export default MapMedia
