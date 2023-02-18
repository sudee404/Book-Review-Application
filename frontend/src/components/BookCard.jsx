import { Heading } from "@chakra-ui/react"
import { useState } from "react";
import BookModal from "./BookModal"

export default function BookCard({ book }) {

	const [loading, setLoading] = useState(true);
	const [shadow, setShadow] = useState('md');

	const handleImageLoad = (e) => {
		e.preventDefault()
		setLoading(false);
	};

	const property = {
		title: book.title,
		author:
			book.author_name,
		cover: book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://dummyimage.com/180x120/dbdbdb/787878.png&text=Image+cap",
		rating: 4,
	}
	return (

		<div className={`card ${shadow} m-2`}
			onMouseOver={() => {
				setShadow('shadow-lg');
			}}
			onMouseOut={() => {
				setShadow('shadow-sm');
			}}
		>
			<img src={property.cover}
				className="card-img-top"
				alt="..."
				style={{ height: '18rem', objectFit: 'cover', display: loading ? "none" : "block" }}
				onLoad={handleImageLoad}
				loading={loading ? "eager" : "lazy"} />
			<div className="card-body row justify-content-center align-items-center">
				<div className="col-12"><Heading size='md'>{property.title}</Heading></div>
				<div className="lead col-12">{property.author}</div>
			</div>
			<div className="card-footer d-flex justify-content-center align-items-center">
				<BookModal book={book} />

			</div>
		</div>
	)
}