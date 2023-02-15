import { StarIcon } from "@chakra-ui/icons"
import { Avatar, Box, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Text } from "@chakra-ui/react"
import BookModal from "./BookModal"

export default function BookCard({ book }) {
	const property = {
		title: book.title,
		author:
			book.author_name,
		cover: book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://dummyimage.com/180x120/dbdbdb/787878.png&text=Image+cap",
		publisher: book.publisher,
		publish_date: book.first_publish_year,
		edition_count: book.edition_count,
		oclc: book.oclc,
		ia: book.ia,
		rating: 4,
	}
	return (
		<Card maxW='md' p={2} shadow={'md'}>

			<CardBody>
				<Heading size='md'>{property.title}</Heading>

			</CardBody>
			<Image
				objectFit='cover'
				src={property.cover}
				alt='Chakra UI'
				height={'18rem'}
				className="card-img-top rounded-3"
			/>

			<CardFooter
				justify='space-between'
				alignItems='center'
				flexWrap='wrap'
				sx={{
					'& > button': {
						minW: '136px',
					},
				}}
			>
				<BookModal book={book} />
				<span>
					{Array(5)
						.fill('')
						.map((_, i) => (
							<StarIcon
								key={i}
								color={i < property.rating ? 'teal.500' : 'gray.300'}
							/>
						))}
				</span>
			</CardFooter>
		</Card>
	)
}