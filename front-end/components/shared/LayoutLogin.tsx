import { Container, Flex } from "@chakra-ui/layout";

export default function LayoutLogin({ children }) {
    return (
        <Flex height='100vh' alignItems='center'>
            <Container 
                padding={16}
                borderWidth="1px" 
                rounded="md" 
            >
                { children }
            </Container>    
        </Flex>
    )
}