import { StarIcon } from "@chakra-ui/icons"
import { Heading } from "@chakra-ui/react"
import BookModal from "./BookModal"

export default function BookCard({ book }) {
	const property = {
		title: book.title,
		author:
			book.author_name,
		cover: book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://dummyimage.com/180x120/dbdbdb/787878.png&text=Image+cap",
		rating: 4,
	}
	return (
		
		<div className="card shadow-sm h-100">
			<img src={property.cover} className="card-img-top" style={{ height: '18rem', objectFit: 'cover' }} alt="..." />
			<div className="card-body row justify-content-center align-items-center">
				<div className="col-12"><Heading size='md'>{property.title}</Heading></div>
				<div className="lead col-12">{property.author }</div>
			</div>
			<div className="card-footer d-flex justify-content-center align-items-center">
				<BookModal book={book} />
				{/* <span>
					{Array(5)
						.fill('')
						.map((_, i) => (
							<StarIcon
								key={i}
								color={i < property.rating ? 'teal.500' : 'gray.300'}
							/>
						))}
				</span> */}
			</div>
		</div>
	)
}