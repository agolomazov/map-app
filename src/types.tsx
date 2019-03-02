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

export enum BedroomsType {
  Any = 'any',
  One = '1',
  Two = '2',
  Three = '3'
}

export enum BathroomsType {
  Any = 'any',
  One = '1',
  Two = '2'
}

export enum CarsType {
  Any = 'any',
  Zero = '0',
  One = '1',
  Two = '2'
}

export enum PriceFromType {
  Any = '0',
  One = '500000',
  Two = '600000',
  Three = '700000',
  Four = '800000',
  Five = '900000'
}

export enum PriceToType {
  Any = '1000001',
  One = '600000',
  Two = '700000',
  Three = '800000',
  Four = '900000',
  Five = '1000000'
}

export enum FilterSortType {
  Any = 'any',
  LowToHigh = '0',
  HighToLow = '1'
}

export interface FilterProps {
  filterBedrooms: BedroomsType;
  filterBathrooms: BathroomsType;
  filterCars: CarsType;
  priceFrom: PriceFromType;
  priceTo: PriceToType;
  filterSort: FilterSortType;
  [key: string]: string;
}

export interface AppState {
  properties: Property[];
  activeProperty: Property;
  isVisibleFilter: boolean;
  filter: FilterProps;
}

export interface AppProps {
  title?: string;
}
