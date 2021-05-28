import { IconButton } from "@chakra-ui/button"
import { Icon } from "@chakra-ui/icons"
import { Flex, Wrap, Text, Link } from "@chakra-ui/layout"
import { Tooltip } from "@chakra-ui/tooltip";
import { IoMdCloseCircle } from 'react-icons/io';

interface MyProps {
    etherapies: any[];
    setEtherapies: Function;
    etherapiesToAdd: any[];
    setEtherapiesToAdd: Function;
    warningEtherapyHasAFieldJournalTemplate: boolean
}

export default function ShowEtherapiesEdded({ etherapies, setEtherapies, etherapiesToAdd, setEtherapiesToAdd, warningEtherapyHasAFieldJournalTemplate }: MyProps) {
    function addElementInEtherapiesAgain(etherapiesToAdd, etherapies, id) {
        const etherapy = etherapiesToAdd.find(etherapy => etherapy.id === id);
        setEtherapies([...etherapies, etherapy]);
    }
    
    function removeEtherapyFromTheList(etherapiesToAdd, setEtherapiesToAdd, id) {
        addElementInEtherapiesAgain(etherapiesToAdd, etherapies, id);
        const newList = etherapiesToAdd.filter(etherapy => etherapy.id !== id);
        setEtherapiesToAdd(newList);
    }

    return (
        <Wrap>
        { 
            etherapiesToAdd.map(etherapy => {
                return (
                    <Flex key={etherapy.id} alignItems='center'>
                    {
                        warningEtherapyHasAFieldJournalTemplate &&
                        etherapy.template ?
                            <Tooltip label={`This etherapy already has a template call '${etherapy.template.name}'. This action will subscribe to it`}>
                                <Text color='#ffe227'><Link href={`/new/etherapyDetail/${etherapy.id}`} isExternal>{ etherapy.name }</Link></Text>
                            </Tooltip>
                            :
                            <Text color='#1a508b'><Link href={`/new/etherapyDetail/${etherapy.id}`} isExternal>{ etherapy.name }</Link></Text>
                    }
                    <IconButton 
                        variant='unstyled'
                        isRound={true}
                        size='sm'
                        aria-label="close" 
                        icon={<Icon as={IoMdCloseCircle} />} 
                        onClick={() => {
                            removeEtherapyFromTheList(etherapiesToAdd, 
                                                    setEtherapiesToAdd, 
                                                    etherapy.id)
                            }
                        }
                    />
                    </Flex>
                )
            })
        }
        </Wrap>
    )
}