import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";

interface MyProps {
    label: string;
    type: 'short' | 'long';
    index: number;
    handleChange: Function;
}

export default function Question({ label, type, index, handleChange }: MyProps) {
    let inputType = null;

    if (type === 'short') {
        inputType = <Input onChange={(e) => handleChange(e.target.value, index)} />
    }

    else if (type === 'long') {
        inputType = <Textarea onChange={(e) => handleChange(e.target.value, index)} />
    }

    return (
        <Box key={Math.random()} marginTop='1.5vh' marginBottom='1.5vh'>
            <Text>{ label }</Text>
            { inputType }
        </Box>
    )
}