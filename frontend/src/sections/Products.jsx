import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { search } from '../endpoints/api';
import { LoaderMini } from '../components/Loader';
import BookCard, { BookCard1 } from '../components/BookCard';

const words = ["pirates of the carribean", "avengers", "dear love"];

// Generate a random word
const randomWord = words[Math.floor(Math.random() * words.length)];


export default function Products() {
	const [query, setQuery] = useState(randomWord)
	const [queryText, setQueryText] = useState()
	const [loading, setLoading] = useState(false)
	const [books, setBooks] = useState([])
	const [loading1, setLoading1] = useState(true);
	const [page, setPage] = useState(1)
	const [totalResults, setTotalResults] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [perPage, setPerPage] = useState(9);
	const handlechange = (e) => {
		setQueryText(e.target.value);
	}

	const handleSearch = (e) => {
		setLoading(true);

		if (query) {
			setQuery(queryText);
			setPage(1)
		} else {
			alert('Please enter a search query');
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading1(true);
		search((query), perPage, page)
			.then((response) => {
				setBooks(response.books);
				setTotalResults(response.totalResults);
				setTotalPages(response.totalPages);
				setLoading1(false);
				setLoading(false);

			})
			.catch((error) => {
				console.log(error);
				setLoading1(false);
				setLoading(false);

			});

	}, [query, perPage, page]);


	return (
		<div>


			<div className="row justify-content-center mx-0 pt-4">
				<div className="p-5 mb-4 bg-light rounded-3">
					<div className="container-fluid py-5">
						<h1 className="display-5 fw-bold">Find Your Next Great Read</h1>
						<p className="col-md-8 mx-auto py-3 lead">Explore thousands of books and read reviews from real people to find your next favorite book. Whether you're looking for the latest bestseller, a classic from a beloved author, or something in between, our database has something for everyone.</p>

					</div>
					<div className="mb-3 col-6 mx-auto">
						<input type="text" onChange={handlechange} value={queryText} className="form-control" placeholder='Search book title' id="exampleInputText1" aria-describedby="textHelp" />
						<div id="textHelp" className="form-text"></div>
					</div>
					<div >
						<Button
							isLoading={loading}
							loadingText='searching'
							colorScheme='teal'
							variant='outline'
							spinnerPlacement='end'
							onClick={handleSearch}
						>
							Search
						</Button>

					</div>

				</div>

			</div>
			{loading1 ? <LoaderMini /> :
				<div className="container">
					<div className="p-5 mb-4 bg-light rounded-3">
						<div className="container-fluid">
							<h3 className="display-5 fw-bold"><span className="text-success">{totalResults} </span> Results found for <span className="text-info">"{query}"</span></h3>
						</div>
					</div>
					<div className="row mx-0 g-4 justify-content-evenly">
						{books.map((book) => {

							return (
								<div className="col-lg-4 col-md-6 col-sm-12" key={book.key}>
									<BookCard book={book} />
								</div>

							)
						})}

					</div>
				</div>}
			{totalResults >= 9 && (
				<div className="col-12 p-lg-5 py-4">
					<nav aria-label="Page navigation example">
						<ul className="pagination justify-content-center">
							<li className={`page-item ${page === 1 ? "disabled" : ""}`}>
								<button
									className="page-link"
									disabled={page === 1}
									onClick={() => setPage(page - 1)}
								>
									Previous
								</button>
							</li>

							{[...Array(totalPages)].map((_, index) => {
								if (
									index + 1 === page ||
									(index + 1 >= page - 2 && index + 1 <= page + 2) ||
									index + 1 === totalPages
								) {
									return (
										<li
											key={index}
											className={`page-item ${index + 1 === page ? "active" : ""}`}
										>
											<button className="page-link" onClick={() => setPage(index + 1)}>
												{index + 1}
											</button>
										</li>
									);
								}
								if (
									index + 1 === page - 3 ||
									index + 1 === page + 3 ||
									index + 1 === 1
								) {
									return (
										<li key={index} className="page-item disabled">
											<span className="page-link">...</span>
										</li>
									);
								}
								return null;
							})}
							<li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
								<button
									className="page-link"
									disabled={page === totalPages}
									onClick={() => setPage(page + 1)}
								>
									Next
								</button>
							</li>
						</ul>
					</nav>

				</div>
			)}
		</div>
	)
}


export function ClubProducts({club,setAdding}) {
	const [query, setQuery] = useState(randomWord)
	const [queryText, setQueryText] = useState()
	const [loading, setLoading] = useState(false)
	const [books, setBooks] = useState([])
	const [loading1, setLoading1] = useState(true);
	const [page, setPage] = useState(1)
	const [totalResults, setTotalResults] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [perPage, setPerPage] = useState(9);
	const handlechange = (e) => {
		setQueryText(e.target.value);
	}

	const handleSearch = (e) => {
		setLoading(true);

		if (query) {
			setQuery(queryText);
			setPage(1)
		} else {
			alert('Please enter a search query');
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading1(true);
		search((query), perPage, page)
			.then((response) => {
				setBooks(response.books);
				setTotalResults(response.totalResults);
				setTotalPages(response.totalPages);
				setLoading1(false);
				setLoading(false);

			})
			.catch((error) => {
				console.log(error);
				setLoading1(false);
				setLoading(false);

			});

	}, [query, perPage, page]);


	return (
		<div>


			<div className="row justify-content-center mx-0 pt-4">
				<div className="p-5 mb-4 bg-light rounded-3">
					<div className="container-fluid py-5 text-center">
						<h1 className="display-5 fw-bold">Add books to your group</h1>
						<p className="col-md-8 mx-auto py-3 lead">Explore thousands of books and read reviews from real people to find your next favorite book. Whether you're looking for the latest bestseller, a classic from a beloved author, or something in between, our database has something for everyone.</p>

					</div>
					<div className="mb-3 col-6 mx-auto">
						<input type="text" onChange={handlechange} value={queryText} className="form-control" placeholder='Search book title' id="exampleInputText1" aria-describedby="textHelp" />
						<div id="textHelp" className="form-text"></div>
					</div>
					<div className='text-center'>
						<Button
							isLoading={loading}
							loadingText='searching'
							colorScheme='teal'
							variant='outline'
							spinnerPlacement='end'
							onClick={handleSearch}
						>
							Search
						</Button>

					</div>

				</div>

			</div>
			{loading1 ? <LoaderMini /> :
				<div className="container">
					<div className="p-5 mb-4 bg-light rounded-3">
						<div className="container-fluid">
							<h3 className="display-5 fw-bold"><span className="text-success">{totalResults} </span> Results found for <span className="text-info">"{query}"</span></h3>
						</div>
					</div>
					<div className="row mx-0 g-4 justify-content-evenly">
						{books.map((book) => {

							return (
								<div className="col-lg-4 col-md-6 col-sm-12" key={book.key}>
									<BookCard1 book={book} club={club} setAdding1={ setAdding} />
								</div>

							)
						})}

					</div>
				</div>}
			{totalResults >= 9 && (
				<div className="col-12 p-lg-5 py-4">
					<nav aria-label="Page navigation example">
						<ul className="pagination justify-content-center">
							<li className={`page-item ${page === 1 ? "disabled" : ""}`}>
								<button
									className="page-link"
									disabled={page === 1}
									onClick={() => setPage(page - 1)}
								>
									Previous
								</button>
							</li>

							{[...Array(totalPages)].map((_, index) => {
								if (
									index + 1 === page ||
									(index + 1 >= page - 2 && index + 1 <= page + 2) ||
									index + 1 === totalPages
								) {
									return (
										<li
											key={index}
											className={`page-item ${index + 1 === page ? "active" : ""}`}
										>
											<button className="page-link" onClick={() => setPage(index + 1)}>
												{index + 1}
											</button>
										</li>
									);
								}
								if (
									index + 1 === page - 3 ||
									index + 1 === page + 3 ||
									index + 1 === 1
								) {
									return (
										<li key={index} className="page-item disabled">
											<span className="page-link">...</span>
										</li>
									);
								}
								return null;
							})}
							<li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
								<button
									className="page-link"
									disabled={page === totalPages}
									onClick={() => setPage(page + 1)}
								>
									Next
								</button>
							</li>
						</ul>
					</nav>

				</div>
			)}
		</div>
	)
}
