import { Flex } from "@chakra-ui/layout"
import MenuAddEterapia from "./components/MenuAddEterapia"
import ShowEterapiasEdded from "./components/ShowEterapiasAdded"

interface MyProps {
    eterapias: any[];
    setEterapias: Function;
    eterapiasToAdd: any[];
    setEterapiasToAdd: Function;
    warningEterapiaHasAFieldJournalTemplate?: boolean;
}

export default function MenuAddEterapias({ eterapias, setEterapias, eterapiasToAdd, setEterapiasToAdd, warningEterapiaHasAFieldJournalTemplate = false }: MyProps) {
    return (
        <Flex 
            justifyContent='space-between'
        >
            <ShowEterapiasEdded
                etherapies={eterapias}
                setEtherapies={setEterapias}
                etherapiesToAdd={eterapiasToAdd}
                setEtherapiesToAdd={setEterapiasToAdd}
                warningEtherapyHasAFieldJournalTemplate={warningEterapiaHasAFieldJournalTemplate}
            />

            <MenuAddEterapia
                etherapies={eterapias}
                setEtherapies={setEterapias}
                etherapiesToAdd={eterapiasToAdd}
                setEtherapiesToAdd={setEterapiasToAdd}
            />
        </Flex>
    )
}
