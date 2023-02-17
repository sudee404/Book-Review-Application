import React from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Button,
	useDisclosure
} from '@chakra-ui/react'
import BookDetails from './BookDetails'

export default function BookModal({ book }) {

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
	const bookId = book.key.split('/').pop()


	if (!isOpen) {
		return <Button
			bg={'teal'}
			onClick={() => {
				setOverlay(<OverlayOne />)
				onOpen()
			}}
			
		>
			Book Details
		</Button>

	}
	return (
		<>


			<Modal isOpen={isOpen} size={'l'} onClose={onClose}>
				{overlay}
				<ModalContent>
					<ModalHeader className='fw-bold fs-2 text-center'>{book.title}</ModalHeader>
					<ModalBody>
						<BookDetails bookId={bookId} />
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Back</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}