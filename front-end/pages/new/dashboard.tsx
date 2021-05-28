import { Box, Center, Flex } from "@chakra-ui/layout";
import MyTitle from "../../components/shared/MyTitle";
import Layout from "../../components/shared/Layout";
import MyDivider from "../../components/shared/MyDivider";
import MyMenu from "../../components/new/MyMenu";

export default function Dashboard() {
    return (
        <Layout menu={<MyMenu manager={true} />}>
            <Center><MyTitle>DASHBOARD</MyTitle></Center>
            <Flex direction={'column'} alignItems='center'>
                
            </Flex>

            <MyDivider />
        </Layout>
    )
}