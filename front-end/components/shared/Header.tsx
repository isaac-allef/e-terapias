import { Heading, Flex, HStack, Button } from "@chakra-ui/react";
import { IoLogOutOutline, IoLogoGithub } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
    const [headingLink, setHeadingLink] = useState('/');

    useEffect(() => {
        const entity = localStorage.getItem('@etherapies:entity');

        if (entity === 'manager') {
            setHeadingLink('/new/dashboard');
        } else if (entity === 'moderator') {
            setHeadingLink('/new/myFieldJournalList');
        }
    }, []);

    const router = useRouter();
    return (
        <Flex
            as='header'
            top={0}
            // position='sticky'
            justifyContent='space-between'
            py='0.5rem'
            bgColor='#151515'
            borderBottom='1px solid'
            borderColor='gray.500'
            paddingLeft='1rem'
            paddingRight='1rem'
            textColor='white'
        >
            <Flex>
            <Heading size='lg' marginLeft='1rem'><Link href={headingLink}>E-Terapias</Link></Heading>
            </Flex>
            <HStack spacing='6'>
                <Button variant='link' textColor='white'>
                    <IoLogoGithub size='1.2rem' />
                </Button>
                <Button variant='link' textColor='white' onClick={() => {
                    localStorage.setItem('@etherapies:token', null);
                    localStorage.setItem('@etherapies:myId', null);
                    localStorage.setItem('@etherapies:entity', null);
                    router.push('/');
                }}><IoLogOutOutline size='1.2rem' /></Button>
            </HStack>
        </Flex>
    )
}