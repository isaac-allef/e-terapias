import { Box, Center, Flex } from "@chakra-ui/layout";
import Card from "../../components/shared/Card";
import MyTitle from "../../components/shared/MyTitle";
import Icon from "@chakra-ui/icon";
import { IoIosJournal, IoIosPeople } from "react-icons/io";
import { RiPsychotherapyFill } from "react-icons/ri";
import { AiFillCopy } from "react-icons/ai";
import Layout from "../../components/shared/Layout";
import MyDivider from "../../components/shared/MyDivider";

export default function Dashboard() {
    return (
        <Layout>
            <Center><MyTitle>DASHBOARD</MyTitle></Center>
            <Flex direction={'column'} alignItems='center'>
                <Flex>
                    <Box
                        marginRight='.5rem'
                        marginBottom='.5rem'
                    >
                    <Card
                     icon={<Icon as={IoIosJournal} />}
                     title={'Field journals'}
                     description={"Here it is possible to view and delete all moderator field journals."}
                     link='/administrator/fieldJournals/list'
                    />
                    </Box>

                    <Box
                        marginLeft='.5rem'
                        marginBottom='.5rem'
                    >
                    <Card
                     icon={<Icon as={RiPsychotherapyFill} />}
                     title={'E-terapias'}
                     description={"Here it is possible to create and manage all eterapias."}
                     link='/administrator/eterapias/list'
                    />
                    </Box>
                </Flex>
                <Flex>
                    <Box
                        marginRight='.5rem'
                        marginTop='.5rem'
                    >
                    <Card
                     icon={<Icon as={AiFillCopy} />}
                     title={'Field journals Templates'}
                     description={"Here it is possible to create and manage all field journal templates."}
                     link='/administrator/fieldJournalsTemplates/list'
                    />
                    </Box>
                    <Box
                        marginLeft='.5rem'
                        marginTop='.5rem'
                    >
                    <Card
                     icon={<Icon as={IoIosPeople} />}
                     title={'Moderators'}
                     description={"Here it is possible to create and manage all moderators."}
                     link='/administrator/moderators/list'
                    />
                    </Box>
                </Flex>
            </Flex>

            <MyDivider />
        </Layout>
    )
}