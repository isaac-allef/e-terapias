import { Button } from "@chakra-ui/react"

export default function MyButton({ children, ...moreProps }) {
    return (
        <Button 
            colorScheme='blue'
            { ...moreProps } 
        >{ children }</Button>
    )
}