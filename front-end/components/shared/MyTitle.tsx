import { Heading } from "@chakra-ui/layout";

export default function MyTitle({ children }) {
    return (
    <Heading marginBottom='2rem'>
        { children }
    </Heading>
    )
}