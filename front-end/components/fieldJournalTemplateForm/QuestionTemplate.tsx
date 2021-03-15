import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import { Box, Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

interface MyProps {
    id: any;
    type: 'short' | 'long';
    label: string;
    handleChange: Function;
}

export default function QuestionTemplate({ id, type, label, handleChange }: MyProps) {
    let skeletonType = null;

    if (type === 'short') {
        skeletonType = <Skeleton height="30px" />
    }

    else if (type === 'long') {
        skeletonType = <Stack>
                            <Skeleton height="30px" />
                            <Skeleton height="30px" />
                            <Skeleton height="30px" />
                        </Stack>
    }

    return (
        <Box>
            <Editable defaultValue={ label } 
                    onChange={(newValue) => handleChange(newValue, id)}>
                <EditablePreview />
                <EditableInput />
            </Editable>
            { skeletonType }
        </Box>
    )
}