import React from 'react'
import Img1 from "../images/books/img4.png";
export default function About() {
	return (
		<div className="p-5 mb-4">
			<div className="container-fluid py-2">
				<h1 className="display-5 fw-bold">About</h1>
			</div>
			<div className="row align-items-md-stretch">
				<div className="col-md-6">
					<div className="h-100 p-lg-5 p-1 lead">
						Looking for a book review platform that's both fun and functional?
						Look no further than ReadUp! Our innovative app lets you track your reading progress, share your favorite titles with friends, and discover new books that you'll love.
						Whether you're a casual reader or a dedicated bookworm, ReadUp is the perfect companion for your literary journey.
						So join us today, and start exploring the wonderful world of books!
					</div>
				</div>
				<div className="col-md-6">
					<div className="h-100 p-5">
						<img src={Img1} className="img mx-auto" style={{objectFit:'cover',height:'250px'}} alt="..."/>
					</div>
				</div>
			</div>

		</div>

	)
}
