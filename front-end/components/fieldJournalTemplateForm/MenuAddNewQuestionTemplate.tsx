import { Button } from "@chakra-ui/button";
import { Icon, SmallAddIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { IoReorderTwoOutline, IoReorderFourOutline } from 'react-icons/io5'

interface MyProps {
    setNewQuestionTemplate: Function;
}

export default function MenuAddNewQuestionTemplate({ setNewQuestionTemplate }: MyProps) {
    return (
        <Menu>
            {({ isOpen }) => (
                <>
                <MenuButton marginTop='3vh' variant='outline' isActive={isOpen} as={Button} rightIcon={<SmallAddIcon />}>
                    Add new question
                </MenuButton>
                <MenuList>
                    <MenuItem icon={<Icon as={IoReorderTwoOutline} />} onClick={() => {
                        setNewQuestionTemplate('short')
                    }}>Short answer</MenuItem>
                    <MenuItem icon={<Icon as={IoReorderFourOutline} />} onClick={() => {
                        setNewQuestionTemplate('long')
                    }}>Long answer</MenuItem>
                </MenuList>
                </>
            )}
        </Menu>
    )
}