import { Button, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { search } from '../endpoints/api';
import Loader, { LoaderMini } from '../components/Loader';
import BookModal from '../components/BookModal';
import BookCard from '../components/BookCard';

const words = ["pirates of the carribean", "lord of the rings", "buster scruggs", "dear love"];

// Generate a random word
const randomWord = words[Math.floor(Math.random() * words.length)];


export default function Products() {
	const [query, setQuery] = useState('')
	const [loading, setLoading] = useState(false)
	const [books, setBooks] = useState([])
	const [loading1, setLoading1] = useState(true);
	const handlechange = (e) => {
		setQuery(e.target.value);
	}

	const handleSearch = (e) => {
		setLoading(true);
		if (query) {
			search(query)
				.then((response) => {
					setBooks(response.data.docs);
					setLoading(false);
				})
				.catch((error) => {
					console.log(error);
					setLoading(false);
				});
		} else {
			alert('Please enter a search query');
			setLoading(false);
		}
	};

	useEffect(() => {
		search(randomWord)
			.then((response) => {
				setBooks(response.data.docs);
				setLoading1(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading1(false);
			});
	}, []);


	return loading1 ? <LoaderMini /> :
		(
			<div>

				
				<div className="row justify-content-center mx-0 mt-4">
					<div className="mb-3 col-6">
						<input type="text" onChange={handlechange} value={query} className="form-control" placeholder='whale rider' id="exampleInputText1" aria-describedby="textHelp" />
						<div id="textHelp" className="form-text"></div>
					</div>
					<div className='mb-4'>
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
				<div className="container">
					<div className="row mx-0 g-4 justify-content-evenly">
						{books.map((book) => {
							
							return (
								<div className="col-lg-4 col-md-6 col-sm-12" key={book.key}>
									<BookCard book={book} />
								</div>

							)
						})}
					</div>
				</div>
			</div>
		)
}
