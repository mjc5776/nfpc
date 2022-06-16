import { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';
import moment from 'moment';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBDatepicker,
  MDBTextArea,
} from 'mdb-react-ui-kit';
import PlayerHeader from '../PlayerHeader/PlayerHeader';
import { useParams, useHistory } from 'react-router-dom';

const NewRequest = () => {
  const { authState, oktaAuth } = useOktaAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [leagueYear, setLeagueYear] = useState(null);
  const [compMax, setCompMax] = useState(null);
  const [appearMax, setAppearMax] = useState(null);
  const [requestData, setRequestData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [acctNum, setAcctNum] = useState();
  const [pdType, setPDType] = useState();
  const [pdTime, setPDTime] = useState();
  const [pdQty, setPDQty] = useState();
  const [pdDate, setPDDate] = useState();
  const [pdLocation, setPDLocation] = useState();
  const [pdNotes, setPDNotes] = useState();
  const [cdType, setCDType] = useState();
  const [fmv, setFMV] = useState();
  const [cdNotes, setCDNotes] = useState();
  //const [reqDate, setReqDate] = useState(moment())

  const params = useParams();
  const paramID = params.id;

  let history = useHistory();

  const leagueData = async() => {
    const data = await axios.get(`${process.env.REACT_APP_HOST_NAME}/leagueyear`);
    
    setLeagueYear(data.data[0].LeagueYearID);
    setCompMax(data.data[0].CompMax);
    setAppearMax(data.data[0].AppearMax);
    console.log('####League Year', leagueYear);
  };

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info)
        setUserName(info.name);
        setUserEmail(info.email);
      });

      leagueData();
    }
  }, [authState, oktaAuth, leagueYear]); //Update if authState changes

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user profile...</p>
      </div>
    );
  }


  const createRequest = () => {
    console.log('Create request');

  // console.log('Request Data', newRequest);

  axios.post(`${process.env.REACT_APP_HOST_NAME}/request/new`, {
      
      PlayerID: paramID,
      LeagueYearID: leagueYear,
      RequestDate: moment(),
      RequestUser: userName,
      RequestUserEmail: userEmail,
      RequestTitle: title,
      ReqDescription: description,
      AcctNum: acctNum,
      PDType: pdType,
      PDTime: pdTime,
      PDQty: pdQty,
      PDDate: pdDate,
      PDLocation: pdLocation,
      PDComments: pdNotes,
      CDType: cdType,
      FMV: fmv,
      CDComments: cdNotes,
      Status: 'Pending'
      
    })
    .then(response => {
      console.log('Response', response);
      setRequestData(response.data);
  })
       //.then(history.goBack())
      .catch(error => {
          setError({ errorMessage: error.message });
          console.error('There was an error!', error);
      });

};

const handlePDDate=(pdDate) => {
    const PDDate = moment(pdDate, "MM-DD-YYYY")
    setPDDate(PDDate);
}

  return (
    <>
      {/* <PlayerHeader /> */}
      <MDBContainer>
        <>
          <h1>Player Request</h1>
          <hr />
          <div className='mb-2'>
            <label htmlFor='title' className='form-label scoreType'>
              Title
            </label>
            <MDBInput
                id="title"
                onChange={(e) => {
                    const title = e.target.value;
                    setTitle(title);
                }}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='description' className='form-label scoreType'>
              Description
            </label>
            <MDBInput
                id="description"
                onChange={(e) => {
                    const desc = e.target.value;
                    setDescription(desc);
                }}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='acctNum' className='form-label scoreType'>
              Account #
            </label>
            <MDBInput
                id="acctNum"
                onChange={(e) => {
                    const acctNum = e.target.value;
                    setAcctNum(acctNum);
                }}
            />
          </div>
          <hr />
          <h1>Player Deliverable</h1>
          
          <div className='mb-4'>
            <div className='row'>
              <div className='col-sm-3'>
              <select
                required
                className='form-select'
                id='pdType'
                onChange={(e) => {
                  const selectedType = e.target.value;
                  setPDType(selectedType);
                }}
              >
                <option value='' defaultValue>
                  Type
                </option>
                <option value='Autograph'>Autograph</option>
                <option value='Meet and Greet'>Meet and Greet</option>
                <option value='Personal Appearance'>Personal Appearance</option>
                <option value='Radio Appearance'>Radio Appearance</option>
                <option value='Radio Spot'>Radio Spot</option>
                <option value='TV Appearance'>TV Appearance</option>
                <option value='TV Spot'>TV Spot</option>
                <option value='Other'>Other</option>
              </select>
            </div>
          </div>
          </div>
          <div className='mb-4'>
            <div className='row'>
              <div className='col-sm-2'>
                <MDBInput 
                    label='Time' 
                    id='pdTime' 
                    type='number' 
                    onChange={(e) => {
                        const pdTime = e.target.value;
                        setPDTime(pdTime);
                      }}
                    />
              </div>
              <div className='col-sm-2'>
                <select
                  className='form-select'
                  id='pdQty'
                  onChange={(e) => {
                    const selectedQty = e.target.value;
                    setPDQty(selectedQty);
                  }}
                >
                  <option value='' defaultValue>
                    Select
                  </option>
                  <option value='Hours'>Hours</option>
                  <option value='Minutes'>Minutes</option>
                  <option value='Units'>Units</option>
                </select>
              </div>
            </div>
          </div>

          <div className='mb-4'>
            <div className='row'>
              <div className='col-sm-2'>
                <MDBDatepicker 
                    format='mm/dd/yyyy' 
                    inputToggle
                    onChange={handlePDDate} 
                    />
              </div>
            </div>
          </div>
          <div className='mb-4'>
            <div className='row'>
              <div className='col-sm-4'>
                <MDBInput 
                    label='Location' 
                    id='pdLocation' 
                    type='text' 
                    onChange={(e) => {
                        const pdLocation = e.target.value;
                        setPDLocation(pdLocation);
                      }}
                    />
              </div>
            </div>
          </div>
          <div className='mb-4'>
            <div className='row'>
              <div className='col-sm-12'>
                <MDBTextArea 
                    label='Notes' 
                    id='pdNotes' 
                    rows={4} 
                    onChange={(e) => {
                        const pdNotes = e.target.value;
                        setPDNotes(pdNotes);
                      }}
                    />
              </div>
            </div>
          </div>
          <hr />
          <h1>Club Deliverable</h1>
          <div className='mb-4'>
            <div className='row'>
              <div className='col-sm-3'>
                <select
                  className='form-select'
                  id='cdType'
                  onChange={(e) => {
                    const selectedCDType = e.target.value;
                    setCDType(selectedCDType);
                  }}
                >
                  <option value='' defaultValue>
                    Type
                  </option>
                  <option value='Cash'>Cash</option>
                  <option value='Charity Contribution'>Charity Contribution</option>
                  <option value='Gift Certificate'>Gift Certificate</option>
                  <option value='Merchandise'>Merchandise</option>
                  <option value='Suites'>Suites</option>
                  <option value='Tickets'>Tickets</option>
                  <option value='Tuition Reimbursement'>Tuition Reimbursement</option>
                  <option value='Other'>Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className='mb-4'>
            <div className='row'>
              <div className='col-sm-3'>
                  
                <MDBInput
                  label='Fair Market Value'
                  id='cdValue'
                  type='number'
                  onChange={(e) => {
                    const fmv = e.target.value;
                    setFMV(fmv);
                  }}
                />
              </div>
            </div>
          </div>
          <div className='mb-4'>
            <div className='row'>
              <div className='col-sm-12'>
                <MDBTextArea 
                label='Notes' 
                id='cdNotes' 
                rows={4} 
                onChange={(e) => {
                    const cdNotes = e.target.value;
                    setCDNotes(cdNotes);
                  }}
                />
              </div>
            </div>
          </div>
          <hr />
          {/* {interviewScore && overallScore && ( */}
            <MDBBtn
              className='mb-4'
              block
              onClick={() => createRequest()}
            >
              Submit
            </MDBBtn>
          {/* )} */}
          <MDBBtn
            outline
            className='mb-4'
            block
            onClick={() => history.goBack()}
          >
            Cancel
          </MDBBtn>
        </>
      </MDBContainer>
    </>
  );
};

export default NewRequest;
