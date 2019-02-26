import React, { Component } from 'react';
import { Property } from '../types';

interface GMapProps {
  properties: Property[];
  activeProperty: Property;
  setActive: (property: Property) => void;
}

interface GMapState {
  infvW: Map<string, google.maps.InfoWindow>;
  activeTooltype: google.maps.InfoWindow;
  markers: Map<string, google.maps.Marker>;
  map?: google.maps.Map;
}

export class GoogleMap extends Component<GMapProps, GMapState> {
  state = {
    infvW: new Map(),
    activeTooltype: new google.maps.InfoWindow(),
    markers: new Map()
  };

  mapRef: HTMLDivElement | null = null;

  static getDerivedStateFromProps(props: GMapProps, state: GMapState) {
    const { activeProperty } = props;
    let { activeTooltype, map, infvW, markers } = state;
    if (activeProperty) {
      activeTooltype.close();
      const newActiveProperty = infvW.get(`${activeProperty._id}`);
      if (newActiveProperty) {
        const marker = markers.get(`${activeProperty._id}`);
        newActiveProperty.open(map, marker);

        return {
          ...state,
          activeTooltype: newActiveProperty
        };
      }
      return null;
    }

    return null;
  }

  componentDidMount() {
    const { longitude, latitude } = this.props.activeProperty;
    const { properties } = this.props;
    const map: google.maps.Map = new google.maps.Map(this.mapRef, {
      center: { lat: latitude, lng: longitude },
      mapTypeControl: false,
      zoom: 15
    });
    this.setState({
      map
    });
    this.createMarkers(properties, map);
  }

  createMarkers = (properties: Property[], map: google.maps.Map) => {
    let { infvW, activeTooltype, markers } = this.state;
    properties.map(property => {
      const { longitude, latitude, index } = property;
      const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        label: {
          color: '#ffffff',
          text: `${index + 1}`
        },
        icon: {
          url:
            'http://icons.iconarchive.com/icons/paomedia/small-n-flat/48/map-marker-icon.png'
        }
      });

      markers.set(`${property._id}`, marker);

      const iw: google.maps.InfoWindow = new google.maps.InfoWindow({
        content: `<h1>${property.address}</h1>`
      });

      infvW.set(property._id, iw);
      marker.addListener('click', () => {
        this.props.setActive(property);
        activeTooltype.close();
        activeTooltype = infvW.get(property._id);
        activeTooltype.open(map, marker);
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
