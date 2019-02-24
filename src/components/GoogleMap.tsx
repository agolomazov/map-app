import React, { Component } from 'react';
import { Property } from '../types';

interface GMapProps {
  properties: Property[];
  activeProperty: Property;
  setActive: (property: Property) => void;
}

interface GMapState {
  markers: Map<string, google.maps.InfoWindow>;
}

export class GoogleMap extends Component<GMapProps, GMapState> {
  state = {
    markers: new Map()
  };

  mapRef: HTMLDivElement | null = null;
  marker: google.maps.Marker | null = null;

  componentDidMount() {
    const { longitude, latitude } = this.props.activeProperty;
    const { properties } = this.props;
    const map: google.maps.Map = new google.maps.Map(this.mapRef, {
      center: { lat: latitude, lng: longitude },
      mapTypeControl: false,
      zoom: 15
    });
    this.createMarkers(properties, map);
  }

  createMarkers = (properties: Property[], map: google.maps.Map) => {
    const { markers } = this.state;
    const { activeProperty } = this.props;
    const activePropertyIndex: number = activeProperty.index;
    properties.map(property => {
      const { longitude, latitude, index } = property;
      this.marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        label: {
          color: '#ffffff',
          text: `${index + 1}`
        },
        icon: {
          url:
            'http://www.clker.com/cliparts/k/D/K/I/2/T/map-pin-blue.svg.thumb.png',
          size: new google.maps.Size(60, 90),
          origin: new google.maps.Point(0, -15)
        }
      });

      const iw: google.maps.InfoWindow = new google.maps.InfoWindow({
        content: `<h1>${property.address}</h1>`
      });

      markers.set(property._id, iw);
      this.marker.addListener('click', () => {
        this.props.setActive(property);
      });
    });
  };

  render() {
    return (
      <div className="mapContainer">
        <div id="map" ref={el => (this.mapRef = el)} />
      </div>
    );
  }
}
