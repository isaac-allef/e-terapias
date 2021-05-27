import { Box, Center, Flex } from "@chakra-ui/layout";
import MyTitle from "../../components/shared/MyTitle";
import Layout from "../../components/shared/Layout";
import MyDivider from "../../components/shared/MyDivider";

export default function Dashboard() {
    return (
        <Layout>
            <Center><MyTitle>DASHBOARD</MyTitle></Center>
            <Flex direction={'column'} alignItems='center'>
                
            </Flex>

            <MyDivider />
        </Layout>
    )
}