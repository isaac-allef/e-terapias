import { Button } from "@chakra-ui/button"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from "@chakra-ui/menu"
import { useState } from "react";

interface MyProps {
    etherapies: any[];
    setEtherapySelected: Function
}
export default function MenuSelectEtherapy({ 
    etherapies, 
    setEtherapySelected,
    }: MyProps) {
    const [etherapieselectedName, setEtherapieselectedName] = useState("");

    return (
        <Menu>
            {({ isOpen }) => (
                <>
                <MenuButton variant='outline' isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                    {etherapieselectedName === "" ? "Select" : etherapieselectedName}
                </MenuButton>
                <MenuList>
                    <MenuOptionGroup type="radio">
                    {
                        etherapies.map(etherapy => {
                            return <MenuItemOption 
                                    value={etherapy.id}
                                    key={etherapy.id}
                                    onClick={() => {
                                        setEtherapieselectedName(etherapy.name)
                                        setEtherapySelected(etherapy)
                                    }}
                                    >{ etherapy.name }
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