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

export default function ReviewModal() {
	const OverlayOne = () => (
		<ModalOverlay
			bg='none'
			backdropFilter='auto'
			backdropInvert='80%'
			backdropBlur='2px'
		/>
	)

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [overlay, setOverlay] = React.useState(<OverlayOne />)

	return (
		<>
			<Button
				onClick={() => {
					setOverlay(<OverlayOne />)
					onOpen()
				}}
				bg={'tomato'}
			>
				Review
			</Button>
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				{overlay}
				<ModalContent>
					<ModalHeader>Leave a Review</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
							<div className="form-floating">
								<textarea className="form-control " placeholder="Leave a review here" id="floatingTextarea" rows={5}></textarea>
								<label htmlFor="floatingTextarea">Review</label>
							</div>
					</ModalBody>
					<ModalFooter >
						<Button onClick={onClose} className="mx-3" bg={'green'}>Submit</Button>

						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}