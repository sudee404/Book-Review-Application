import React from 'react'
import Img2 from "../images/books/img5.png";
import Img3 from "../images/books/img2.png";
import Img4 from "../images/books/img3.png";
const features = [
	{
		image: Img2, title: 'Discover', text: "Explore a vast collection of books, connect with like-minded readers, and uncover your next favorite title."
	},
	{
		image: Img3, title: 'Review', text: "Share your thoughts and opinions on books you've read, and discover new titles through our community-generated reviews and ratings."
	},
	{
		image: Img4, title: 'Track', text: "Keep track of books you've read, want to read, and are currently reading, all in one convenient location."
	},
]
export default function Services() {
	return (
		<div className='p-2'>
			<div className="p-5 mb-4 bg-secondary rounded-3">
				<div className="container-fluid py-2">
					<h1 className="display-5 fw-bold">Features</h1>
				</div>
			</div>

			<div className="row mx-0 justify-content-center g-4">
				{features.map((service, idx) => (
					<div className="p-lg-5 p-2 mb-4 bg-light rounded-3" key={idx}>
						{idx % 2 === 0 ?
							<div className="row mx-0 justify-content-center align-items-center pb-3">
								
								<div className="col">
									<h2 className="fw-bold fs-3 text-primary py-3">{service.title}</h2>
									<p className="fs-5">{service.text}</p>
								</div>
								<div className="col  d-none d-md-block">
									<img src={service.image} alt="" style={{height:'18rem',objectFit:'cover'}} className="img-fluid" />
								</div>
							</div>
							:
							<div className="row mx-0 justify-content-start align-items-center pb-3">
								<div className="col d-none d-md-block">
									<img src={service.image} alt="" style={{height:'18rem',objectFit:'cover'}} className="img-fluid" />
								</div>
								<div className="col">
									<h2 className="fw-bold fs-3 py-3">{service.title}</h2>
									<p className="fs-5">{service.text}</p>
								</div>
							</div>}
					</div>

				))}
			</div>
		</div>
	)
}
