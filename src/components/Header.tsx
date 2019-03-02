import React, { MouseEvent, FormEvent } from 'react';
import { FilterProps } from '../types';
import { Filter } from './Filter';

interface HeaderProps {
  image?: string;
  isVisibleFilter: boolean;
  filter: FilterProps;
  toggleFilter: (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  handleChangeFilter: (event: FormEvent<HTMLSelectElement>) => void;
  handleClearFilter: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const Header = ({
  image,
  isVisibleFilter,
  toggleFilter,
  handleChangeFilter,
  handleClearFilter,
  filter
}: HeaderProps) => (
  <header className={`${isVisibleFilter ? 'filter-is-visible' : ''}`}>
    <Filter
      toggleFilter={toggleFilter}
      handleChangeFilter={handleChangeFilter}
      handleClearFilter={handleClearFilter}
      filter={filter}
    />
    <img src={image} />
    <h1>Property Listings</h1>
    <button className="btn-filter" onClick={toggleFilter}>
      Filter
    </button>
  </header>
);
