import { useState, useEffect } from 'react';
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
  const [requestData, setRequestData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [acctNum, setAcctNum] = useState();
  const [pdType, setPDType] = useState(null);
  const [pdTime, setPDTime] = useState(null);
  const [pdQty, setPDQty] = useState(null);
  const [pdDate, setPDDate] = useState(null);
  const [pdLocation, setPDLocation] = useState(null);
  const [pdNotes, setPDNotes] = useState(null);
  const [cdType, setCDType] = useState(null);
  const [fmv, setFMV] = useState(null);
  const [cdNotes, setCDNotes] = useState(null);

  const params = useParams();
  const paramID = params.id;
  return (
    <>
      <PlayerHeader />
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
          <div className='mb-3'>
            <label htmlFor='pdType' className='form-label pdType'>
              Type:
            </label>
            <div className='col-md-1'>
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
                  Select
                </option>
                <option value='1'>Autograph</option>
                <option value='2'>Meet and Greet</option>
                <option value='3'>Personal Appearance</option>
                <option value='4'>Radio Appearance</option>
                <option value='5'>Radio Spot</option>
                <option value='6'>TV Appearance</option>
                <option value='7'>TV Spot</option>
                <option value='8'>Other</option>
              </select>
            </div>
          </div>
          <div className='mb-4'>
            <div className='row'>
              <label htmlFor='pdTime' className='form-label pdType'>
                Time/Qty:
              </label>
              <div className='col-md-1'>
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
                  //value={!interviewData[0].OverallScore ? "" : interviewData[0].OverallScore }
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
                    onChange={(e) => {
                        const selectedDate = e.target.value;
                        setPDDate(selectedDate);
                      }}
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
                  <option value='Hours'>Cash</option>
                  <option value='Minutes'>Charity Contribution</option>
                  <option value='Units'>Gift Certificate</option>
                  <option value='Units'>Merchandise</option>
                  <option value='Units'>Suites</option>
                  <option value='Units'>Tuition Reimbursement</option>
                  <option value='Units'>Other</option>
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
              //onClick={() => submitInterviewScore()}
            >
              Submit
            </MDBBtn>
          {/* )} */}
          <MDBBtn
            outline
            className='mb-4'
            block
            //onClick={() => history.goBack()}
          >
            Cancel
          </MDBBtn>
        </>
      </MDBContainer>
    </>
  );
};

export default NewRequest;
