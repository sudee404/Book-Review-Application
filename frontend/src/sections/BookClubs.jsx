import React, { useState } from "react";
import { Input, Flex, Box, Image, Heading, Text, Button } from "@chakra-ui/react";
import ClubCard from "../components/ClubCard";

const BookClubs = () => {
	const bookClubs = [
		{
			id: 1,
			name: "The Classics Club",
			description: "We read and discuss classic literature from around the world.",
			image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
			members: 25
		},
		{
			id: 2,
			name: "Science Fiction Society",
			description: "We explore the cutting edge of science fiction and discuss the social implications of new technology.",
			image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
			members: 18
		},
		{
			id: 3,
			name: "Mystery and Thriller Group",
			description: "We delve into the darker side of literature and explore the world of mystery and suspense.",
			image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
			members: 14
		},
		{
			id: 4,
			name: "The Classics Club",
			description: "We read and discuss classic literature from around the world.",
			image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
			members: 25
		},
		{
			id: 5,
			name: "Science Fiction Society",
			description: "We explore the cutting edge of science fiction and discuss the social implications of new technology.",
			image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
			members: 18
		},
		{
			id: 6,
			name: "Mystery and Thriller Group",
			description: "We delve into the darker side of literature and explore the world of mystery and suspense.",
			image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
			members: 14
		},
		// Add more book clubs here...
	];

	const [search, setSearch] = useState("");

	const filteredBookClubs = bookClubs.filter((bookClub) => {
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
					<Box mb={6} w="80%" mx={'auto'}>
						<Input
							placeholder="Search book clubs"
							value={search}
							onChange={(event) => setSearch(event.target.value)}
						/>
					</Box>

				</div>
			</div>

			<div className="row row-cols-sm-1 row-cols-lg-2 justify-content-center align-items-center g-4 mx-0">

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

		</>
	);
};

export default BookClubs;
