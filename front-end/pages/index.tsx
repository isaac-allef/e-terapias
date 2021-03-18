// import Head from 'next/head';
import Link from "next/link";
import Card from "../components/shared/Card";
import { GrUserExpert } from 'react-icons/gr';
import { GrUserAdmin } from 'react-icons/gr';

import MyTitle from "../components/shared/MyTitle";
import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";

export default function Home() {
  return (
    <>
    <MyTitle>Welcome. Do you are a moderator or administrator?</MyTitle>
    <Flex>
      <Card
        icon={<Icon as={GrUserExpert} />}
        title={'Moderator'}
        description={"Catch up on what's been cookin' at \
                      Smashing and explore some of the \
                      mostpopular community resources."}
        link='/login/moderator'
      />
      <Card
        icon={<Icon as={GrUserAdmin} />}
        title={'Administrator'}
        description={"Catch up on what's been cookin' at \
                      Smashing and explore some of the \
                      mostpopular community resources."}
        link='/login/administrator'
      />
    </Flex>
    </>
  )
}
