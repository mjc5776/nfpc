import React from 'react';
import { Link } from 'react-router-dom';
 import CardData from './CardData';



const CardItem = ({ id, path, src, playerName, contract }) => {
  let fullpath = `${path}/${id}`;
  console.log('Card Item Render');
  return (
    <>
      <li>
        <Link to={fullpath}>
          <figure className='cardColor'>
            <img src={src} alt='Card Image'/>
            <div className="top-right"> { contract && contract} </div>
            <div className="top-left">{playerName}</div> 
           <div>
             {/* <CardData
              id={id}
              /> */}
           </div>
          </figure>
        </Link>
      </li>
      
    </>
  );
};

export default CardItem;
