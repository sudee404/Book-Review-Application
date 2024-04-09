"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FAQ from "../../../components/sections/FAQ";
import ClubsList from "../../../components/clubs/ClubsList";

export default function Page() {
	return (
			<Box>
				<ClubsList />
				<Divider />
				<FAQ />
			</Box>
	);
}
