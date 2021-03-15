import { Button } from "@chakra-ui/button"
import { CloseIcon } from "@chakra-ui/icons"
import { Flex, Wrap, Text } from "@chakra-ui/layout"

interface MyProps {
    eterapiasToAdd: any[];
    setEterapiasToAdd: Function;
}

export default function ShowEterapiasEdded({ eterapiasToAdd, setEterapiasToAdd }: MyProps) {
    function removeEterapiaFromTheList(eterapiasToAdd, setEterapiasToAdd, id) {
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