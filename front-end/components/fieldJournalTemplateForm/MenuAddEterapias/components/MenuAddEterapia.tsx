import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";

interface MyProps {
    etherapies: any[];
    setEtherapies: Function;
    etherapiesToAdd: any[];
    setEtherapiesToAdd: Function;
}

export default function MenuAddEtherapy({ etherapies, setEtherapies, etherapiesToAdd, setEtherapiesToAdd }: MyProps) {
    function removeElementFromEtherapies(etherapies, id) {
        const newEtherapies = etherapies.filter(etherapy => {
            return etherapy.id !== id
        })

        setEtherapies(newEtherapies);
    }

    function addEtherapyInTheList(etherapiesToAdd, setEtherapiesToAdd, Etherapy) {
        setEtherapiesToAdd([...etherapiesToAdd, Etherapy])
        removeElementFromEtherapies(etherapies, Etherapy.id);
    }

    return (
        <Menu>
            {({ isOpen }) => (
                <>
                <MenuButton variant='outline' isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                    Add Etherapy
                </MenuButton>
                <MenuList>
                {
                    etherapies.map(etherapy => {
                        return <MenuItem
                                    key={etherapy.id} 
                                    onClick={() => {
                                            addEtherapyInTheList(etherapiesToAdd, 
                                                                setEtherapiesToAdd, 
                                                                etherapy)
                                        }
                                    }
                                >{ etherapy.name }
                                </MenuItem>
                        })
                }
                </MenuList>
                </>
            )}
        </Menu>
    )
}