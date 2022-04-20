import React from 'react';
import { Link } from 'react-router-dom';



const CardItem = ({ id, path, src, playerName, contract }) => {
  let fullpath = `${path}/${id}`;
  return (
    <>
      <li>
        <Link to={fullpath}>
          <figure className='cardColor'>
            <img src={src} alt='Card Image'/>
            <div className="top-right"> { contract && contract} </div>
            <div className="top-left">{playerName}</div> 
           
          </figure>
        </Link>
      </li>
      
    </>
  );
};

export default CardItem;
