import { Spinner } from '@chakra-ui/react'
import React from 'react'

export default function Loader() {
  return (
	  <div className="d-flex justify-content-center align-items-center vh-100">
		  <Spinner size="l" color="blue.500" thickness="10px" />
		  <Spinner size="l" color="green.500" thickness="9px" />
		  <Spinner size="l" color="red.500" thickness="8px" />
		  <Spinner size="l" color="yellow.500" thickness="7px" />
		  <Spinner size="l" color="purple.500" thickness="6px" />
	  </div>
  )
}

export function LoaderMini() {
	return (
		<div className="d-flex justify-content-center align-items-center p-5">
			<Spinner size="l" color="blue.500" thickness="10px" />
			<Spinner size="l" color="green.500" thickness="9px" />
			<Spinner size="l" color="red.500" thickness="8px" />
			<Spinner size="l" color="yellow.500" thickness="7px" />
			<Spinner size="l" color="purple.500" thickness="6px" />
		</div>
	)
}
export function LoaderOne() {
	return (
		<div className="d-flex justify-content-start align-items-center p-5">
			<Spinner size="xl" color="green.500" thickness="10px" />
		</div>
	)
}
