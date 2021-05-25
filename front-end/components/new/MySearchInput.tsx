import { SearchIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"

type params = {
    placeholder: string;
    handleChange?: Function;
}

export default function MySearchInput({ placeholder, handleChange }: params) {
    return (
        <InputGroup>
            <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                />
            <Input 
                placeholder={ placeholder }
                onChange={(e) => handleChange ? handleChange(e.target.value) : null}
            />
        </InputGroup>
    )
}