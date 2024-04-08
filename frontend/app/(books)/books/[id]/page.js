"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Highlights from "../../../../components/Highlights";
import Pricing from "../../../../components/Pricing";
import BookDetails from "../../../../components/BookDetails";
import BookReviews from "../../../../components/Reviews";
import FAQ from "../../../../components/FAQ";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }) {
	const { id } = params;

	const { data } = useQuery({
		queryKey: ["book", id],
		queryFn: async () => {
			const res = await fetch(`https://openlibrary.org/works/${id}.json`);
			return res.json();
		},
		enabled: !!id,
		staleTime: 1000 * 60 * 60 * 24,
		cacheTime: 1000 * 60 * 60 * 24,
		
	});


	return (
		<Box>
			<BookDetails book={data} />
			<Divider />
			<BookReviews bookId={id} />
			<Divider />
			<Highlights />
			<Divider />
			<Pricing />
			<Divider />
			<FAQ />
		</Box>
	);
}
