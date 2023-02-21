import { Heading } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BookCard3 } from '../components/BookCard';
import Loader from '../components/Loader';
import { getUserBooks } from '../endpoints/api';
import { getUserClubs } from '../endpoints/api';
import ClubCard from '../components/ClubCard';
import ErrorPage from './ErrorPage';

function randomGreeting() {
	const greetings = {
		English: "Hello",
		Spanish: "Hola",
		French: "Bonjour",
		German: "Guten Tag",
		Italian: "Ciao",
		Japanese: "Konnichiwa",
		Mandarin: "Ni hao",
		Russian: "Zdravstvuyte",
	};

	const languages = Object.keys(greetings);
	const randomLanguage = languages[Math.floor(Math.random() * languages.length)];

	return `${greetings[randomLanguage]}!`;
}


const MyBooks = () => {
	const userId = useSelector((state) => state.user.id);
	const [books, setBooks] = useState([])
	const [clubs, setClubs] = useState([])
	const [userClubs, setUserClubs] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {

		getUserBooks('', userId)
			.then(res => {
				setBooks(res.data)
				setLoading(false)
			})
			.catch(err => {
				console.log(err)
				setLoading(false)
			})
		getUserClubs('', userId)
			.then(res => {
				setClubs(res.data.results)
			})
			.catch(err => {
				console.log(err)
			})

		getUserClubs(userId, '')
			.then(res => {
				setUserClubs(res.data.results)
			})
			.catch(err => {
				console.log(err)
			})
	}, [userId, loading])

	if (!userId) {
		return <ErrorPage />
	}
	return loading ? <Loader /> : (
		<>
			<div className="p-5 mb-4 bg-light rounded-3">
				<div className="container-fluid py-5">
					<h1 className="display-5 fw-bold">{randomGreeting()}</h1>
				</div>
			</div>
			<div className="p-2 mb-4 bg-light rounded-3">
				<div className="container-fluid py-5 text-center">
					<h3 className="display-6 fw-bold text-info">My Clubs</h3>
				</div>
			</div>

			{userClubs && userClubs.length > 0 ?
				<>

					<Heading>Owner</Heading>
					<div className="row  justify-content-center row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mx-0 my-3">
						{userClubs.map((club, idx) => (
							<ClubCard club={club} key={idx} />
						))}
					</div>
				</>
				:
				(
					<div className="p-5 mb-4 bg-light rounded-3">
						<div className="container-fluid py-5">
							<h1 className="display-5 fw-bold pb-4">No clubs created yet</h1>
							<p className="col-md-8 mx-auto fs-4">You haven't created any book clubs, kindly do so to populate this section.</p>
						</div>
					</div>
				)}
			{clubs && clubs.length > 0 ?
				<>

					<Heading>Member</Heading>

					<div className="row  justify-content-center row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mx-0 my-3 ">
						{clubs.map((club, idx) => (
							<ClubCard club={club} key={idx} />
						))}
					</div>
				</>
				:
				(
					<div className="p-5 mb-4 bg-light rounded-3">
						<div className="container-fluid py-5">
							<h1 className="display-5 fw-bold pb-4">No clubs joined yet</h1>
							<p className="col-md-8 mx-auto fs-4">You haven't joined any book clubs, kindly do so to populate this section.</p>
						</div>
					</div>
				)}

			{books && books.length > 0 ?
				<>
					<div className="p-2 mb-4 bg-light rounded-3">
						<div className="container-fluid py-5 text-center">
							<h3 className="display-6 fw-bold text-info">My Books</h3>
						</div>
					</div>
					{books.filter((book) => book.status === 'CR').length > 0 && (
						<>
							<Heading>Currently Reading</Heading>
							<div className="row  justify-content-center row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mx-0 my-3">
								{books
									.filter((book) => book.status === 'CR')
									.map((book, idx) => (
										<div className="col" key={idx}>
											<BookCard3 bookId={book.book} />
										</div>
									))}
							</div>
						</>
					)}
					{books.filter((book) => book.status === 'PR').length > 0 && (
						<>
							<Heading>Planning to read</Heading>

							<div className="row  justify-content-center row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mx-0 my-3 ">
								{books
									.filter((book) => book.status === 'PR')
									.map((book, idx) => (
										<div className="col" key={idx}>
											<BookCard3 bookId={book.book} />
										</div>
									))}
							</div>
						</>
					)}
					{books.filter((book) => book.status === 'AR').length > 0 && (
						<>
							<Heading>Already Read</Heading>

							<div className="row justify-content-center row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mx-0 my-3">
								{books
									.filter((book) => book.status === 'AR')
									.map((book, idx) => (
										<div className="col" key={idx}>
											<BookCard3 bookId={book.book} />
										</div>
									))}
							</div>
						</>
					)}
				</>
				:
				(
					<div className="p-5 mb-4 bg-light rounded-3">
						<div className="container-fluid py-5">
							<h1 className="display-5 fw-bold pb-4">No books added yet</h1>
							<p className="col-md-8 mx-auto fs-4">You haven't added any books to your list, kindly do so to populate this page.</p>
						</div>
					</div>
				)}



		</>
	);
};

export default MyBooks;
