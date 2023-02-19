import React, { useState } from "react";
import { Input, Box, Text } from "@chakra-ui/react";
import ClubCard from "../components/ClubCard";
import ClubForm from "../components/ClubForm";
import { getClubs } from "../endpoints/api";
import { useEffect } from "react";

const BookClubs = () => {
	
	const [search, setSearch] = useState("");
	const [clubs, setClubs] = useState([])

	useEffect(() => {
		getClubs()
			.then(data => {
				console.log(data.results)
				setClubs(data.results)
			})
			.catch(errors => console.log(errors))
	}, [])

	const filteredBookClubs = clubs.filter((bookClub) => {
		return bookClub.name.toLowerCase().includes(search.toLowerCase());
	});

	return (
		<>
			<div className="p-5 mb-4 bg-light rounded-3">
				<div className="container-fluid py-3">
					<h1 className="display-5 fw-bold">Discover the Perfect Book Club for You</h1>
					<p className="col-md-8 mx-auto fs-4 py-4">
						Join a community of book lovers and connect with fellow readers around the world. Explore book clubs based on your interests and discover new literary treasures together.
					</p>
					<ClubForm />

				</div>
			</div>

			<div className="p-lg-5 p-2 mb-4">
				<Box mb={6} w="80%" mx={'auto'}>
					<Input
						placeholder="Search book clubs"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
					/>
				</Box>
				<div className="row row-cols-sm-1 row-cols-lg-3 justify-content-center align-items-center g-4 mx-0">

					{filteredBookClubs.length > 0 ? (
						filteredBookClubs.map((bookClub, idx) => (
							<ClubCard club={bookClub} key={idx} />
						))
					) : (
						<Box>
							<Text>No book clubs found.</Text>
						</Box>
					)}
				</div>
			</div>


		</>
	);
};

export default BookClubs;
