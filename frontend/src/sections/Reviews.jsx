import React from 'react'

export default function Reviews() {
	return (
		<div>
			<div className="p-5 mb-4 bg-light rounded-3">
				<div className="container-fluid pt-3">
					<h1 className="display-5 fw-bold text-info">Reviews</h1>
				</div>
				<div id="carouselId" className="carousel slide carousel-dark" data-bs-ride="carousel">
					
					<div className="carousel-inner" role="listbox">
						<div className="carousel-item active">
							<div className="p-lg-5 p-2">
								<div className="container-fluid">
									<blockquote className="col-md-8 mx-auto fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</blockquote>
								</div>
							</div>
						</div>
						<div className="carousel-item">
							<div className="p-lg-5 p-2">
								<div className="container-fluid">
									<blockquote className="col-md-8 mx-auto fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</blockquote>
								</div>
							</div>
						</div>
						<div className="carousel-item">
							<div className="p-lg-5 p-2">
								<div className="container-fluid">
									<blockquote className="col-md-8 mx-auto fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</blockquote>
								</div>
							</div>

						</div>
					</div>
					<button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
						<span className="carousel-control-prev-icon  text-dark" aria-hidden="true" />
						<span className="visually-hidden">Previous</span>
					</button>
					<button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true" />
						<span className="visually-hidden">Next</span>
					</button>
				</div>

			</div>


		</div>
	)
}
