import { Flex, Box, Heading, Text, Button, Image } from "@chakra-ui/react";

const MyBooks = () => {
	const books = [
		{
			id: 1,
			title: "The Lord of the Rings",
			author_name: ["J. R. R. Tolkien"],
			cover_i: 123,
		},
		{
			id: 2,

			title: "The Lord of the Rings",

			author_name: ["J. R. R. Tolkien"],
			cover_i: 123,

		},
		{




			id: 3,
			title: "The Lord of the Rings",
			author_name: ["J. R. R. Tolkien"],
			cover_i: 123,
		},
		{
			id: 4,
			title: "The Lord of the Rings",
			author_name: ["J. R. R. Tolkien"],
			cover_i: 123,
		},
		{
			id: 5,
			title: "The Lord of the Rings",
			author_name: ["J. R. R. Tolkien"],
			cover_i: 123,
		}]
	return (
		<Flex
			direction="column"
			align="center"
			justify="center"
			bg="gray.50"
			py={10}
		>
			<Heading as="h1" mb={6} textAlign="center">
				My Books
			</Heading>
			<Flex direction={["column", "row"]} wrap="wrap" justify="center">
				{books.map((book) => (
					<Box
						key={book.id}
						bg="white"
						rounded="lg"
						overflow="hidden"
						shadow="lg"
						mx={2}
						mb={6}
						w={["80%", "45%"]}
						maxW="450px"
					>
						<Image
							src={
								book.cover_i
									? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
									: "https://dummyimage.com/200x300/cccccc/000000.png&text=No+Cover+Available"
							}
							alt={book.title}
							w="100%"
							h="auto"
						/>
						<Box p={4}>
							<Heading as="h3" size="md" mb={2} noOfLines={1}>
								{book.title}
							</Heading>
							<Text mb={2} noOfLines={2}>
								{book.author_name && book.author_name.join(", ")}
							</Text>
							<Button colorScheme="teal" size="sm">
								View Details
							</Button>
						</Box>
					</Box>
				))}
			</Flex>
		</Flex >
	);
};

export default MyBooks;
