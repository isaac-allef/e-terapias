import { Button } from "@chakra-ui/button"
import { CloseIcon } from "@chakra-ui/icons"
import { Flex, Wrap, Text } from "@chakra-ui/layout"

interface MyProps {
    eterapiasToAdd: any[];
    setEterapiasToAdd: Function;
}

export default function ShowEterapiasEdded({ eterapiasToAdd, setEterapiasToAdd }: MyProps) {
    return (
        <Wrap>
            { 
                eterapiasToAdd.map(ete => {
                    return (
                        <Flex key={ete.id}>
                        <Text>{ ete.name }</Text>
                        <Button onClick={() => {
                                const newList = eterapiasToAdd.filter(e => e.id !== ete.id)
                                setEterapiasToAdd(newList)
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