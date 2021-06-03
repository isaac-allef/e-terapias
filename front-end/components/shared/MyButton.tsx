import { DeleteIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react"

export default function MyButton({ styleType='normal', children=null, ...props }) {
    return (
            styleType === 'delete' ?
            <Button 
                colorScheme="red"
                { ...props }
                >
                <DeleteIcon />
                { children }
            </Button>
            :
            <Button 
                colorScheme='blue'
                { ...props } 
            >{ children }</Button>

    )
}