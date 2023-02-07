import React from 'react'
import Img2 from "../images/books/img5.png";
import Img3 from "../images/books/img2.png";
import Img4 from "../images/books/img3.png";
const services = [
	{
		image: Img2, title: 'Discover', text: "Discover new and exciting titles, connect with like- minded individuals, and find your next great read."
	},
	{
		image: Img3, title: 'Locate', text: "Browse our collection of user-generated reviews and ratings, "
	},
	{
		image: Img4, title: 'Contribute', text: "or add your own and be a part of our thriving book review community."
	},
]
export default function Services() {
	return (
		<div className='p-2 pt-5'>
			<h5 className="card-title fs-1 fw-bold py-3">
				Your Personal Library
			</h5>
			<p className="p-2 p-lg-3 fs-3 mb-3">
				Welcome to Your Personal Library - Your One-Stop
				Destination for All Your Reading Adventures! With a
				wealth of books at your fingertips, you can now keep
				track of all the books you've read, want to read, and
				are currently reading. So, come join us on this literary
				journey and create a virtual bookshelf that truly
				reflects your love for reading.
			</p>
			<div className="row mx-0 justify-content-center g-4">
				{services.map((service) => (
					<div className="col-lg-4 col-sm-12">
						<div className="my-2">
							<img src={service.image} className="card-img-top" alt="..." />

						</div>
						<div className="card border-primary mb-3">
							<div className="card-header fw-bold">{service.title}</div>
							<div className="card-body text-primary">
								<p className="card-text lead">{service.text}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
