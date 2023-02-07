import React from 'react'
import Img1 from "../images/books/img2.png";
import Img2 from "../images/books/img4.png";
import Img3 from "../images/books/img3.png";
export default function About() {
	return (
		<div className='row mx-0 g-0'>
			<div className='col-lg-6 bg-primary text-light py-2 row align-items-center'>
				
				<p className="col-12 p-2 p-lg-3 fs-3 mb-3">
					<h5 className="col-12 card-title fs-1 fw-bold py-3">
						About Us
					</h5>
					Welcome to Your Personal Library - Your One-Stop
					Destination for All Your Reading Adventures! With a
					wealth of books at your fingertips, you can now keep
					track of all the books you've read, want to read, and
					are currently reading. So, come join us on this literary
					journey and create a virtual bookshelf that truly
					reflects your love for reading.
				</p>
			</div>
			<div className='col-lg-6'>
				<div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
					<div className="carousel-indicators">
						<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
						<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
						<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
					</div>
					<div className="carousel-inner">
						<div className="carousel-item active">
							<img src={Img1} className="d-block w-100" alt="..."/>
						</div>
						<div className="carousel-item">
							<img src={Img2} className="d-block w-100" alt="..."/>
						</div>
						<div className="carousel-item">
							<img src={Img3} className="d-block w-100" alt="..."/>
						</div>
					</div>
					<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
			</div>
		</div>
	)
}
