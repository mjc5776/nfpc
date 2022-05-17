import React from 'react'
import CardItem from './CardItem'
import { motion } from 'framer-motion';
import '../Search/search.css';


const Cards = ({ playerID, playerName, contract }) => {
  console.log('## Player ID', playerID);
  console.log('Cards Render');
  return (
    <div>
        <div className="cards">
                  <motion.div className="img-wrap"
                    layout
                     whileHover={{ opacity: 1 }}
                  >
                     <ul className="">
                        <CardItem
                        src='\images\PlayerCard.jpg'
                        // text="Cheer Photo"
                        // label='Cheer'
                        path='/playerdetail'
                        playerName={playerName}
                        contract={contract}
                        id={playerID}
                        />
                     </ul>   
                </motion.div>
        </div>
    </div>
  )
}

export default Cards