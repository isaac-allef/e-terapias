import { Flex } from "@chakra-ui/layout"
import MenuAddEterapia from "./components/MenuAddEterapia"
import ShowEterapiasEdded from "./components/ShowEterapiasAdded"

// eterapias
// [
//     { id: 'aaaaaaaa', name: 'Como dormir cedo' },
//     { id: 'bbbbbbbb', name: 'Curtindo a vida' },
//     { id: 'cccccccc', name: 'A vida é assim, bro' },
// ]

interface MyProps {
    eterapias: any[];
    eterapiasToAdd: any[];
    setEterapiasToAdd: Function;
}

export default function MenuAddEterapias({ eterapias, eterapiasToAdd, setEterapiasToAdd }: MyProps) {
    return (
        <Flex>
            <ShowEterapiasEdded
                eterapiasToAdd={eterapiasToAdd}
                setEterapiasToAdd={setEterapiasToAdd}
            />

            <MenuAddEterapia
                eterapias={eterapias}
                eterapiasToAdd={eterapiasToAdd}
                setEterapiasToAdd={setEterapiasToAdd}
            />
        </Flex>
    )
}
