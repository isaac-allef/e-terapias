import { DeleteIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react"

export default function MyButton({ type='normal', children=null, ...moreProps }) {
    return (
            type === 'delete' ?
            <Button 
                colorScheme="red"
                { ...moreProps }
                >
                <DeleteIcon />
                { children }
            </Button>
            :
            <Button 
                colorScheme='blue'
                { ...moreProps } 
            >{ children }</Button>

    )
}