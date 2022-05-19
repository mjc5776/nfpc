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
  const [interviewData, setInterviewData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [interviewScore, setInterviewScore] = useState();
  const [overallScore, setOverallScore] = useState();
  const [interviewNotes, setInterviewNotes] = useState(null);

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
            <MDBInput />
          </div>
          <div className='mb-2'>
            <label htmlFor='description' className='form-label scoreType'>
              Description
            </label>
            <MDBInput />
          </div>
          <div className='mb-2'>
            <label htmlFor='acctNum' className='form-label scoreType'>
              Account #
            </label>
            <MDBInput />
          </div>
          <hr />
          <h1>Player Deliverable</h1>
          <div className='mb-3'>
            <label htmlFor='interviewScore' className='form-label scoreType'>
              Type:
            </label>
            <div className='col-md-1'>
              <select
                required
                className='form-select'
                id='interviewScore'
                aria-label='Default select example'
                onChange={(e) => {
                  const selectedInterview = e.target.value;
                  //setInterviewScore(selectedInterview);
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
            <div class='row'>
              <label htmlFor='overallScore' className='form-label scoreType'>
                Time/Qty:
              </label>
              <div className='col-md-1'>
                <MDBInput label='Time' id='pdQty' type='number' />
              </div>
              <div className='col-sm-2'>
                <select
                  className='form-select'
                  //value={!interviewData[0].OverallScore ? "" : interviewData[0].OverallScore }
                  id='overallScore'
                  aria-label='Default select example'
                  onChange={(e) => {
                    const selectedOverall = e.target.value;
                    setOverallScore(selectedOverall);
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
            <div class='row'>
              <div className='col-sm-2'>
                <MDBDatepicker format='mm/dd/yyyy' inputToggle />
              </div>
            </div>
          </div>
          <div className='mb-4'>
            <div class='row'>
              <div className='col-sm-4'>
                <MDBInput label='Location' id='pdLocation' type='text' />
              </div>
            </div>
          </div>
          <div className='mb-4'>
            <div class='row'>
              <div className='col-sm-12'>
                <MDBTextArea label='Notes' id='pdNotes' rows={4} />
              </div>
            </div>
          </div>
          <hr />
          <h1>Club Deliverable</h1>
          <div className='mb-4'>
            <div class='row'>
              <div className='col-sm-3'>
                <select
                  className='form-select'
                  id='cdType'
                  onChange={(e) => {
                    const selectedOverall = e.target.value;
                    setOverallScore(selectedOverall);
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
            <div class='row'>
              <div className='col-sm-3'>
                <MDBInput
                  label='Fair Market Value'
                  id='cdValue'
                  type='number'
                />
              </div>
            </div>
          </div>
          <div className='mb-4'>
            <div class='row'>
              <div className='col-sm-12'>
                <MDBTextArea label='Notes' id='cdNotes' rows={4} />
              </div>
            </div>
          </div>
          <hr />
          {interviewScore && overallScore && (
            <MDBBtn
              className='mb-4'
              block
              //onClick={() => submitInterviewScore()}
            >
              Submit
            </MDBBtn>
          )}
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
