import { Heading, Flex, HStack, Button } from "@chakra-ui/react";
import { IoLogOutSharp } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
    const [headingLink, setHeadingLink] = useState('/');

    useEffect(() => {
        const entity = localStorage.getItem('@eterapias:entity');

        if (entity === 'administrator') {
            setHeadingLink('/administrator/dashboard');
        } else if (entity === 'moderator') {
            setHeadingLink('/moderator/fieldJournals/list');
        }
    }, []);

    const router = useRouter();
    return (
        <Flex
            as='header'
            top={0}
            // position='sticky'
            justifyContent='space-between'
            py='1rem'
            bgColor='#151515'
            borderBottom='1px solid'
            borderColor='gray.500'
            paddingLeft='1rem'
            paddingRight='1rem'
            textColor='white'
        >
            <Flex>
            <Heading marginLeft='1rem'><Link href={headingLink}>E-Terapias</Link></Heading>
            </Flex>
            <HStack spacing='6'>
                <Button variant='link' textColor='white'>About</Button>
                <Button variant='link' textColor='white' onClick={() => {
                    localStorage.setItem('@eterapias:token', null);
                    localStorage.setItem('@eterapias:myId', null);
                    router.push('/');
                }}><IoLogOutSharp /></Button>
            </HStack>
        </Flex>
    )
}