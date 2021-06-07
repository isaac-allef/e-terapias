import { Button, IconButton } from "@chakra-ui/button";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import { ChevronDownIcon, Icon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Textarea } from "@chakra-ui/textarea";
import { IoMdCloseCircle } from "react-icons/io";
import { typesOfQuestions } from "../../../utils/typesOfQuestions";

interface MyProps {
    id: any;
    type: typesOfQuestions;
    label: string;
    handleChangeValue: Function;
    handleChangeType: Function;
    handleRemove: Function;
}

export default function QuestionTemplate({ id, type, label, handleChangeValue, handleChangeType, handleRemove }: MyProps) {
    let skeletonType = null;

    if (type === 'short') {
        skeletonType = <Input  border='2px' isDisabled height='30px' />
    }

    else if (type === 'long') {
        skeletonType = <Textarea margin={0}  border='2px' isDisabled height='30px' />
    }

    else if (type === 'date') {
        skeletonType = <Input value='dia / mês / ano' border='2px' isDisabled height='30px' />
    }

    const MenuType = () => (
        <Box
            top='10px'
            right='40px'
            position='absolute'
        >
            <Menu>
                {({ isOpen }) => (
                    <>
                    <MenuButton variant='outline' isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                        {type}
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => handleChangeType('short', id)}>Short</MenuItem>
                        <MenuItem onClick={() => handleChangeType('long', id)}>Long</MenuItem>
                        <MenuItem onClick={() => handleChangeType('date', id)}>Date</MenuItem>
                    </MenuList>
                    </>
                )}
            </Menu>
        </Box>
    )

    return (
        <Box marginTop='1.5vh' marginBottom='1.5vh'>
            <Editable defaultValue={ label } 
                    marginBottom='-5px'
                    bgSize='100%'
                    onChange={(newValue) => handleChangeValue(newValue, id)}>
                <EditablePreview />
                <EditableInput />
                { skeletonType }
                <MenuType />
                <IconButton
                    top='15px'
                    right='-24px'
                    position='absolute'
                    variant='unstyled'
                    isRound={true}
                    size='lg'
                    boxSize='30px'
                    aria-label='close' 
                    icon={<Icon as={IoMdCloseCircle} boxSize='30px' color='#ec4646' />} 
                    onClick={() =>  handleRemove(id)}
                />
            </Editable>
        </Box>
    )
}
