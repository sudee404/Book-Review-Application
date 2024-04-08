"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Hero from "../../components/Hero";
import Highlights from "../../components/Highlights";
import Pricing from "../../components/Pricing";
import Features from "../../components/Features";
import Testimonials from "../../components/Testimonials";
import FAQ from "../../components/FAQ";

export default function Page() {
	return (
		<>
			<Hero />
			<Box>
				<Features />
				<Divider />
				<Testimonials />
				<Divider />
				<Highlights />
				<Divider />
				<Pricing />
				<Divider />
				<FAQ />
			</Box>
		</>
	);
}
