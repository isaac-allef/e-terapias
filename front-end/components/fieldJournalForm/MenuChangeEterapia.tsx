import { Button } from "@chakra-ui/button"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { Menu, MenuButton, MenuItem, MenuItemOption, MenuList, MenuOptionGroup } from "@chakra-ui/menu"
import { useState } from "react";

interface MyProps {
    eterapias: any[];
    setQuestions: Function;
    setFieldJournalTitle: Function;
    setEterapiaSelectedId: Function
}
export default function MenuChangeEterapia({ 
    eterapias, 
    setQuestions, 
    setFieldJournalTitle,
    setEterapiaSelectedId,
    }: MyProps) {
    const [eterapiaSelectedName, setEterapiaSelectedName] = useState("");

    return (
        <Menu>
            {({ isOpen }) => (
                <>
                <MenuButton variant='outline' isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                    {eterapiaSelectedName === "" ? "Select" : eterapiaSelectedName}
                </MenuButton>
                <MenuList>
                    <MenuOptionGroup type="radio">
                    {
                        eterapias.map(eterapia => {
                            return <MenuItemOption 
                                    value={eterapia.id}
                                    key={eterapia.id}
                                    onClick={() => {
                                        setEterapiaSelectedName(eterapia.name)
                                        setQuestions(eterapia.fieldTemplates)
                                        setFieldJournalTitle(eterapia.fieldJournalTitle)
                                        setEterapiaSelectedId(eterapia.id)
                                    }}
                                    >{ eterapia.name }
                                </MenuItemOption>
                        })
                    }
                    </MenuOptionGroup>
                </MenuList>
                </>
            )}
        </Menu>
    )
}