import React from 'react'
import ReactMapboxGl, { Layer, Popup, Marker } from 'react-mapbox-gl';
import "./MapMedia.css"
import "./mapbox-gl.css"

interface MapMediaProps { 
  address: string;
  postcode: number;
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
          }
        })
      })
    }
  }

  getPostcodeMap() {
    let nominatimUrl = "https://nominatim.openstreetmap.org/?q="+this.props.postcode+"&format=json&limit=1";
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
  
  createMap() {
    // Currently disabled because Markers are screwy
    /* let marker = new mapboxgl.Marker().setLngLat({
      lat: this.state.lat,
      lng: this.state.long
    }).addTo(map);
    map.scrollZoom.disable(); */
  }

  render() {
    
    return (
      <div>
        <Map
          style={"mapbox://styles/mapbox/streets-v9"}
          center={[this.DEFAULT_LONG, this.DEFAULT_LAT]}
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
        >
          <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
            <Marker
              className="marker"
              coordinates={[this.DEFAULT_LONG, this.DEFAULT_LAT]}
              anchor="bottom">
            </Marker>
            <img src={''}/>
          </Layer>
          <Popup
            coordinates={[this.DEFAULT_LONG,this.DEFAULT_LAT]}>
            <h5>Shelter location</h5>
          </Popup>
        </Map>
        {this.state.lat === this.DEFAULT_LAT && this.state.long === this.DEFAULT_LONG && 
        <div className='error'>Uh-oh! We encountered an error trying to display the map for this shelter. Displaying default location instead.</div>}
      </div>)
  }
}

export default MapMedia