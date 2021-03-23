import { Button, IconButton } from "@chakra-ui/button"
import { CloseIcon, Icon, SearchIcon } from "@chakra-ui/icons"
import { Flex, Wrap, Text, Link } from "@chakra-ui/layout"
import { Tooltip } from "@chakra-ui/tooltip";
import { IoMdCloseCircle } from 'react-icons/io';

interface MyProps {
    eterapias: any[];
    setEterapias: Function;
    eterapiasToAdd: any[];
    setEterapiasToAdd: Function;
    warningEterapiaHasAFieldJournalTemplate: boolean
}

export default function ShowEterapiasEdded({ eterapias, setEterapias, eterapiasToAdd, setEterapiasToAdd, warningEterapiaHasAFieldJournalTemplate }: MyProps) {
    function addElementInEterapiasAgain(eterapiasToAdd, eterapias, id) {
        const eterapia = eterapiasToAdd.find(eterapia => eterapia.id === id);
        setEterapias([...eterapias, eterapia]);
    }
    
    function removeEterapiaFromTheList(eterapiasToAdd, setEterapiasToAdd, id) {
        addElementInEterapiasAgain(eterapiasToAdd, eterapias, id);
        const newList = eterapiasToAdd.filter(eterapia => eterapia.id !== id);
        setEterapiasToAdd(newList);
    }

    return (
        <Wrap>
        { 
            eterapiasToAdd.map(eterapia => {
                return (
                    <Flex key={eterapia.id} alignItems='center'>
                    {
                        warningEterapiaHasAFieldJournalTemplate &&
                        eterapia.fieldJournalTemplate ?
                            <Tooltip label='This eterapia already has a field journal template. This action will subscribe to it'>
                                <Text color='#ffe227'><Link href='/administrator/eterapias/list' isExternal>{ eterapia.name }</Link></Text>
                            </Tooltip>
                            :
                            <Text color='#1a508b'><Link href='/administrator/eterapias/list' isExternal>{ eterapia.name }</Link></Text>
                    }
                    <IconButton 
                        variant='unstyled'
                        isRound={true}
                        size='sm'
                        aria-label="close" 
                        icon={<Icon as={IoMdCloseCircle} />} 
                        onClick={() => {
                            removeEterapiaFromTheList(eterapiasToAdd, 
                                                    setEterapiasToAdd, 
                                                    eterapia.id)
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