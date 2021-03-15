import { Button } from "@chakra-ui/button";
import { SmallAddIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";

interface MyProps {
    setNewQuestionTemplate: Function;
}

export default function MenuAddNewQuestionTemplate({ setNewQuestionTemplate }: MyProps) {
    return (
        <Menu>
            {({ isOpen }) => (
                <>
                <MenuButton isActive={isOpen} as={Button}>
                    <SmallAddIcon />
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => {
                        setNewQuestionTemplate('short')
                    }}>Add question short answer</MenuItem>
                    <MenuItem onClick={() => {
                        setNewQuestionTemplate('long')
                    }}>Add question long answer</MenuItem>
                </MenuList>
                </>
            )}
        </Menu>
    )
}