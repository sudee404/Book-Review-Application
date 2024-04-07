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
	Heading,
	useToast
} from '@chakra-ui/react'
import { createClub } from '../endpoints/api';
import { useSelector } from 'react-redux';


export default function ClubForm() {
	const [formData, setFormData] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [saving, setSaving] = useState(false)
	const token = useSelector((state) => state.user.token);
	const toast = useToast();
	const OverlayOne = () => (
		<ModalOverlay
			bg='blackAlpha.300'
			backdropFilter='blur(10px) hue-rotate(90deg)'
		/>
	)

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [overlay, setOverlay] = React.useState(<OverlayOne />)
	if (!isOpen) {
		return (<Button
			bg={'tomato'}
			my={'3'}
			onClick={() => {
				setOverlay(<OverlayOne />)
				onOpen()
			}}
		>
			Create Club
		</Button>)
	}
	const showToast = (status, message) => {
		return toast({
			title: "Success",
			description: message||'Club created successfully',
			status: status||'success',
			duration: 3000,
			isClosable: true,
		})
	}
	const handleChange = event => {
		if (event.target.name === 'poster') {
			setFormData({
				...formData,
				poster: event.target.files[0]
			});
		} else {
			setFormData({
				...formData,
				[event.target.name]: event.target.value
			});
		}
	};


	const handleSubmit = event => {
		event.preventDefault();
		setSaving(true)
		setFormErrors({});
		if (formData.name && formData.description && formData.poster) {
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			createClub(formData, config)
				.then((response) => {
					setSaving(false)
					showToast()
					onClose()
				})
				.catch((error) => {
					setFormErrors(error.response.data);
					if (formErrors['error']) {
						showToast('error', formErrors['error'])
					}
					setSaving(false)

				});
		} else {
			setFormErrors({ 'error': 'Form data is not properly populated' });
			setSaving(false)

		}
	};

	return (
		<>

			<Modal isOpen={isOpen} size={'l'} onClose={onClose}>
				{overlay}
				<ModalContent>
					<ModalHeader>
						<Heading size={'xl'} my={'5'} color={'yellowgreen'}>Create Book Club</Heading>

					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>

						<form className="card border-0 shadow" onSubmit={handleSubmit}>
							<div className="card-header">
								<Heading size={'lg'} color={'blackAlpha.400'}>Fill in the details below</Heading>
							</div>
							<div className="card-body">
								<div className="mb-3">
									<label htmlFor="poster" className="form-label fw-bold">Club Poster</label>
									<input onChange={handleChange} className="form-control" name='poster' type="file" id="poster" />
									<div id="textHelp" className="form-text">{formErrors['poster']}</div>
								</div>
								<div className="mb-3">
									<label htmlFor="club_name" className="form-label fw-bold">Club Name</label>
									<input onChange={handleChange} type="text" className="form-control" name='name' id="club_name" aria-describedby="textHelp" placeholder='Enter club name' />
									<div id="textHelp" className="form-text">{formErrors['name'] || 'Club names cannot be the same so pick a unique name.'}</div>

								</div>
								<div className="mb-3">
									<label htmlFor="description" className="form-label fw-bold">Club Description</label>
									<textarea onChange={handleChange} className="form-control" name='description' id="description" rows="4" placeholder='Brief description of the club'></textarea>
									<div id="textHelp" className="form-text">{formErrors['description']}</div>

								</div>

							</div>
							<ModalFooter>
								<Button type='submit'
									isLoading={saving}
									bg={'green.300'}
									mx={'5'}
									loadingText='Saving'
									variant='outline'
									spinnerPlacement='end'
								>
									Save
								</Button>
								<Button onClick={onClose}>Close</Button>
							</ModalFooter>
						</form>


					</ModalBody>

				</ModalContent>
			</Modal>
		</>
	)
}