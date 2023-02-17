import { StarIcon } from '@chakra-ui/icons';
import React, { useState, useEffect } from 'react';
import Loader, { LoaderMini, LoaderOne } from './Loader';
import Reviews from '../sections/Reviews'
import ReviewModal from './ReviewModal';
import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
import { getReviews } from '../endpoints/api';

const BookDetails = ({ bookId, authorId }) => {

	const [book, setBook] = useState(null);
	const [loading, setLoading] = useState(true);
	const [rating, setRating] = useState(0)
	const [reviews, setReviews] = useState([])

	const handleImageLoad = (e) => {
		e.preventDefault()
		setLoading(false);
	};

	useEffect(() => {
		fetch(`https://openlibrary.org/works/${bookId}.json`)
			.then(response => response.json())
			.then(data => setBook(data));
		getReviews(bookId)
			.then(data => {
				setReviews(data)
			});

	}, [bookId]);

	if (!book) {
		return <div><LoaderMini /> </div>;
	}

	const { description, covers, key, title, subjects, type, latest_revision, revision, created, last_modified } = book;

	return (
		<>

			<div className="row align-items-center mx-0 justify-content-center" style={{ height: '"60vh"}}' }}>
				<div className="col-md-4">
					<div className="h-100 p-lg-5 sticky-top">
						{loading && <Loader />}
						<img
							src={covers && covers.length > 0 ? `http://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : "https://dummyimage.com/180x120/dbdbdb/787878.png&text=Image+cap"}
							className="card-img-top rounded"
							alt="..."
							style={{ display: loading ? "none" : "block" }}
							onLoad={handleImageLoad}
							loading={loading ? "eager" : "lazy"}
						/>

						<div class="row text-center align-items-center g-2 mx-0 p-3">
							<div class="col-12">
								<Button
									bg={'bisque'}
								>
									Add to List
								</Button>
							</div>
							<div class="col-12">
								<ReviewModal bookId={bookId} />
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-8 row justify-content-center align-items-center">
					<div className="m-2">
						{subjects ? subjects.map((subject, idx) => (
							<Button key={idx} m={'2px'}>{subject}</Button>
						)) : ''}
					</div>
					<div className="p-3 m-2 bg-light rounded-3">
						<Heading>
							{title}
						</Heading>
					</div>
					<div className="p-3 m-2 bg-light rounded-3">
						<div className="lead fs-4">{description ? description.value : 'No description provided'}</div>
					</div>
					<div className="p-3 m-2 bg-light rounded-3">
						<p>Revisions: {revision}</p>
					</div>
					<div className="p-3 m-2 bg-light rounded-3">
						{Array(5)
							.fill('')
							.map((_, i) => (
								<StarIcon
									key={i}
									color={i < rating ? 'teal.500' : 'gray.300'}
								/>
							))}
					</div>
				</div>
			</div>
			{(reviews && reviews.length > 0) ? <Reviews reviews={reviews} /> : (
				<div class="p-5 mb-4 bg-light rounded-3 text-center">
					<div class="container-fluid py-5">
						<h1 class="display-5 fw-bold">No reviews </h1>
						<p class="col-md-8 mx-auto my-2 fs-4">Be the first to add a review below</p>
						<ReviewModal bookId={bookId} />
					</div>
				</div>
			)}

		</>
	);
};

export default BookDetails;
