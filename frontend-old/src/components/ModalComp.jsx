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
	useDisclosure
} from '@chakra-ui/react'

export default function ModalComp({ title, element, button ,size}) {
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

	if (!isOpen) {
		return <Button colorScheme={'facebook'} _hover={{ bg: 'tomato' }} m={'3'}
			onClick={() => {
				setOverlay(<OverlayTwo />)
				onOpen()
			}}
			loadingText='Joining'>
			{button}
		</Button>
	}

	return (
		<>
			<Modal size={size} isOpen={isOpen} onClose={onClose}>
				{overlay}
				<ModalContent>
					<ModalCloseButton />
					<ModalBody>
						{element}
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}