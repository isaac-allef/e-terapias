import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { useState } from "react";

interface MyProps {
    eterapias: any[];
    setEterapias: Function;
    eterapiasToAdd: any[];
    setEterapiasToAdd: Function;
}

export default function MenuAddEterapia({ eterapias, setEterapias, eterapiasToAdd, setEterapiasToAdd }: MyProps) {
    function removeElementFromEterapias(eterapias, id) {
        const newEterapias = eterapias.filter(eterapia => {
            return eterapia.id !== id
        })

        setEterapias(newEterapias);
    }

    function addEterapiaInTheList(eterapiasToAdd, setEterapiasToAdd, eterapia) {
        setEterapiasToAdd([...eterapiasToAdd, eterapia])
        removeElementFromEterapias(eterapias, eterapia.id);
    }

    return (
        <Menu>
            {({ isOpen }) => (
                <>
                <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                    Add Eterapia
                </MenuButton>
                <MenuList>
                {
                    eterapias.map(eterapia => {
                        return <MenuItem
                                    key={eterapia.id} 
                                    onClick={() => {
                                            addEterapiaInTheList(eterapiasToAdd, 
                                                                setEterapiasToAdd, 
                                                                eterapia)
                                        }
                                    }
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