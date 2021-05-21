import { Button } from "@chakra-ui/button";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Textarea } from "@chakra-ui/textarea";

interface MyProps {
    id: any;
    type: 'short' | 'long';
    label: string;
    handleChangeValue: Function;
    handleChangeType?: Function;
}

export default function QuestionTemplate({ id, type, label, handleChangeValue, handleChangeType }: MyProps) {
    let skeletonType = null;

    if (type === 'short') {
        skeletonType = <Input  border='2px' isDisabled height="30px" />
    }

    else if (type === 'long') {
        skeletonType = <Textarea margin={0}  border='2px' isDisabled height="30px" />
    }

    const MenuType = () => (
        <Menu>
                {({ isOpen }) => (
                    <>
                    <MenuButton variant='outline' isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                        {type}
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => handleChangeType('short', id)}>Short</MenuItem>
                        <MenuItem onClick={() => handleChangeType('long', id)}>Long</MenuItem>
                    </MenuList>
                    </>
                )}
            </Menu>
    )

    return (
        <Box marginTop='1.5vh' marginBottom='1.5vh'>
            <Editable defaultValue={ label } 
                    marginBottom='-5px'
                    bgSize='100%'
                    onChange={(newValue) => handleChangeValue(newValue, id)}>
                <EditablePreview />
                <EditableInput />
                <MenuType />
            </Editable>
            { skeletonType }
        </Box>
    )
}
