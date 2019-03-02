import React, { Fragment, MouseEvent, FormEvent } from 'react';
import jump from 'jump.js';
import { easeInOutCubic } from './utils/Easing';
import image from './icons/house-location-pin.svg';
import {
  AppProps,
  AppState,
  Property,
  BedroomsType,
  BathroomsType,
  CarsType,
  PriceFromType,
  PriceToType,
  FilterSortType,
  FilterProps
} from './types';
import data from './data/Data';
import { Card } from './components/Card';
import { GoogleMap } from './components/GoogleMap';
import { Header } from './components/Header';

const initialFilter: FilterProps = {
  filterBedrooms: BedroomsType.Any,
  filterBathrooms: BathroomsType.Any,
  filterCars: CarsType.Any,
  priceFrom: PriceFromType.Any,
  priceTo: PriceToType.Any,
  filterSort: FilterSortType.Any
};

class App extends React.Component<AppProps, AppState> {
  state = {
    properties: data.properties,
    activeProperty: data.properties[0],
    isVisibleFilter: false,
    filter: { ...initialFilter }
  };

  scrollToActive = (property: Property, scroll: Boolean = true): void => {
    if (scroll) {
      jump(`#card-${property.index}`, {
        duration: 1000,
        offset: -140,
        callback: undefined,
        easing: easeInOutCubic,
        a11y: false
      });
    }
  };

  filterProperty = (filter: FilterProps): Property[] => {
    const {
      filterBedrooms,
      filterBathrooms,
      filterCars,
      priceFrom,
      priceTo,
      filterSort
    } = filter;

    // Фильтрация
    let newProperties: Property[] = data.properties.filter(property => {
      let flag = true;
      if (filterBedrooms !== BedroomsType.Any) {
        const bedrooms = parseInt(filterBedrooms, 10);
        if (property.bedrooms !== bedrooms) {
          flag = false;
        }
      }

      if (filterBathrooms !== BathroomsType.Any) {
        const bathrooms = parseInt(filterBathrooms, 10);
        if (property.bathrooms !== bathrooms) {
          flag = false;
        }
      }

      if (filterCars !== CarsType.Any) {
        const cars = parseInt(filterCars, 10);
        if (property.carSpaces !== cars) {
          flag = false;
        }
      }

      if (priceFrom !== PriceFromType.Any) {
        const priceFromParse = parseInt(priceFrom, 10);
        if (property.price < priceFromParse) {
          flag = false;
        }
      }

      if (priceTo !== PriceToType.Any) {
        const priceToParse = parseInt(priceTo, 10);
        if (property.price > priceToParse) {
          flag = false;
        }
      }

      return flag;
    });

    // Сортировка
    if (filterSort !== FilterSortType.Any) {
      const sortToHigh: (a: Property, b: Property) => number = (a, b) =>
        a.price - b.price;
      const sortToLow: (a: Property, b: Property) => number = (a, b) =>
        b.price - a.price;
      if (filterSort === FilterSortType.LowToHigh) {
        newProperties = newProperties.sort(sortToHigh);
      } else if (filterSort === FilterSortType.HighToLow) {
        newProperties = newProperties.sort(sortToLow);
      }
    }

    return newProperties;
  };

  handleToggleFilter = (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ): void => {
    event.preventDefault();
    this.setState(prevState => ({
      isVisibleFilter: !prevState.isVisibleFilter
    }));
  };

  handleChangeFilter = (event: FormEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    this.setState((prevState: AppState) => {
      const filter: FilterProps = prevState.filter;
      if (filter[name] !== value) {
        const newFilter = {
          ...prevState.filter,
          [name]: value
        };
        const newProperty = this.filterProperty(newFilter);

        return {
          ...prevState,
          properties: newProperty,
          activeProperty: newProperty[0],
          filter: {
            ...prevState.filter,
            [name]: value
          }
        };
      }
      return null;
    });
  };

  handleClearFilter = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    this.setState(
      {
        filter: { ...initialFilter },
        properties: data.properties,
        activeProperty: data.properties[0]
      },
      () => {
        this.scrollToActive(data.properties[0], true);
      }
    );
  };

  handleSetActiveProperty = (
    property: Property,
    scroll: Boolean = true
  ): void => {
    this.setState(
      (prevState: AppState) => {
        if (prevState.activeProperty._id === property._id) {
          return null;
        }

        return {
          activeProperty: property
        };
      },
      () => {
        this.scrollToActive(property, scroll);
      }
    );
  };

  render() {
    const { properties, activeProperty, isVisibleFilter, filter } = this.state;

    return (
      <Fragment>
        <div className="listings">
          <Header
            image={image}
            isVisibleFilter={isVisibleFilter}
            toggleFilter={this.handleToggleFilter}
            handleChangeFilter={this.handleChangeFilter}
            handleClearFilter={this.handleClearFilter}
            filter={filter}
          />
          <div className="cards container">
            <div className="cards-list row ">
              {properties.map(property => (
                <Card
                  property={property}
                  key={property._id}
                  isActive={property._id === activeProperty._id}
                  setActive={() =>
                    this.handleSetActiveProperty(property, false)
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <GoogleMap
          properties={properties}
          activeProperty={activeProperty}
          setActive={this.handleSetActiveProperty}
        />
      </Fragment>
    );
  }
}

export default App;
