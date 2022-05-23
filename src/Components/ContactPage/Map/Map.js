import React from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.css'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = () => {

    const lat=59.955413
    const  lng=30.337844
    return (
        <div className='contactMap' style={{ height: '186px', marginTop: '20px' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDixoOe6wrfAs7rvOl0NroxnRfauUFMakU' }}
                defaultCenter={{lat: parseInt(lat), lng: parseInt(lng)}}
                defaultZoom={12}
            >
                <AnyReactComponent
                    lat={lat}
                    lng={lng}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
};

export default Map;