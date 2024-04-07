import { Avatar, Card } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { fetchUser } from '../endpoints/api'

export default function UserCard({ userId }) {
	const [user, setUser] = useState({})
	useEffect(() => {
		fetchUser(userId).then(data => setUser(data))

	}, [userId])

	return (
		<Card variant={'elevated'} p={'4'} my={'2'} _hover={{bg:'tomato',color:'white'}}>
			<div className="row mx-0 align-items-center">
				<div className="col-md-2 text-center">
					<Avatar src="https://dummyimage.com/540x1024/919191/7a7a7a&text=image" />
				</div>
				<div className="col-md-10">
					<div className="card-body">
						<h5 className="card-title fw-bold">{user.username}</h5>
						<p className="card-text">{user.email}</p>
					</div>
				</div>
			</div>
		</Card>
	)
}
