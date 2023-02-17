import { StarIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react';
import { Carousel } from 'bootstrap';



export default function Reviews({ reviews }) {
	const [hasPrev, setHasPrev] = useState(false);
	const [hasNext, setHasNext] = useState(false);

	useEffect(() => {
		if (reviews && reviews.length > 0) {
			// Get the carousel element
			const carouselElement = document.querySelector('#carouselId');

			// Create a new Carousel instance
			const carousel = new Carousel(carouselElement, {
				interval: 3000,
			});

			// Add event listener to the carousel slide event
			const handleSlide = () => {
				// Check if there is a previous slide
				if (carouselElement.querySelector('.carousel-item-prev')) {
					setHasPrev(true);
				} else {
					setHasPrev(false);
				}

				// Check if there is a next slide
				if (carouselElement.querySelector('.carousel-item-next')) {
					setHasNext(true);
				} else {
					setHasNext(false);
				}
			};

			carouselElement.addEventListener('slid.bs.carousel', handleSlide);

			// Check the initial state
			if (carouselElement.querySelector('.carousel-item-prev')) {
				setHasPrev(true);
			}

			if (carouselElement.querySelector('.carousel-item-next')) {
				setHasNext(true);
			}

			// Clean up the event listener
			return () => {
				carouselElement.removeEventListener('slid.bs.carousel', handleSlide);
			};
		}
	}, [reviews]);


	return (
		<div id="carouselId" className="carousel slide" data-bs-ride="carousel">
			{reviews && reviews.length > 0 ? (
				<div className="carousel-inner">
					{reviews.map((review, idx) => (
						<div className={`carousel-item ${idx === 1 ? 'active' : ''}`}>
							<div className="p-2">
								<div className="row justify-content-center align-items-center">
									<div className="col-12">
										<blockquote className="text-center fs-4">{review.review}</blockquote>

									</div>
									<div className="col-12 text-center my-3">
										{Array(5)
											.fill('')
											.map((_, i) => (
												<StarIcon
													key={i}
													color={i < review.rating ? 'teal.500' : 'gray.300'}
												/>
											))}
									</div>
								</div>
							</div>
						</div>
					))}
					{hasPrev && (
						<button
							className="carousel-control-prev"
							type="button"
							data-bs-target="#carouselId"
							data-bs-slide="prev"
						>
							<span
								className="carousel-control-prev-icon text-dark"
								aria-hidden="true"
							/>
							<span className="visually-hidden">Previous</span>
						</button>
					)}
					{hasNext && (
						<button
							className="carousel-control-next"
							type="button"
							data-bs-target="#carouselId"
							data-bs-slide="next"
						>
							<span className="carousel-control-next-icon" aria-hidden="true" />
							<span className="visually-hidden">Next</span>
						</button>
					)}
				</div>
			) : (
				<div className="container-fluid pt-3 text-center">
					<h1 className="display-5 fw-bold text-info">No Reviews</h1>
					<p className="lead">Be the first to add a review</p>
				</div>
			)}
			
		</div>
	);
}
