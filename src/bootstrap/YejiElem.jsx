import React from 'react'
import { NavLink } from 'react-router-dom';

const YejiElem = (props) => {
    
  return (
    <div className='yeji-elem'>

        <NavLink to={'/detail/' + props.yeji.id}>
          <img  alt='예지' src={ require('../img/yeji_0'+ props.yeji.id +'.jpg') }></img>
        </NavLink>
        <h4>{ props.yeji.title }</h4>
        <p>{ props.yeji.content }</p>
        <p>{ props.yeji.price }원</p>
    </div>
  );
}




export default YejiElem;
