import React, { useState } from 'react'
import {
	Button,
	useToast
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { joinClub } from '../endpoints/api'
import UserCard from './UserCard';
import ModalComp from './ModalComp';
import Products, { ClubProducts } from '../sections/Products';
import { BookCard1, BookCard2 } from './BookCard';

export default function ClubDetail({ club }) {

	const token = useSelector((state) => state.user.token);
	// const username = useSelector((state) => state.user.username);
	const userId = useSelector((state) => state.user.id);
	const [joining, setJoining] = useState(false)
	const toast = useToast();

	const showToast = (status, message) => {
		return toast({
			title: status,
			description: message || 'Club created successfully',
			status: status || 'success',
			duration: 3000,
			isClosable: true,
		})
	}
	const handleJoin = event => {
		event.preventDefault();
		setJoining(true)
		const data = { 'club_id': club.id }
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		joinClub(data, config)
			.then(res => {
				setJoining(false)
				showToast('success', 'Joined club successfully')
			})
			.catch(err => {
				setJoining(false)
				showToast('error', 'Failed to join club')
			})
	}



	return (
		<>
			<div className="row mx-0 align-items-center" >
				<div className="col-md-6 mb-3">
					<div className="card border-0">
						<img src={club.poster || "https://dummyimage.com/720x240/343434/454545.png&text=Image+cap"} className="card-img rounded" alt="..." style={{ maxHeight: '70vh', objectFit: 'contain' }} />
						<div className="card-img-overlay ">
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="p-2 bg-light rounded-3">
						<div className="container-fluid">
							<h1 className="display-5 fw-bold">{club.name}</h1>
							<small className="text-info">Description:{club.url}</small>
							<p className="col-md-8 fs-4">{club.description}</p>
							<small className="text-success">Members:</small>
							<p className="col-md-8 fs-4">{club.members.length} members</p>
							<small className="text-primary">Owner:</small>
							<UserCard userId={club.owner} />
							{userId === club.owner ?
								<div className="d-flex justify-content-center align-items-center">
									<ModalComp title={'Add Books to Group'} button={'Add Book'} element={<ClubProducts club={club} />} size={'l'} />
									<Button colorScheme={'orange'} _hover={{ bg: 'tomato' }} m={'3'} onClick={handleJoin} isLoading={joining} loadingText='Joining'>
										Delete Club
									</Button>
								</div>
								:

								<>
									{
										club.members.includes(userId) ?
											(
												<div className="d-flex justify-content-center align-items-center my-2">
													<Button colorScheme={'yellow'} _hover={{ bg: 'tomato' }} mt={'3'} onClick={handleJoin} isLoading={joining} loadingText='Joining'>
														Leave Club
													</Button>
												</div>
											) : (
												<div className="d-flex justify-content-center align-items-center my-2">
													<Button colorScheme={'whatsapp'} _hover={{ bg: 'tomato' }} mt={'3'} onClick={handleJoin} isLoading={joining} loadingText='Joining'>
														Join Club
													</Button>
												</div>
											)
									}
								</>}
						</div>
					</div>
				</div>
			</div>
			<div className="p-lg-5 p-2 my-4 bg-light rounded-3">
				<div className="container-fluid py-5 text-center">
					<h1 className="display-5 fw-bold">Club Members</h1>
					<div className="row row-cols-2 justify-content-center align-items-center g-3">
						{(club.members && club.members.length > 0) ? club.members.map((member, index) => {
							return (
								<div className="col border-dark" key={index}>
									<UserCard userId={member} />
								</div>
							)
						}
						) :
							<div className='mx-auto pt-3' >
								<h3 >No members yet</h3>
							</div>

						}
					</div>
				</div>
			</div>
			<div className="p-lg-5 p-2 my-4 bg-light rounded-3">
				<div className="container-fluid py-5 text-center">
					<h1 className="display-5 fw-bold pb-3">Club Books</h1>
					<div className="row row-cols-4 justify-content-center align-items-center g-4">
						{(club.books && club.books.length > 0) ? club.books.map((book_id, index) => {
							return (
								<div className="col border-dark" key={index}>
									<BookCard2 bookId={book_id} club={ club} />
								</div>
							)
						}
						) :
							<div className='mx-auto pt-3' >
								<h3 >No books yet</h3>
							</div>

						}
					</div>
				</div>
			</div>
		</>
	)
}