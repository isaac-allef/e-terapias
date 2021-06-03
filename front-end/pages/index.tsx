import Card from "../components/shared/Card";
import { GrUserExpert } from 'react-icons/gr';
import { GrUserAdmin } from 'react-icons/gr';
import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import Image from 'next/image';

export default function Home() {
  return (
    <Flex height='100vh' alignItems='center' justifyContent='center'>
      <Flex flexDirection='column' padding='50px'>
        <Image
          src="/welcome.png"
          alt="Welcome! Do you are a moderator or manager?"
          width={'fill'}
          height={400}
        />

        <Flex marginTop='20px'>
          <Card
            icon={<Icon as={GrUserExpert} />}
            title={'Moderator'}
            description={'Submit your field journals from templates and manage them.'}
            link='/new/login/moderator'
          />
          <Card
            icon={<Icon as={GrUserAdmin} />}
            title={'Manager'}
            description={'Manage moderators and etherapies, create templates for multiple field journals at the same time and track your deliveries.'}
            link='/new/login/manager'
          />
        </Flex> 
      </Flex>
    </Flex>
  )
}
