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
                     description={"Catch up on what's been cookin' at \
                                    Smashing and explore some of the \
                                    mostpopular community resources."}
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
                     description={"Catch up on what's been cookin' at \
                                    Smashing and explore some of the \
                                    mostpopular community resources."}
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
                     description={"Catch up on what's been cookin' at \
                                    Smashing and explore some of the \
                                    mostpopular community resources."}
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
                     description={"Catch up on what's been cookin' at \
                                    Smashing and explore some of the \
                                    mostpopular community resources."}
                     link='/administrator/moderators/list'
                    />
                    </Box>
                </Flex>
            </Flex>

            <MyDivider />
        </Layout>
    )
}