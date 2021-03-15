import { Button } from "@chakra-ui/button"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"
import { useState } from "react";

interface MyProps {
    eterapias: any[];
    setQuestions: Function;
}
export default function MenuChangeEterapia({ eterapias, setQuestions }: MyProps) {
    const [eterapiaSelectedName, setEterapiaSelectedName] = useState("");

    return (
        <Menu>
            {({ isOpen }) => (
                <>
                <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                    {eterapiaSelectedName === "" ? "Eterapia select" : eterapiaSelectedName}
                </MenuButton>
                <MenuList>
                    {
                        eterapias.map(eterapia => {
                            return <MenuItem 
                                    key={eterapia.id}
                                    onClick={() => {
                                        setEterapiaSelectedName(eterapia.name)
                                        setQuestions(eterapia.fieldTemplates)
                                    }}
                                    >{ eterapia.name }
                                </MenuItem>
                        })
                    }
                </MenuList>
                </>
            )}
        </Menu>
    )
}