import React from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Button,
	useDisclosure,
	Avatar
} from '@chakra-ui/react'

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
					<ModalHeader className='fw-bold fs-2 text-center' >Club Page - <span className='text-danger'>{club.name}</span></ModalHeader>
					<ModalBody>
						<div className="row mx-0 align-items-center">
							<div className="col-md-6 mb-3">
								<div className="card border-0">
									<img src={club.poster || "https://dummyimage.com/720x240/343434/454545.png&text=Image+cap"} className="card-img rounded" alt="..." style={{ maxHeight: '70vh',objectFit:'contain' }} />
									<div className="card-img-overlay ">
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="p-2 mb-4 bg-light rounded-3">
									<div className="container-fluid py-5">
										<h1 className="display-5 fw-bold">{club.name}</h1>
										<small className="text-info">Description:</small>
										<p className="col-md-8 fs-4">{club.description}</p>
										<small className="text-success">Members:</small>
										<p className="col-md-8 fs-4">{club.members.length} members</p>
										<small className="text-primary">Owner:</small>
										<div className="card border-0 bg-transparent" style={{maxWidth: 540}}>
											<div className="row mx-0 align-items-center">
												<div className="col-md-2 text-center">
													<Avatar src="https://dummyimage.com/540x1024/919191/7a7a7a&text=image" />
												</div>
												<div className="col-md-10">
													<div className="card-body">
														<h5 className="card-title fw-bold">Marshall mathews</h5>
														<p className="card-text">Tech prodigy with a nack for medicine</p>
														<p className="card-text"><small className="text-muted">Created <span className='text-success'>{new Date(club.created_at).toLocaleDateString()}</span></small></p>
													</div>
												</div>
											</div>
										</div>
										<div className="d-flex justify-content-center align-items-center">
											<Button colorScheme={'whatsapp'} mt={'3'}>
												Join Club
											</Button>
										</div>
									</div>
								</div>

							</div>

						</div>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Back</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}