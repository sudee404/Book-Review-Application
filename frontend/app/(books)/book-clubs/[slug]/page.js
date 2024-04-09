"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FAQ from "../../../../components/sections/FAQ";
import ClubBanner from "../../../../components/clubs/ClubsBanner";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }) {
	const slug = params?.slug;
	const { data, isLoading } = useQuery({
		queryKey: ["club", slug],
		queryFn: async () => {
			const res = await fetch(`/api/clubs/${slug}`);
			const data = await res.json();
			return data;
		},
		enabled: !!slug,
	});

	console.log(data);
	return (
		<Box>
			<ClubBanner  club={data} />
			<Divider />
		</Box>
	);
}
