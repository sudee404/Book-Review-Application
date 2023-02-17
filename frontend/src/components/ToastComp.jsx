import { Button, useToast, Wrap, WrapItem } from '@chakra-ui/react'

export default function ToastComp({title}) {
	const toast = useToast();
	
	return toast({
		title: `${title}`,
		position: "bottom-left",
		isClosable: true,
	})


}
