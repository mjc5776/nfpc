import { useState, useEffect } from 'react';
import Search from '../Search/Search';
import { MDBNavbar, MDBContainer, MDBAlert } from 'mdb-react-ui-kit';
import '../PlayerList/playerList.css';

const Players = () => {

    const [playerData, setPlayerData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController();
          fetch(`${process.env.REACT_APP_HOST_NAME}/Players`, { 
            signal: abortCont.signal,
    
           })
              .then(res => {
                   console.log('Events response', res);
                  if(!res.ok) {
                    throw Error('Could not fetch event data')  
                  }
                  return res.json()
              })
              .then(data => { 
                setIsPending(false)
                setError(null)
                setPlayerData(data)
                console.log("player data", data);
                { error && <div>{ error }</div>}
                { isPending && <div>Loading...</div>}
              })
              .catch(err => {
                if (err.name === 'AbortError') {
                  console.log('fetch aborted');
                }else {
                  setIsPending(false)
                  setError(err.message)
                }       
              })
        return () => abortCont.abort();
      }, []);

  return (
    <div>
      <div className='title'>
        <div className='dashTitle'>Players</div>
      </div>
      {error && 
      <MDBNavbar expand='lg' sticky>
      <MDBContainer>
      <MDBAlert show className='w-100' color='danger'>
       Error: {error}
      </MDBAlert>
      </MDBContainer>
      </MDBNavbar>}
      {isPending && <div>Loading...</div>}
      { playerData && <Search data={playerData} />}
    </div>
  )
}

export default Players