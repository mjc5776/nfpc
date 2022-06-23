import { useState, useEffect } from 'react';
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBBtn,
} from 'mdb-react-ui-kit';
import Navbar from '../Nav/Navbar';

const PendingRequest = () => {
  const [requestData, setRequestData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(`${process.env.REACT_APP_HOST_NAME}/player/request/pending`, {
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
        setRequestData(data);

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
  }, []);

  return (
   
    <>
      <Navbar />
      <h2>Pending Requests</h2>
      <hr />
      <MDBContainer>
      <MDBTable striped>
        <MDBTableHead>
          <tr>
            <th></th>
            <th scope='col'>Date</th>
            <th scope='col'>Player Name</th>
            <th scope='col'>Request Type</th>
            <th scope='col'>Description</th>
            <th scope='col'>Location</th>
            <th scope='col'>Date</th>
            <th scope='col'>Time</th>
            <th scope='col'>Compensation</th>
            <th scope='col'></th>
            <th scope='col'></th>
            
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {requestData.map((row, index) => (
            <tr key={row.RequestID}>
              <td className='row-data'>{index + 1}</td>
              <td className=''>{row.RequestDate}</td>
              <td className='row-data'>{row.PlayerName}</td>
              <td className='row-data'>{row.PDType}</td>
              <td className=''>{row.ReqDescription}</td>
              <td className=''>{row.PDLocation}</td>
              <td className=''>{row.PDDate}</td>
              <td className=''>{row.PDTime}</td>
              <td className=''>{row.FMV}</td>
              <td>
                <MDBBtn>Approve</MDBBtn>
              </td>
              <td>
                <MDBBtn>Deny</MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      </MDBContainer>
    </>
     
  );
};

export default PendingRequest;
