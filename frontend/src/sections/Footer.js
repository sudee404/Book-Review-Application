
import React from 'react';
import {
  MDBFooter} from 'mdb-react-ui-kit';
import { Link } from '@chakra-ui/react';

export default function Footer() {
  return (
    <MDBFooter backgroundcolor='light' className='text-center text-lg-left mt-4'>

      <div className='text-center p-3'>
        &copy; {new Date().getFullYear()} Copyright {' '}
        <Link className='text-dark' to="/">
          ReadUp.com
        </Link>
      </div>
    </MDBFooter>
  );
}