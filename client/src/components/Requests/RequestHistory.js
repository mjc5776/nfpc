import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBBtn,
} from 'mdb-react-ui-kit';
import swal from 'sweetalert';
import axios from 'axios';

const RequestHistory = () => {
  const [requestData, setRequestData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const paramID = params.id;

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(
      `${process.env.REACT_APP_HOST_NAME}/player/request/detail/${paramID}`,
      {
        signal: abortCont.signal,
      }
    )
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

  const cancelRequest = (id) => {
    swal({
      title: 'Delete this request?',
      text: 'Once deleted, you will not be able to recover this request.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let url = `${process.env.REACT_APP_HOST_NAME}/player/request/delete`;

        axios({
          method: 'post',
          url: url,
          data: {
            requestID: id,
          },
        }).then((res) => {
          swal('Poof! Your imaginary file has been deleted!', {
            icon: 'success',
          }).catch((err) => {
            console.log(err.message);
          });
        });
      }
    });
  };

  return (
    <MDBContainer>
      <MDBTable striped>
        <MDBTableHead>
          <tr>
            <th></th>
            <th scope='col'>Title</th>
            <th scope='col'>Description</th>
            <th scope='col'>Type</th>
            <th scope='col'>Date</th>
            <th scope='col'>Compensation</th>
            <th scope='col'>Status</th>
            <th>
              <MDBBtn
                tag='a'
                outline
                color='primary'
                className='me-2'
                href={`/newrequest/${paramID}`}
              >
                New Request
              </MDBBtn>
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {requestData.map((row, index) => (
            <tr key={row.RequestID}>
              <td className='row-data'>{index + 1}</td>
              <td className=''>{row.RequestTitle}</td>
              <td className='row-data'>{row.ReqDescription}</td>
              <td className='row-data'>{row.PDType}</td>
              <td className='row-data'>{row.PDDate}</td>
              <td className=''>{row.FMV}</td>
              <td className=''>{row.Status}</td>
              <td>
                <button
                  type='button'
                  className='btn btn-primary'
                  id={row.RequestID}
                  onClick={(e) => cancelRequest(e.target.id)}
                >
                  Cancel Request
                </button>
              </td>
              <td>
                <MDBBtn>Contract</MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
};

export default RequestHistory;
