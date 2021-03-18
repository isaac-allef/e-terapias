import { Box } from "@chakra-ui/layout";
import Header from "./Header";

export default function Layout({ children }) {
    return (
        <Box>
            <Header />
            <Box
                marginTop='2rem'
                marginLeft='5rem'
                marginRight='5rem'
            >
                { children }
            </Box>
        </Box>
    )
}