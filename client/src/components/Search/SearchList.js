import { useState } from 'react';
import Cards from '../Cards/Cards';
import './search.css';


function SearchList({ filteredPlayers }) {
  console.log('##Filtered Players', filteredPlayers);
  console.log('Search List Render');
  return (
    <div className="img-grid">
      {filteredPlayers && filteredPlayers.map(data => (
        <Cards
                playerID={data.PlayerID}
                playerName={data.FullName}
                contract={data.RookieContract}
                key={data.PlayerID}
              />
      ))}
      
    </div>
  )
}

export default SearchList;