import React, { useState } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	useToast
} from '@chakra-ui/react'
import { submitReview } from '../endpoints/api'
import { StarIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux';

export default function ReviewModal({ bookId }) {
	const OverlayOne = () => (
		<ModalOverlay
			bg='none'
			backdropFilter='auto'
			backdropInvert='80%'
			backdropBlur='2px'
		/>
	)

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [overlay, setOverlay] = useState(<OverlayOne />)
	const [review, setReview] = useState('')
	const [rating, setRating] = useState(0)
	const token = useSelector((state) => state.user.token);
	const toast = useToast();



	const handleChange = (e) => {
		setReview(e.target.value)
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		const data = { 'review': review, 'rating': rating, 'key': bookId }
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		await submitReview(data, config)
			.then((response) => {
				toast({
					title: "Success",
					description: response.data['message'],
					status: "success",
					duration: 3000,
					isClosable: true,
				});
				onClose()
			})
			.catch((errors) => {
				console.log(errors)
				if (errors.response.data['review']) {
					toast({
						title: "Warning!",
						description: 'Please type something first',
						status: "warning",
						duration: 3000,
						isClosable: true,
					});
				} else {
					toast({
						title: "Error.",
						description: "An error occured",
						status: "error",
						duration: 3000,
						isClosable: true,
					});
				}


			})
	}

	return (
		<>
			<Button
				onClick={() => {
					setOverlay(<OverlayOne />)
					onOpen()
				}}
				bg={'tomato'}
			>
				Leave a Review
			</Button>
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				{overlay}
				<ModalContent>
					<ModalHeader>Leave a Review</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<div className="form-floating">
							<textarea className="form-control " onChange={handleChange} value={review} placeholder="Leave a review here" id="floatingTextarea" rows={5}></textarea>
							<label htmlFor="floatingTextarea">Review</label>
						</div>
						<div className="p-3 text-center">
							{Array(5)
								.fill('')
								.map((_, i) => (
									<StarIcon
										key={i}
										onMouseOver={() => setRating(i + 1)}
										color={i < rating ? 'green.500' : 'gray.300'}
									/>
								))}
						</div>
					</ModalBody>
					<ModalFooter >
						<Button onClick={handleSubmit} className="mx-3" bg={'green'}>Submit</Button>

						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}