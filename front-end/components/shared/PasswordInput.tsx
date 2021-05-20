import { Button } from "@chakra-ui/button"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { useState } from "react"

export function PasswordInput({ props, id }) {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
  
    return (
		<InputGroup size='md'>
			<Input
				pr='4.5rem'
				type={show ? 'text' : 'password'}
				placeholder='Enter password'
				{ ...props }
				id={id}
			/>
			<InputRightElement width='4.5rem'>
				<Button h='1.75rem' size='sm' onClick={handleClick}>
					{show ? 'Hide' : 'Show'}
				</Button>
			</InputRightElement>
		</InputGroup>
    )
}