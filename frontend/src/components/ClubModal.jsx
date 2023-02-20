import React from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Button,
	useDisclosure} from '@chakra-ui/react'
import ClubDetail from './ClubDetail'

export default function ClubModal({ club }) {

	const Overlay = () => (
		<ModalOverlay
			bg=''
			backdropFilter='auto'
			backdropInvert='70%'
			backdropBlur='2px'
		/>
	)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [overlay, setOverlay] = React.useState(<Overlay />)

	



	if (!isOpen) {
		return <Button size={'md'}
			colorScheme={'orange'}
			onClick={() => {
				setOverlay(<Overlay />)
				onOpen()
			}}
			_hover={{ boxShadow: "0 0 0 2px rgba(255, 99, 71, 0.5)", color: 'white', colorScheme: 'blackAlpha.300' }}>
			Check it Out
		</Button>

	}
	return (
		<>


			<Modal isOpen={isOpen} size={'l'} onClose={onClose}>
				{overlay}
				<ModalContent>
					<ModalHeader className='fw-bold fs-2 text-center my-3' >Club Page - <span className='text-danger'>{club.name}</span></ModalHeader>
					<ModalBody>
						<ClubDetail clubId={club.id}/>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Back</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}