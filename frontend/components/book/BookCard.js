import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Skeleton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function BookCard({ book }) {
	const router = useRouter();

	const properties = {
		title: book?.title,
		author: book?.author_name,
		cover: book?.cover_i
			? `http://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`
			: "https://dummyimage.com/180x120/dbdbdb/787878.png&text=No+Cover",
		rating: 4,
		id: book?.key?.split("/").pop(),
	};

	return (
		<Card>
			<CardMedia
				sx={{ height: 250 }}
				image={properties?.cover}
				title="green iguana"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{properties?.title}
				</Typography>
				<Typography variant="div" color="text.secondary">
					<Typography
						variant="body2"
						color="text.primary"
						mb={1}
						noWrap
					>
						By {properties?.author}
					</Typography>
					<Typography variant="div" color="text.blue">
						Published in {book?.first_publish_year}
					</Typography>
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size="small"
					onClick={() => {
						router.push(`/books/${properties?.id}`);
					}}
				>
					Learn More
				</Button>
			</CardActions>
		</Card>
	);
}

export function BookIdCard({ bookId }) {
	const router = useRouter();

	const { data:book, isLoading } = useQuery({
		queryKey: ["book", bookId],
		queryFn: async () => {
			const response = await fetch(
				`https://openlibrary.org/works/${bookId}.json`
			);
			const data = await response.json();
			return data;
		},
		enabled: !!bookId,
	});

	const properties = {
		title: book?.title,
		author: book?.author_name,
		cover: 	book?.covers && book?.covers?.length > 0 ? `http://covers.openlibrary.org/b/id/${book?.covers[0]}-L.jpg` : "https://dummyimage.com/180x120/dbdbdb/787878.png&text=No+poster",
		id: book?.key?.split("/").pop(),
	};

	if (isLoading) {
		return <BookCardPlaceHolder />;
	}

	return (
		<Card>
			<CardMedia
				sx={{ height: 250 }}
				image={properties?.cover}
				title="green iguana"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{properties?.title}
				</Typography>

			</CardContent>
			<CardActions>
				<Button
					size="small"
					onClick={() => {
						router.push(`/books/${properties?.id}`);
					}}
				>
					Learn More
				</Button>
			</CardActions>
		</Card>
	);
}

export function BookCardPlaceHolder() {
	return (
		<Grid item xs={12} md={6} lg={4} xl={3}>
			<Card>
				<Skeleton variant="rectangular" height={250} />
				<CardContent>
					<Skeleton variant="text" height={50} />
					<Skeleton variant="text" />
					<Skeleton variant="text" />
				</CardContent>
				<CardActions sx={{ display: "flex" }}>
					<Skeleton
						variant="text"
						width={90}
						height={40}
						sx={{ mx: 1 }}
					/>
				</CardActions>
			</Card>
		</Grid>
	);
}
