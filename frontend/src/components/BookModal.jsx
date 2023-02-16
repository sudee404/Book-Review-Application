import React from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Text,
	useDisclosure
} from '@chakra-ui/react'
import Reviews from '../sections/Reviews'
import { useState } from 'react'
import { LoaderOne } from './Loader'
import { StarIcon } from '@chakra-ui/icons'
import ReviewModal from './ReviewModal'

export default function BookModal(props) {

	const OverlayOne = () => (
		<ModalOverlay
			bg='none'
			backdropFilter='auto'
			backdropInvert='70%'
			backdropBlur='2px'
		/>
	)

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [overlay, setOverlay] = React.useState(<OverlayOne />)
	const [book, setBook] = useState(props.book)
	const [loading, setLoading] = useState(true);
	const [rating, setRating] = useState(5)

	const handleImageLoad = (e) => {
		e.preventDefault()
		setLoading(false);
	};

	return (
		<>
			<button
				className="btn btn-success"
				onClick={() => {
					setOverlay(<OverlayOne />)
					onOpen()
				}}
			>
				View
			</button>

			<Modal isOpen={isOpen} size={'l'} onClose={onClose}>
				{overlay}
				<ModalContent>
					<ModalHeader className='fw-bold fs-2 text-center'>{book.title}</ModalHeader>
					<ModalBody>
						<div className="row align-items-center mx-0 justify-content-center" style={{ height: '"60vh"}}' }}>
							<div className="col-md-6">
								<div className="h-100 p-lg-5 ">
									{loading && <LoaderOne />}
									<img
										src={book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : "https://dummyimage.com/180x120/dbdbdb/787878.png&text=Image+cap"}
										className="card-img-top rounded"
										alt="..."
										style={{ width: "18rem", display: loading ? "none" : "block" }}
										onLoad={handleImageLoad}
										loading={loading ? "eager" : "lazy"}
									/>
								</div>
							</div>
							<div className="col-md-6 d-flex justify-content-start align-items-center">
								<div className="p-5 mb-4 bg-light rounded-3">
									<ul className="list-group fw-bold text-center ">
										<li className="list-group-item active px-4" aria-current="true">{book.title}</li>
										<li className="list-group-item">By : A {book.author_name}</li>
										<li className="list-group-item">Published : {book.first_publish_year}</li>
										<li className="list-group-item">
											{Array(5)
												.fill('')
												.map((_, i) => (
													<StarIcon
														key={i}
														onClick={() => setRating(i + 1)}
														color={i < rating ? 'teal.500' : 'gray.300'}
													/>
												))}
										</li>
									</ul>
									<div className="text-center my-3 d-flex justify-content-between">
										<Button
											onClick={() => {
												setOverlay(<OverlayOne />)
												onOpen()
											}}
											bg={'purple'}
										>
										Read
										</Button>
										<ReviewModal />
									</div>
								</div>
							</div>
						</div>
						<Reviews title={true} />
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Back</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}