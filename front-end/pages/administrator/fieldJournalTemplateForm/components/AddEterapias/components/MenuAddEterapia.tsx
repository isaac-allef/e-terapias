import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";

interface MyProps {
    eterapias: any[];
    eterapiasToAdd: any[];
    setEterapiasToAdd: Function;
}

export default function MenuAddEterapia({ eterapias, eterapiasToAdd, setEterapiasToAdd }: MyProps) {
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
                                            let exists = false;
                                            eterapiasToAdd.forEach(ete => {
                                                if (ete.id === eterapia.id) {
                                                    exists = true;
                                                    return;
                                                }
                                            })
                                            if (!exists) {
                                                setEterapiasToAdd([...eterapiasToAdd, eterapia])
                                            }
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