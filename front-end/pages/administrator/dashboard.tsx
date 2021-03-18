import { Divider, Flex } from "@chakra-ui/layout";
import Card from "../../components/shared/Card";
import MyTitle from "../../components/shared/MyTitle";
import Icon from "@chakra-ui/icon";
import { IoIosJournal, IoIosPeople } from "react-icons/io";
import { RiPsychotherapyFill } from "react-icons/ri";
import { AiFillCopy } from "react-icons/ai";

export default function Dashboard() {
    return (
        <>
            <MyTitle>DASHBOARD</MyTitle>
            <Flex direction={'column'}>
                <Flex>
                    <Card
                     icon={<Icon as={IoIosJournal} />}
                     title={'Field journals'}
                     description={"Catch up on what's been cookin' at \
                                    Smashing and explore some of the \
                                    mostpopular community resources."}
                     link='/'
                    />
                    <Card
                     icon={<Icon as={RiPsychotherapyFill} />}
                     title={'E-terapias'}
                     description={"Catch up on what's been cookin' at \
                                    Smashing and explore some of the \
                                    mostpopular community resources."}
                     link='/'
                    />
                </Flex>
                <Flex>
                <Card
                     icon={<Icon as={AiFillCopy} />}
                     title={'Field journals Templates'}
                     description={"Catch up on what's been cookin' at \
                                    Smashing and explore some of the \
                                    mostpopular community resources."}
                     link='/'
                    />
                    <Card
                     icon={<Icon as={IoIosPeople} />}
                     title={'Moderators'}
                     description={"Catch up on what's been cookin' at \
                                    Smashing and explore some of the \
                                    mostpopular community resources."}
                     link='/administrator/listModerators'
                    />
                </Flex>
            </Flex>

            <Divider />
        </>
    )
}