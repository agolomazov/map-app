import React from 'react';
import classnames from 'classnames';
import { Property } from '../types';

interface CardProps {
  property: Property;
  isActive?: boolean;
  setActive: () => void;
}

export const Card = (props: CardProps) => {
  const {
    isActive,
    setActive,
    property: {
      _id,
      picture,
      city,
      index,
      address,
      bedrooms,
      bathrooms,
      carSpaces
    }
  } = props;
  return (
    <div
      id={`card-${index}`}
      className={classnames({
        card: true,
        'col-sm-12': true,
        'col-md-6': true,
        'col-lg-4': true,
        'is-active': isActive
      })}
      onClick={setActive}
    >
      <img src={picture} alt={city} />
      <p className="price">$937,180</p>
      <div className="details">
        <span className="index">{index + 1}</span>
        <p className="location">
          {city}
          <br />
          {address}
        </p>
        <ul className="features">
          <li className="icon-bed">
            &nbsp;{bedrooms}
            <span>bedrooms</span>
          </li>
          <li className="icon-bath">
            &nbsp;{bathrooms}
            <span>bathrooms</span>
          </li>
          <li className="icon-car">
            &nbsp;{carSpaces}
            <span>parking spots</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
