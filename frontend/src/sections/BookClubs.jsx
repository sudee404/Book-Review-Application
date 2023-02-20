import React, { useState } from "react";
import { Input, Box, Text } from "@chakra-ui/react";
import ClubCard from "../components/ClubCard";
import ClubForm from "../components/ClubForm";
import { getClubs } from "../endpoints/api";
import { useEffect } from "react";

const BookClubs = () => {
	
	const [search, setSearch] = useState("");
	const [clubs, setClubs] = useState([])
	const [page, setPage] = useState(1)
	const [totalResults, setTotalResults] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [perPage, setPerPage] = useState(9);

	useEffect(() => {
		getClubs(page)
			.then(data => {
				setClubs(data.results)
				setTotalResults(data.count)
				setTotalPages(Math.ceil(data.count / perPage))
			})
			.catch(errors => console.log(errors))
	}, [page,perPage])

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
			{totalResults >= 9 && (
				<div className="col-12 p-lg-5 py-4">
					<nav aria-label="Page navigation example">
						<ul className="pagination justify-content-center">
							<li className={`page-item ${page === 1 ? "disabled" : ""}`}>
								<button
									className="page-link"
									disabled={page === 1}
									onClick={() => setPage(page - 1)}
								>
									Previous
								</button>
							</li>

							{[...Array(totalPages)].map((_, index) => {
								if (
									index + 1 === page ||
									(index + 1 >= page - 2 && index + 1 <= page + 2) ||
									index + 1 === totalPages
								) {
									return (
										<li
											key={index}
											className={`page-item ${index + 1 === page ? "active" : ""}`}
										>
											<button className="page-link" onClick={() => setPage(index + 1)}>
												{index + 1}
											</button>
										</li>
									);
								}
								if (
									index + 1 === page - 3 ||
									index + 1 === page + 3 ||
									index + 1 === 1
								) {
									return (
										<li key={index} className="page-item disabled">
											<span className="page-link">...</span>
										</li>
									);
								}
								return null;
							})}
							<li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
								<button
									className="page-link"
									disabled={page === totalPages}
									onClick={() => setPage(page + 1)}
								>
									Next
								</button>
							</li>
						</ul>
					</nav>

				</div>
			)}


		</>
	);
};

export default BookClubs;
