import MyTitle from "../../components/MyTitle";
import { Button } from "@chakra-ui/button";
import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";

interface Question {
    id: any;
    name: string;
    type: 'short' | 'long';
}

interface Eterapias {
    id: string;
    name: string;
}

export default function FieldJournalForm() {
    const [questions, setQuestions] = useState([]);
    const [eterapiaSelectedName, setEterapiaSelectedName] = useState("");
    const [eterapias, _setEterapias] = useState([
        { id: 'aaaaaaaa', name: 'Como dormir cedo', 
            fieldTemplates: [
                {
                    name: "Qual o seu nome?",
                    type: "short"
                },
                {
                    name: "Faça uma redação",
                    type: "long"
                },
            ]
        },
        { id: 'bbbbbbbb', name: 'Curtindo a vida', 
            fieldTemplates: [
                {
                    name: "Como você está?",
                    type: "short"
                },
            ]
        },
        { id: 'cccccccc', name: 'A vida é assim, bro', fieldTemplates: [] },
    ]);
    
    function questionShortAnswer (label: string) {
        return (
            <Box key={Math.random()}>
                <Text>{ label }</Text>
                <Input />
            </Box>
        )
    }
    
    function questionLongAnswer(label: string) {
        return (
            <Box key={Math.random()}>
                <Text>{ label }</Text>
                <Textarea />
            </Box>
        )
    }

    return (
      <>
        <Flex>
        <Menu>
            {({ isOpen }) => (
                <>
                <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                    {eterapiaSelectedName === "" ? "Eterapia select" : eterapiaSelectedName}
                </MenuButton>
                <MenuList>
                    {
                        eterapias.map(eterapia => {
                            return <MenuItem 
                                    key={eterapia.id}
                                    onClick={() => {
                                        setEterapiaSelectedName(eterapia.name)
                                        setQuestions(eterapia.fieldTemplates)
                                    }}
                                    >{ eterapia.name }
                                </MenuItem>
                        })
                    }
                </MenuList>
                </>
            )}
        </Menu>
        </Flex>

        <MyTitle>{'Create Moderator'}</MyTitle>

        { questions.map(question => {
            if (question.type === 'short') {
                return questionShortAnswer(question.name);
            }
            if (question.type === 'long') {
                return questionLongAnswer(question.name);
            }
        }) }

        <Divider />
      </>
  )
}