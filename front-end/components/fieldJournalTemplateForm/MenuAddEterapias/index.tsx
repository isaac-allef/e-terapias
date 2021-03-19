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
    setEterapias: Function;
    eterapiasToAdd: any[];
    setEterapiasToAdd: Function;
}

export default function MenuAddEterapias({ eterapias, setEterapias, eterapiasToAdd, setEterapiasToAdd }: MyProps) {
    return (
        <Flex 
            justifyContent='space-between'
        >
            <ShowEterapiasEdded
                eterapias={eterapias}
                setEterapias={setEterapias}
                eterapiasToAdd={eterapiasToAdd}
                setEterapiasToAdd={setEterapiasToAdd}
            />

            <MenuAddEterapia
                eterapias={eterapias}
                setEterapias={setEterapias}
                eterapiasToAdd={eterapiasToAdd}
                setEterapiasToAdd={setEterapiasToAdd}
            />
        </Flex>
    )
}
