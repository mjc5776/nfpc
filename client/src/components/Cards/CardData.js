import React from 'react';
import { useState, useEffect } from 'react';
import '../Cards/card.css';

const CardData = ({ id }) => {
  const [ytdComp, setYTDComp] = useState(0);
  const [ytdApp, setYTDApp] = useState(0);
  const [rerender, setRerender] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  // Number formatter
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  
  const compRemaining = 32500 - ytdComp ;
  console.log('Appearance Render');

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(`${process.env.REACT_APP_HOST_NAME}/players/YTD/?param=${id}`,
      {
        signal: abortCont.signal,
      }
    )
      .then((res) => {
        //    console.log('Events response', res);
        if (!res.ok) {
          throw Error('Could not fetch event data');
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setError(null);
        formatter.format(setYTDComp(data[0].YTDComp));
        setYTDApp(data[0].Appearances)
        setRerender(true);
         console.log("Appearance Data", data);
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
    
  }, [rerender]);

  return (
    <>
      {isPending && <div>Loading...</div>}
      {ytdComp && (
        <>
        <div className='comp'>YTD: {ytdComp} </div>
        <div className='compRemain'> Remaining: {compRemaining}</div>
        <div className='ytdApp'> YTD Appearances: {ytdApp}</div>
        </>
      )}
    </>
  );
};

export default CardData;
