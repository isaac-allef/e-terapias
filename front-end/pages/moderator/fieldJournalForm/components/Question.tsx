import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";

interface MyProps {
    label: string;
    type: 'short' | 'long';
}

export default function Question({ label, type }: MyProps) {
    let inputType = null;

    if (type === 'short') {
        inputType = <Input />
    }

    else if (type === 'long') {
        inputType = <Textarea />
    }

    return (
        <Box key={Math.random()}>
            <Text>{ label }</Text>
            { inputType }
        </Box>
    )
}