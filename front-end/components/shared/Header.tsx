import { Heading, Flex, HStack, Button } from "@chakra-ui/react";
import { IoLogOutSharp } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from "next/router";

export default function Header() {
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
            <Heading><Link href='/administrator/dashboard'>E-Terapias</Link></Heading>
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