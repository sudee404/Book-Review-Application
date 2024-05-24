"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import BookDetails from "../../../../components/book/BookDetails";
import BookReviews from "../../../../components/book/Reviews";
import { useQuery } from "@tanstack/react-query";
import AddToClub from "../../../../components/clubs/AddToClub";
import BookList from "../../../../components/book/BookList";

export default function Page({ params }) {
	const { id } = params;

	const { data, isLoading } = useQuery({
		queryKey: ["book", id],
		queryFn: async () => {
			const res = await fetch(`https://openlibrary.org/works/${id}.json`);
			return res.json();
		},
		enabled: !!id,
		staleTime: 1000 * 60 * 60 * 24,
		cacheTime: 1000 * 60 * 60 * 24,
	});
		console.log(data)
	return (
		<Box>
			<BookDetails loading={isLoading} book={data} />
			<Divider />
			<BookReviews bookId={id} />
			<Divider />
			<AddToClub bookId={id} />
			<Divider />
			<BookList author={data?.authors?.length ? data?.authors[0]?.author?.key : ''} />
			<Divider />
		</Box>
	);
}
