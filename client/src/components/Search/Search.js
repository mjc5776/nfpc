import React, { useState } from 'react';
import SearchList from './SearchList';
import { MDBInput, MDBContainer } from 'mdb-react-ui-kit';

function Search({ data }) {
  const [searchField, setSearchField] = useState('');

   //console.log('Search Data', data);
  console.log('Search Render');
  const filteredPlayers = data.filter((player) => {
    return player.FullName.toLowerCase().includes(
      searchField.toLowerCase()
    );
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  function searchList() {
    return (
        <SearchList filteredPlayers={filteredPlayers} />
    );
  }

  return (
    <div>
      <MDBContainer>
        <MDBInput type='text' label='Search' onChange={handleChange} />
      </MDBContainer>
      {searchList()}
    </div>
  );
}

export default Search;
