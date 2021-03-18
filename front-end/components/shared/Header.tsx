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
            position='sticky'
            justifyContent='space-between'
            py='1rem'
            bgColor='white'
            borderBottom='1px solid'
            borderColor='gray.100'
            marginBottom='3rem'
        >
            <Heading><Link href={headingLink}>E-Terapias</Link></Heading>
            <HStack spacing='6'>
                <Button variant='link'>About</Button>
                <Button variant='link' onClick={() => {
                    localStorage.setItem('@eterapias:token', null);
                    localStorage.setItem('@eterapias:myId', null);
                    router.push('/');
                }}><IoLogOutSharp /></Button>
            </HStack>
        </Flex>
    )
}