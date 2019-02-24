export interface Property {
  _id: string;
  index: number;
  price: number;
  picture: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
}

export interface AppState {
  properties: Property[];
  activeProperty: Property;
}

export interface AppProps {
  title?: string;
}
