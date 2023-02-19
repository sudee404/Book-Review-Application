import { StarIcon } from '@chakra-ui/icons'
import { useEffect } from 'react';
import { Carousel } from 'bootstrap';
import { Heading } from '@chakra-ui/react';



export default function Reviews({ reviews }) {

	useEffect(() => {
		if (reviews && reviews.length > 0) {
			// Get the carousel element
			const carouselElement = document.querySelector('#carouselId');

			// Create a new Carousel instance
			const carousel = new Carousel(carouselElement, {
				interval: 3000,
			});
			carousel.next();
		}
	}, [reviews]);


	return (
		<div className="p-2 p-lg-5 mb-4 bg-light rounded-3">
			<div className=" mb-3">
				<Heading color={'tomato'}>Reviews</Heading>

			</div>
			<div id="carouselId" className="carousel slide" data-bs-ride="carousel">
				{reviews ? (
					<div className="carousel-inner">
						{reviews.length > 1 && reviews.map((review, idx) => (
							<div className={`carousel-item ${idx === 1 ? 'active' : ''}`} key={idx}>
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
										<div className="col-12 text-center">
											{new Date(review.created_at).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
										</div>
									</div>
								</div>
							</div>
						))}
						{reviews.length === 1 && (
							<div className="p-2">
								<div className="row justify-content-center align-items-center">

									<div className="col-12">
										<blockquote className="text-center fs-4">{reviews[0].review}</blockquote>
									</div>
									<div className="col-12 text-center my-3">
										{Array(5)
											.fill('')
											.map((_, i) => (
												<StarIcon
													key={i}
													color={i < reviews[0].rating ? 'teal.500' : 'gray.300'}
												/>
											))}
									</div>
									<div className="col-12 text-center">
										{new Date(reviews[0].created_at).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</div>
								</div>
							</div>
						)}
						
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
						
							<button
								className="carousel-control-next"
								type="button"
								data-bs-target="#carouselId"
								data-bs-slide="next"
							>
								<span className="carousel-control-next-icon" aria-hidden="true" />
								<span className="visually-hidden">Next</span>
							</button>
					
					</div>
				) : (
					<div className="container-fluid pt-3 text-center">
						<h1 className="display-5 fw-bold text-info">No Reviews</h1>
						<p className="lead">Be the first to add a review</p>
					</div>
				)}

			</div>
		</div>
	);
}
