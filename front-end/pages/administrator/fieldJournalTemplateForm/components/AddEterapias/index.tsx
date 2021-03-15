import { Flex } from "@chakra-ui/layout"
import MenuAddEterapia from "./components/MenuAddEterapia"
import ShowEterapiasEdded from "./components/ShowEterapiasAdded"

interface MyProps {
    eterapias: any[];
    eterapiasToAdd: any[];
    setEterapiasToAdd: Function;
}

export default function AddEterapias({ eterapias, eterapiasToAdd, setEterapiasToAdd }: MyProps) {
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
