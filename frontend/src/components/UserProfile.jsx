import React from 'react'
import { useSelector } from 'react-redux'

export const UserProfile = () => {
const user = useSelector(state => state.user)

  return (
	  <div className='lead'>
		  	 Hello {user.username} , Welcome to ReadUp , your one stop for all your literary needs
	  </div>
  )
}
