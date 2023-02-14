import { Button } from '@chakra-ui/react';
import React, { useState } from 'react'
import { search } from '../endpoints/api';
import Rating from '../components/Rating';
import BookModal from '../components/BookModal';

const words = ["pirates of the carribean", "persie jackson", "no other man", "buster scruggs", "dear love"];

// Generate a random word
const randomWord = () => words[Math.floor(Math.random() * words.length)];

async function getBooks(){
	var result = []
	try {
		const response = await search(randomWord);
		result =  response.data.docs;
	} catch (error) {
		console.log(error);
	}
	return result;
}

export default function Products() {
	const [query, setQuery] = useState('')
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [books, setBooks] = useState(getBooks)
	const handlechange = (e) => {
		setQuery(e.target.value);
	}

	const handleSearch = (e) => {
		setLoading(true);
		if (query) {
			search(query, page)
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

	return (
		<div>
			<div className="pt-4 fs-1 fw-bold text-center ps-4">
				<span className="text-success ">Search</span> book title
			</div>
			<div className="row justify-content-center mx-0">
				<div className="mb-3 col-6">
					<input type="text" onChange={handlechange} value={query} className="form-control" id="exampleInputText1" aria-describedby="textHelp" />
					<div id="textHelp" className="form-text">Enter title to search for.</div>
				</div>
				<div className="col-2">
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
			<div>{books.length === 0 && (
				<div className="text-center p-5 mb-5">
					<h2 className='fw-bold fs-1'>
						No books found
					</h2>
				</div>
			)}
			</div>

			<div className="container">
				<div className="row mx-0 g-4 justify-content-evenly">
					{books.map((book) => (
						<div className="col-lg-4 col-md-6 col-sm-12" key={book.key}>

							<div className="card border-0 shadow h-100">
								<img src={book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://dummyimage.com/180x120/dbdbdb/787878.png&text=Image+cap"} className="card-img-top" alt="..." style={{ height: "18rem" }} />
								<div className="card-body">
									<h5 className="card-title fw-bold fs-3 text-danger">{book.title.split(' ').slice(0, 4).join(' ')}</h5>
									<p className="card-text">By <span className='text-success'>{book.author_name || 'Unknown'}</span></p>
									<div className='py-2'>
										<Rating value={4} />

									</div>

								</div>
								<div className="card-footer btn-group g-2" role="group">
									<BookModal book={book} />
									<button type="button" className="btn btn-outline-primary">Save</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
