import React from 'react'
import Img from "../images/books/img2.png";

const books = [1,2,3,4,5,6,7,8,9]
export default function Products() {
	return (
		<div>
			<div className="pt-4 fs-1 fw-bold text-start ps-4">
				<span className="text-danger">Most</span> Popular Books
			</div>
			<div className="row mx-0 justify-content-evenly py-4 g-4">
				{books.map((book) => (
					<div className='col-lg-3 '>
						<div className="card shadow h-100">
							<img src={Img} className="card-img-top" alt="..." />
							<div className="card-body">
								<h5 className="card-title">Card title</h5>
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								<a href="#" className="btn btn-primary my-2">View</a>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
