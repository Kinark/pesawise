import React from 'react';
import './styles.scss';

const Card = (props) => {
   const extraClasses = props.className ? props.className : '';
   return (
      <div className={extraClasses + " card cool"} style={props.style}>
      {props.children}
      </div>
   )
}
export default Card;