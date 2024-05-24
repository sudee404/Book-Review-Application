"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Hero from "../../components/sections/Hero";
import { useQuery } from "@tanstack/react-query";
import AllBookReviews from "../../components/book/AllReviews";
import BookList from "../../components/book/BookList";
import ClubsList from "../../components/clubs/ClubsList";

export default function Page({ params }) {
	const { id } = params;

	return (
		<Box>
			<Hero />
			<Divider />
			<ClubsList/>
			<Divider />
			<AllBookReviews />
			<Divider />
		</Box>
	);
}
