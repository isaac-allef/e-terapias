import { Divider, Flex } from "@chakra-ui/layout";
import Card from "../../components/dashboard/Card";
import MyTitle from "../../components/shared/MyTitle";

export default function Dashboard() {
    return (
        <>
            <MyTitle>DASHBOARD</MyTitle>
            <Flex direction={'column'}>
                <Flex>
                    <Card
                     iconType={'journal'}
                     title={'Field journals'}
                     description={"Catch up on what's been cookin' at \
                                    Smashing and explore some of the \
                                    mostpopular community resources."}
                     link='/'
                    />
                    <Card
                     iconType={'therapy'}
                     title={'E-terapias'}
                     description={"Catch up on what's been cookin' at \
                                    Smashing and explore some of the \
                                    mostpopular community resources."}
                     link='/'
                    />
                </Flex>
                <Flex>
                <Card
                     iconType={'template'}
                     title={'Field journals Templates'}
                     description={"Catch up on what's been cookin' at \
                                    Smashing and explore some of the \
                                    mostpopular community resources."}
                     link='/'
                    />
                    <Card
                     iconType={'peoples'}
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