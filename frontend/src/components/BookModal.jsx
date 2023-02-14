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
	const book = props.book;

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

			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				{overlay}
				<ModalContent>
					<ModalHeader className='fw-bold fs-2'>{book.title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<div className="card border-0">
							<img src={book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : "https://dummyimage.com/180x120/dbdbdb/787878.png&text=Image+cap"} className="card-img-top" alt="..." style={{ height: "18rem" }} />
							<div className="card-body">
								<p className="card-text">{book.text}</p>
							</div>
						</div>
						<Text>{props.bookId}</Text>
						
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}