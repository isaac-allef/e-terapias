import { Box } from "@chakra-ui/layout";
import Header from "./Header";

export default function Layout({ children }) {
    return (
        <Box>
            <Header />
            { children }
        </Box>
    )
}