import { SearchIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"


export default function MyInput({ placeholder, password=false, search=false }) {
    return (
        <InputGroup>
            {
                search ? <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                /> : null
            }
            <Input 
                placeholder={ placeholder } 
                type={password ? "password" : "text"} 
            />
        </InputGroup>
    )
}