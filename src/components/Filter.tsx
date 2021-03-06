import React, { MouseEvent, FormEvent } from 'react';
import { FilterProps as IFilter } from '../types';

interface FilterProps {
  toggleFilter: (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  handleChangeFilter: (event: FormEvent<HTMLSelectElement>) => void;
  handleClearFilter: (event: MouseEvent<HTMLButtonElement>) => void;
  filter: IFilter;
}

export const Filter = ({
  toggleFilter,
  handleChangeFilter,
  handleClearFilter,
  filter: {
    filterBedrooms,
    filterBathrooms,
    filterCars,
    filterSort,
    priceTo,
    priceFrom
  }
}: FilterProps) => (
  <form className="filter">
    <div className="filterBox">
      <label htmlFor="filterBedrooms">Bedrooms</label>
      <select
        id="filterBedrooms"
        name="filterBedrooms"
        onChange={handleChangeFilter}
        value={filterBedrooms}
      >
        <option value="any">Any</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>
    <div className="filterBox">
      <label htmlFor="filterBathrooms">Bathrooms</label>
      <select
        id="filterBathrooms"
        name="filterBathrooms"
        value={filterBathrooms}
        onChange={handleChangeFilter}
      >
        <option value="any">Any</option>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
    </div>
    <div className="filterBox">
      <label htmlFor="filterCars">Car Spaces</label>
      <select
        id="filterCars"
        name="filterCars"
        value={filterCars}
        onChange={handleChangeFilter}
      >
        <option value="any">Any</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
    </div>
    <div className="filterBox filterFrom">
      <label htmlFor="priceFrom">Min Price</label>
      <select
        id="priceFrom"
        name="priceFrom"
        value={priceFrom}
        onChange={handleChangeFilter}
      >
        <option value="0">Any</option>
        <option value="500000">{500000}</option>
        <option value="600000">{600000}</option>
        <option value="700000">{700000}</option>
        <option value="800000">{800000}</option>
        <option value="900000">{900000}</option>
      </select>
    </div>
    <div className="filterBox">
      <label htmlFor="priceTo">Max Price</label>
      <select
        id="priceTo"
        name="priceTo"
        value={priceTo}
        onChange={handleChangeFilter}
      >
        <option value="1000001">Any</option>
        <option value="600000">{600000}</option>
        <option value="700000">{700000}</option>
        <option value="800000">{800000}</option>
        <option value="900000">{900000}</option>
        <option value="1000000">{1000000}</option>
      </select>
    </div>
    <div className="filterBox">
      <label htmlFor="filterSort">Order by</label>
      <select
        id="filterSort"
        name="filterSort"
        value={filterSort}
        onChange={handleChangeFilter}
      >
        <option value="any">Default</option>
        <option value="0">Price: - Low to High</option>
        <option value="1">Price: - High to Low</option>
      </select>
    </div>
    <div className="filterBox">
      <label>&nbsp;</label>
      <button className="btn-clear" onClick={handleClearFilter}>
        Clear
      </button>
    </div>
    <button className="btn-filter" type="button" onClick={toggleFilter}>
      <strong>X</strong>
      <span>Close</span>
    </button>
  </form>
);
