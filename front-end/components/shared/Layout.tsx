import { Box, Grid, GridItem } from "@chakra-ui/layout";
import MyMenu from "../new/MyMenu";
import Header from "./Header";

export default function Layout({ children }) {
    return (
        <Box>
            <Header />
            <Grid
            templateColumns="repeat(5, 1fr)"
            >
                <GridItem colSpan={1}>
                    <MyMenu />
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
        </Box>
    )
}