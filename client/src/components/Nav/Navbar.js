import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse,
  MDBBtn
} from 'mdb-react-ui-kit';


const Navbar = () => { 
    const params = useParams();
    const [showNavSecond, setShowNavSecond] = useState(false);
    const [PlayerID, setPlayerID] = useState();
    
    const paramID = params.id;
    // setPlayerID(paramID)

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Denver Broncos - NFPC</MDBNavbarBrand>
        <MDBNavbarToggler
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavSecond(!showNavSecond)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavSecond}>
          <MDBNavbarNav>
            <MDBNavbarLink active aria-current='page' href='/'>
              Home
            </MDBNavbarLink>
            <MDBNavbarLink active aria-current='page' href='/pending'>
              Pending Requests
            </MDBNavbarLink>
            <MDBNavbarLink active aria-current='page' href='/approved'>
              Approved Requests
            </MDBNavbarLink>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
      <form className='container-fluid justify-content-end'>
        <MDBBtn tag='a' outline color="primary" className='me-2' href={`/newrequest/${paramID}`}>
          New Request
        </MDBBtn>
      </form>
    </MDBNavbar>
  )
}

export default Navbar