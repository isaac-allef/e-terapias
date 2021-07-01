import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import Header from "./Header";

export default function Layout({ menu, children }) {
    return (
        <Flex h='100vh' flexDirection='column'>
            <Header />
            <Grid
            templateColumns="repeat(6, 1fr)"
            flex='1'
            >
                {
                    menu ? <GridItem colSpan={1}>
                            { menu }
                            </GridItem>
                    : null
                }
                <GridItem colSpan={menu ? 5 : 6}>
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