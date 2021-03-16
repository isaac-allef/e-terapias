import Icon from "@chakra-ui/icon";
import { Text, Heading, LinkBox, LinkOverlay } from "@chakra-ui/layout";
import { IoIosJournal, IoIosPeople } from "react-icons/io";
import { RiPsychotherapyFill } from "react-icons/ri";
import { AiFillCopy } from "react-icons/ai";

interface MyProps {
    iconType: 'journal' | 'therapy' | 'template' | 'peoples';
    title: string;
    description: string;
    link: string;
}

export default function Card({ iconType, title, description, link }: MyProps) {
    let icon;
    switch (iconType) {
        case 'journal':
            icon = <Icon as={IoIosJournal} />
            break;
        case 'therapy':
            icon = <Icon as={RiPsychotherapyFill} />
            break;
        case 'template':
            icon = <Icon as={AiFillCopy} />
            break;
        case 'peoples':
            icon = <Icon as={IoIosPeople} />
            break;
    }

    return (
        <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
            <Heading size="md" my="2">
                { icon }
                <LinkOverlay href={link} marginLeft={'10px'}>
                    { title }
                </LinkOverlay>
            </Heading>
            <Text>
                { description }
            </Text>
        </LinkBox>
    )
}