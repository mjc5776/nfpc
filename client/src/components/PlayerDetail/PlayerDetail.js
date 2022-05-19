import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RequestHistory from '../Requests/RequestHistory';
import PlayerHeader from '../PlayerHeader/PlayerHeader';
import Navbar from '../Nav/Navbar';

const PlayerDetail = () => {
  const params = useParams();
  const paramID = params.id;
  

  return (
    <>
      <Navbar
        id={paramID}
    />
      <PlayerHeader
        id={paramID}
      />
      <RequestHistory
        id={paramID}
      />
    </>
  );
};

export default PlayerDetail;
