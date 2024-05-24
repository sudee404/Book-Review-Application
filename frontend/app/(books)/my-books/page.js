"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Hero from "../../../components/sections/Hero";
import Highlights from "../../../components/sections/Highlights";
import Pricing from "../../../components/sections/Pricing";
import Features from "../../../components/sections/Features";
import Testimonials from "../../../components/sections/Testimonials";
import FAQ from "../../../components/sections/FAQ";
import ReadingList from "../../../components/profile/ReadingList";
import PlanningToRead from "../../../components/profile/PlanningToRead";

export default function Page() {
	return (
		<>
			<Box>
				<ReadingList />
				<Divider />
				<PlanningToRead />
				<Divider />
			</Box>
		</>
	);
}
