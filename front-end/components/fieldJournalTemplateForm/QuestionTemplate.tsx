import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import { Input } from "@chakra-ui/input";
import { Box, Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Textarea } from "@chakra-ui/textarea";

interface MyProps {
    id: any;
    type: 'short' | 'long';
    label: string;
    handleChange: Function;
}

export default function QuestionTemplate({ id, type, label, handleChange }: MyProps) {
    let skeletonType = null;

    if (type === 'short') {
        skeletonType = <Input  border='2px' isDisabled height="30px" />
    }

    else if (type === 'long') {
        skeletonType = <Textarea margin={0}  border='2px' isDisabled height="30px" />
    }

    return (
        <Box marginTop='1.5vh' marginBottom='1.5vh'>
            <Editable defaultValue={ label } 
                    marginBottom='-5px'
                    bgSize='100%'
                    onChange={(newValue) => handleChange(newValue, id)}>
                <EditablePreview />
                <EditableInput />
            </Editable>
            { skeletonType }
        </Box>
    )
}