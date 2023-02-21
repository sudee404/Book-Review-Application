import React, { useEffect, useState } from 'react'
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuList, MenuItem, Flex, ButtonGroup, useToast } from "@chakra-ui/react";
import { addUserBook, getUserBooks } from '../endpoints/api';
import { useSelector } from 'react-redux';

export default function AddUserBook({ bookId }) {
	const token = useSelector((state) => state.user.token);
	const userId = useSelector((state) => state.user.id);
	const [status, setStatus] = useState('')
	const [select, setSelect] = useState(false)
	const toast = useToast();

	const statusChoices = [
		{ value: 'CR', label: 'Currently Reading' },
		{ value: 'PR', label: 'Planning to Read' },
		{ value: 'AR', label: 'Already Read' }
	];
	const statuses = {
		'CR': 'Currently Reading',
		'PR': 'Planning to Read',
		'AR': 'Already Read'
	}
	const showToast = (status, message) => {
		return toast({
			title: status,
			description: message,
			status: status,
			duration: 3000,
			isClosable: true,
		})
	}

	const handleAddList = async (choice) => {
		const data = { 'status': choice, 'bookId': bookId }
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		await addUserBook(data, config)
			.then((response) => {
				showToast('success', response.data['message'])
				setSelect(!select)
			})
			.catch((errors) => {
				console.log(errors)
				if (errors.response.data['error']) {
					showToast('error', errors.response.data['error'][0])
				} else {
					showToast('error', 'Something went wrong')
				}


			})
	}
	useEffect(() => {
		if (select) {
			setSelect(!select)
		}
		getUserBooks(bookId, userId)
			.then(res => {
				setStatus(res.data['status'])
				console.log(res.data['status'])
			})
			.catch(err => console.log(err))

	}, [bookId, userId, select])



	return (
		<div className="col-12">
			<Flex justifyContent={'center'}>
				<ButtonGroup>
					<Button bg="bisque">{status ? statuses[status] : 'Add to list'}</Button>
					<Menu isLazy>
						<MenuButton
							as={Button}
							bg="bisque"
							ml="-1px"
							borderWidth="1px"
							borderLeftWidth="0"
							_hover={{ bg: "bisque" }}
							_focus={{ boxShadow: "none" }}
							_active={{ bg: "bisque" }}
						>
							<ChevronRightIcon />
						</MenuButton>
						<MenuList
							bg="white"
							borderWidth="1px"
							borderStyle="solid"
							borderColor="gray.200"
							boxShadow="lg"
							minW="unset"
							w="fit-content"
							maxH="20rem"
							overflowY="auto"
							overflowX="hidden"
							py={2}
							rounded="md"
							transition="all 0.3s"
							zIndex={999}
						>
							{statusChoices.map((choice, idx) => (
								<MenuItem key={idx} value={choice.value} onClick={() => handleAddList(choice.value)}>{choice.label}</MenuItem>
							))}
						</MenuList>
					</Menu>
				</ButtonGroup>
			</Flex>

		</div>
	)
}
