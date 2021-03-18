import { IconProps } from "@chakra-ui/icon";
import { Text, Heading, LinkBox, LinkOverlay } from "@chakra-ui/layout";

interface MyProps {
    icon: IconProps;
    title: string;
    description: string;
    link: string;
}

export default function Card({ icon, title, description, link }: MyProps) {
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