import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';
import '../PlayerHeader/PlayerHeader.css';

const PlayerHeader = () => {
  const [playerData, setPlayerData] = useState(null);
  const [fullName, setFullName] = useState();
  const [ytdComp, setYtdComp] = useState(0);
  const [availComp, setAvailComp] = useState(0);
  const [ytdAppear, setYtdAppear] = useState(0);
  const [isPending, setIsPending] = useState(true);
  const [dataLoad, setDataLoad] = useState(null);
  const [error, setError] = useState(null);

  const params = useParams();
  const paramID = params.id;

  console.log('Player Data', playerData);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(`${process.env.REACT_APP_HOST_NAME}/players/YTD/?param=${paramID}`, {
      signal: abortCont.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch data');
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setError(null);
        setDataLoad(true);
        setPlayerData(data);
        setFullName(data[0].FullName);
        setYtdComp(data[0].YTDComp);
        setAvailComp(data[0].CompMaxPerYear - data[0].YTDComp);
        setYtdAppear(data[0].Appearances);

        console.log('Player Data', playerData);

        {
          error && <div>{error}</div>;
        }
        {
          isPending && <div>Loading...</div>;
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });
    return () => abortCont.abort();
  }, [dataLoad]);

  return (
    <>
      <div className='Player-header'>
        <h1>{fullName}</h1>
        <h2>YTD Comp: {ytdComp}</h2>
        <h2>Comp Remaining: {availComp}</h2>
        <h2>Appearances: {ytdAppear}</h2>
      </div>
    </>
  );
};

export default PlayerHeader;
