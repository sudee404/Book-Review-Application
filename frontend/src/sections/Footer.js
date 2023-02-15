
import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter backgroundcolor='light' className='text-center text-lg-left'>

      <div className='text-center p-3'>
        &copy; {new Date().getFullYear()} Copyright {' '}
        <a className='text-dark' >
          ReadUp.com
        </a>
      </div>
    </MDBFooter>
  );
}