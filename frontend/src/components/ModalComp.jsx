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

export default function ModalComp() {
	const OverlayOne = () => (
		<ModalOverlay
			bg='blackAlpha.300'
			backdropFilter='blur(10px) hue-rotate(90deg)'
		/>
	)

	const OverlayTwo = () => (
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
			>
				Use Overlay one
			</Button>
			<Button
				ml='4'
				onClick={() => {
					setOverlay(<OverlayTwo />)
					onOpen()
				}}
			>
				Use Overlay two
			</Button>
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				{overlay}
				<ModalContent>
					<ModalHeader>{props.title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
							{props.body}
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}