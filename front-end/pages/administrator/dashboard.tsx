import { Divider, Flex } from "@chakra-ui/layout";
import Card from "../../components/shared/Card";
import MyTitle from "../../components/shared/MyTitle";
import Icon from "@chakra-ui/icon";
import { IoIosJournal, IoIosPeople } from "react-icons/io";
import { RiPsychotherapyFill } from "react-icons/ri";
import { AiFillCopy } from "react-icons/ai";
import Layout from "../../components/shared/Layout";

export default function Dashboard() {
    return (
        <Layout>
            <MyTitle>DASHBOARD</MyTitle>
            <Flex direction={'column'}>
                <Flex>
                    <Card
                     icon={<Icon as={IoIosJournal} />}
                     title={'Field journals'}
                     description={"Catch up on what's been cookin' at \
                                    Smashing and explore some of the \
                                    mostpopular community resources."}
                     link='/administrator/fieldJournals/list'
                    />
                    <Card
                     icon={<Icon as={RiPsychotherapyFill} />}
                     title={'E-terapias'}
                     description={"Catch up on what's been cookin' at \
                                    Smashing and explore some of the \
                                    mostpopular community resources."}
                     link='/administrator/eterapias/list'
                    />
                </Flex>
                <Flex>
                <Card
                     icon={<Icon as={AiFillCopy} />}
                     title={'Field journals Templates'}
                     description={"Catch up on what's been cookin' at \
                                    Smashing and explore some of the \
                                    mostpopular community resources."}
                     link='/administrator/fieldJournalsTemplates/list'
                    />
                    <Card
                     icon={<Icon as={IoIosPeople} />}
                     title={'Moderators'}
                     description={"Catch up on what's been cookin' at \
                                    Smashing and explore some of the \
                                    mostpopular community resources."}
                     link='/administrator/moderators/list'
                    />
                </Flex>
            </Flex>

            <Divider />
        </Layout>
    )
}