import { Container, Pagination, Typography } from "@mui/material";
import BookCard, { BookCardPlaceHolder, BookIdCard } from "../book/BookCard";
import Masonry from "@mui/lab/Masonry";

export default function ClubBooks({ books, loading, isOwner, isMember }) {
	console.log("books", books);
	return (
		<Container sx={{ my: 3 }}>
			<Typography variant="h4" gutterBottom>
				Club Books
			</Typography>
			{loading ? (
				<Masonry columns={{ xs: 1, md: 2, lg: 3, xl: 4 }} spacing={2}>
					{Array.from({ length: 10 }).map((book, idx) => (
						<BookCardPlaceHolder key={idx} />
					))}
				</Masonry>
			) : books?.length ? (
				<Masonry columns={{ xs: 1, md: 2, lg: 3, xl: 4 }} spacing={2}>
					{books?.map((book, idx) => (
						<BookIdCard key={idx} bookId={book?.book?.identifier} />
					))}
				</Masonry>
			) : (
				<Typography variant="h6" gutterBottom>
					No books yet
				</Typography>
			)}
		</Container>
	);
}
