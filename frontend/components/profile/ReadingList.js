import { Box, Container, Pagination, Typography } from "@mui/material";
import BookCard, { BookCardPlaceHolder, BookIdCard } from "../book/BookCard";
import Masonry from "@mui/lab/Masonry";

export default function ReadingList({ books, loading, isOwner, isMember }) {
	return (
		<Container
			id="reading"
			sx={{
				pt: { xs: 4, sm: 12 },
				pb: { xs: 8, sm: 16 },
				position: "relative",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: { xs: 3, sm: 6 },
			}}
		>
			{" "}
			<Box
				sx={{
					width: { sm: "100%", md: "60%" },
					textAlign: { sm: "left", md: "center" },
				}}
			>
				<Typography component="h2" variant="h4" color="text.primary">
					Currently Reading
				</Typography>
				<Typography variant="body1" color="text.secondary">
					See books you are intrested in and currently reading below.
				</Typography>
			</Box>
			
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
