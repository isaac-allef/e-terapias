import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";

interface MyProps {
    eterapias: any[];
    eterapiasToAdd: any[];
    setEterapiasToAdd: Function;
}

export default function MenuAddEterapia({ eterapias, eterapiasToAdd, setEterapiasToAdd }: MyProps) {
    function eterapiaExistsInTheList(eterapiasToAdd, id) {
        let exists = false;
        eterapiasToAdd.forEach(eterapia => {
            if (eterapia.id === id) {
                exists = true;
                return;
            }
        })

        return exists;
    }

    function addEterapiaInTheList(eterapiasToAdd, setEterapiasToAdd, eterapia) {
        const exists = eterapiaExistsInTheList(eterapiasToAdd, eterapia.id);

        if (!exists) {
            setEterapiasToAdd([...eterapiasToAdd, eterapia])
        }
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