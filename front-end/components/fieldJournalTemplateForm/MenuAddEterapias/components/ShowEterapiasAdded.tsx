import { Button } from "@chakra-ui/button"
import { CloseIcon } from "@chakra-ui/icons"
import { Flex, Wrap, Text } from "@chakra-ui/layout"

interface MyProps {
    eterapias: any[];
    setEterapias: Function;
    eterapiasToAdd: any[];
    setEterapiasToAdd: Function;
}

export default function ShowEterapiasEdded({ eterapias, setEterapias, eterapiasToAdd, setEterapiasToAdd }: MyProps) {
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
                    <Flex key={eterapia.id}>
                    <Text>{ eterapia.name }</Text>
                    <Button onClick={() => {
                            removeEterapiaFromTheList(eterapiasToAdd, 
                                                    setEterapiasToAdd, 
                                                    eterapia.id)
                        }
                    }>
                        <CloseIcon />
                    </Button>
                    </Flex>
                )
            })
        }
        </Wrap>
    )
}