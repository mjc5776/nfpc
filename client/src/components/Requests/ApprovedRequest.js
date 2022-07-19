import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBBtn,
  MDBDatepicker,
  MDBInput,
} from 'mdb-react-ui-kit';
import Navbar from '../Nav/Navbar';

const ApprovedRequest = () => {
  const [requestData, setRequestData] = useState([]);
  const [pdDate, setPDDate] = useState();
  const [chkNum, setChkNum] = useState();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(`${process.env.REACT_APP_HOST_NAME}/player/request/approved`, {
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

  const handlePDDate=(pdDate) => {
    const PDDate = moment(pdDate, "MM-DD-YYYY")
    setPDDate(PDDate);
}

const savePayment = () => {
  console.log('Save Payment');

axios.post(`${process.env.REACT_APP_HOST_NAME}/request/approved/payment`, {
    
    RequestID: requestID,
    PlayerID: playerID,
    Compensation: playerComp,
    CompValue: compValue,
    CompDate: compDate,
    ChkNbr: chkNumber
    
  })
  .then(response => {
    console.log('Response', response);
    setRequestData(response.data);
})
    .then(history.goBack())
    .catch(error => {
        setError({ errorMessage: error.message });
        console.error('There was an error!', error);
    });

};

  return (
    
    <>
      <Navbar />
      <h2>Approved Requests</h2>
      <hr />
      <MDBContainer>
      <MDBTable striped>
        <MDBTableHead>
          <tr>
            <th></th>
            <th scope='col'>Request Date</th>
            <th scope='col'>Date of Service</th>
            <th scope='col'>Check Date</th>
            <th scope='col'>Requested By</th>
            <th scope='col'>Check Amount</th>
            <th scope='col'>Check Number</th>
            <th scope='col'>Payable To</th>
            <th scope='col'>Account #</th>
            {/* <th scope='col'>Approved By</th> */}
            <th scope='col'></th>
            <th scope='col'></th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {requestData.map((row, index) => (
            <tr key={row.RequestID}>
              <td className='row-data'>{index + 1}</td>
              <td className=''>{row.RequestDate}</td>
              <td className='row-data'>{row.PDDate}</td>
              <td className='row-data'>
              <MDBDatepicker 
                    format='mm/dd/yyyy' 
                    inputToggle
                    inputLabel='Date'
                    onChange={handlePDDate} 
                    />

              </td>
              <td className='row-data'>{row.RequestUser}</td>
              <td className=''>{row.FMV}</td>
              <td className=''>
              <MDBInput
                id="acctNum"
                onChange={(e) => {
                    const chkNum = e.target.value;
                    setChkNum(chkNum);
                }}
                />
              </td>

              <td className=''>{row.PlayerName}</td>
              <td className=''>{row.AcctNum}</td>
              {/* <td className=''>{row.ApprovedBy}</td> */}
              <td className=''>
                <MDBBtn
                  className='mb-4'
                  onClick={() => savePayment()}
            >
              Save
            </MDBBtn>
              </td>
              <td className=''>
                <MDBBtn>Print</MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      </MDBContainer>
    </>
    
  );
};

export default ApprovedRequest;
