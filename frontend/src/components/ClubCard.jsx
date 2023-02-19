import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function ClubCard({ club }) {
	const [shadow, setShadow] = useState('md');


	return (
		<div className='col'>
			<Card
				direction={{ base: 'column', sm: 'row' }}
				overflow='hidden'
				variant='outline'
				shadow={shadow}
				border={'0'}
				onMouseOver={() => {
					setShadow('dark-lg');
				}}
				onMouseOut={() => {
					setShadow('md');
				}}
			>
				<Image
					objectFit='cover'
					maxW={{ base: '100%', sm: '200px' }}
					src={club.poster}
					alt={club.name}
				/>

				<Stack>
					<CardBody>
						<Heading size='md'>{club.name}</Heading>

						<Text py='2'>
							{club.description}
						</Text>
					</CardBody>

					<CardFooter className='d-flex justify-content-center'>
						<Button variant='solid' colorScheme={'whatsapp'} bg={'blue'}>
							Learn More
						</Button>
					</CardFooter>
				</Stack>
			</Card>
		</div>
	)
}
