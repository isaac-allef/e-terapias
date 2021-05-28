import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import Header from "./Header";

export default function Layout({ menu, children }) {
    return (
        <Flex h='100vh' flexDirection='column'>
            <Header />
            <Grid
            templateColumns="repeat(5, 1fr)"
            flex='1'
            >
                <GridItem colSpan={1}>
                    { menu }
                </GridItem>
                <GridItem colSpan={4}>
                    <Box
                        marginTop='2rem'
                        marginLeft='5rem'
                        marginRight='5rem'
                    >
                        { children }
                    </Box>
                </GridItem>
            </Grid>
        </Flex>
    )
}