import { Button, ButtonGroup, Card, Heading, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addBook } from "../endpoints/api";
import BookModal, { BookModal1 } from "./BookModal"

export default function BookCard({ book }) {

	const [loading, setLoading] = useState(true);
	const [shadow, setShadow] = useState('md');

	const handleImageLoad = (e) => {
		e.preventDefault()
		setLoading(false);
	};

	const property = {
		title: book.title,
		author:
			book.author_name,
		cover: book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://dummyimage.com/180x120/dbdbdb/787878.png&text=Image+cap",
		rating: 4,
	}
	return (

		<div className={`card ${shadow} m-2`}
			onMouseOver={() => {
				setShadow('shadow-lg');
			}}
			onMouseOut={() => {
				setShadow('shadow-sm');
			}}
		>
			<img src={property.cover}
				className="card-img-top"
				alt="..."
				style={{ height: '18rem', objectFit: 'cover', display: loading ? "none" : "block" }}
				onLoad={handleImageLoad}
				loading={loading ? "eager" : "lazy"} />
			<div className="card-body row justify-content-center align-items-center">
				<div className="col-12"><Heading size='md'>{property.title}</Heading></div>
				<div className="lead col-12">{property.author}</div>
			</div>
			<div className="card-footer d-flex justify-content-center align-items-center">
				<BookModal book={book} />

			</div>
		</div>
	)
}
export function BookCard1({ book, club,setAdding1 }) {

	const [loading, setLoading] = useState(true);
	const [adding, setAdding] = useState(false)
	const [added, setAdded] = useState(false)
	const token = useSelector((state) => state.user.token);
	const toast = useToast();

	const handleImageLoad = (e) => {
		e.preventDefault()
		setLoading(false);
	};


	const showToast = (status, message) => {
		return toast({
			title: status,
			description: message,
			status: status,
			duration: 3000,
			isClosable: true,
		})
	}

	const handleAdd = (e) => {
		e.preventDefault()
		setAdding(true);
		const data = { 'club_id': club.id, 'book_id': book.key.split('/').pop() }
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		addBook(data, config)
			.then(response => {
				showToast('success', response.data.message)
				setAdded(true)
				setAdding(false);
				setAdding1(true)
			})
			.catch(errors => {
				showToast('error', errors.response.data.message)
				setAdding(false);
			})
		
	}

	const property = {
		title: book.title,
		author:
			book.author_name,
		cover: book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://dummyimage.com/180x120/dbdbdb/787878.png&text=Image+cap",
		rating: 4,
	}

	useEffect(() => {
		if (club && book) {
			const book_id = book.key.split('/').pop()
			if (club.books.includes(book_id)) {
				setAdded(true)
			}
		}
	}, [book, club])

	return (
		<>

			<Card rounded={'md'} >
				<img src={property.cover}
					className="card-img-top"
					alt="..."
					style={{ height: '18rem', width: '100%', objectFit: 'cover', display: loading ? "none" : "block" }}
					onLoad={handleImageLoad}
					loading={loading ? "eager" : "lazy"} />

				<div className="card-body row justify-content-center align-items-center p-3">
					<div className="col-12 mb-3"><Heading size='md' color={'turquoise'}>{property.title}</Heading></div>
					<div className="lead col-12 ">{property.author}</div>
				</div>
				<ButtonGroup className="card-footer d-flex justify-content-between align-items-center p-3">
					{!added ?
						<Button onClick={handleAdd}
							bg={'beige'}
							_hover={{ bg: 'teal.300' }}
							isLoading={adding}
							loadingText='Adding'
							variant='outline'
							spinnerPlacement='end'>
							Add to list
						</Button> :
						<Button onClick={handleAdd}
							bg={'teal.300'}
							_hover={{ bg: 'beige' }}
							isLoading={adding}
							loadingText='Adding'
							variant='outline'
							spinnerPlacement='end'>
							Added
						</Button>
					}
					<BookModal book={book} club={club} />
				</ButtonGroup>
			</Card>
		</>
	)
}

export function BookCard2({ bookId, club }) {
	const [book, setBook] = useState({})
	const [loading, setLoading] = useState(true);
	const [adding, setAdding] = useState(false)
	const [added, setAdded] = useState(false)
	const token = useSelector((state) => state.user.token);
	const toast = useToast();

	const handleImageLoad = (e) => {
		e.preventDefault()
		setLoading(false);
	};


	const showToast = (status, message) => {
		return toast({
			title: status,
			description: message,
			status: status,
			duration: 3000,
			isClosable: true,
		})
	}

	const handleAdd = (e) => {
		e.preventDefault()
		setAdding(true);
		const data = { 'club_id': club.id, 'book_id': bookId}
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		addBook(data, config)
			.then(response => {
				showToast('success', response.data.message)
				setAdded(true)
				setAdding(false);
			})
			.catch(errors => {
				showToast('error', errors.response.data.message)
				setAdding(false);
			})

	}

	useEffect(() => {
		if (club && bookId) {
			fetch(`https://openlibrary.org/works/${bookId}.json`)
				.then(response => response.json())
				.then(data => setBook(data));
			if (club.books.includes(bookId)) {
				setAdded(true)
			}
		}
	}, [bookId, club])

	const { description, covers, authors, title, subjects, revision } = book;

	return (
		<>

			<Card rounded={'md'} _hover={{ shadow: 'dark-lg', fontWeight: 'bold' }} variant={'elevated'}>
				<img
					src={covers && covers.length > 0 ? `http://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : "https://dummyimage.com/180x120/dbdbdb/787878.png&text=Image+cap"}
					className="card-img-top"
					alt="..."
					style={{ height: '18rem', width: '100%', objectFit: 'cover', display: loading ? "none" : "block" }}
					onLoad={handleImageLoad}
					loading={loading ? "eager" : "lazy"} />

				<div className="card-body row justify-content-center align-items-center p-3">
					<div className="col-12 mb-3"><Heading size='md' color={'turquoise'}>{title}</Heading></div>
					{/* <div className="lead col-12 ">{property.author}</div> */}
				</div>
				<ButtonGroup className="card-footer d-flex justify-content-between align-items-center p-3">
					{!added ?
						<Button onClick={handleAdd}
							bg={'beige'}
							_hover={{ bg: 'teal.300' }}
							isLoading={adding}
							loadingText='Adding'
							variant='outline'
							spinnerPlacement='end'>
							Add to list
						</Button> :
						<Button onClick={handleAdd}
							bg={'teal.300'}
							_hover={{ bg: 'beige' }}
							isLoading={adding}
							loadingText='Adding'
							variant='outline'
							spinnerPlacement='end'>
							Added
						</Button>
					}
					<BookModal1 bookId={bookId} />
				</ButtonGroup>
			</Card>
		</>
	)
}