import MyTitle from "../../components/MyTitle";
import { Button } from "@chakra-ui/button";
import { Box, Divider, Flex, Stack, Text, Wrap } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { ChevronDownIcon, CloseIcon, DeleteIcon, SmallAddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";

interface Question {
    id: any;
    name: string;
    type: 'short' | 'long';
}

interface Eterapias {
    id: string;
    name: string;
}

export default function FieldJournalTemplateForm() {
    const [questions, setQuestions] = useState([]);
    const [eterapias, _setEterapias] = useState([
        { id: 'aaaaaaaa', name: 'Como dormir cedo' },
        { id: 'bbbbbbbb', name: 'Curtindo a vida' },
        { id: 'cccccccc', name: 'A vida é assim, bro' },
    ]);
    const [eterapiasToAdd, setEterapiasToAdd] = useState([]);
    
    function questionShortAnswer (key: any, questionArray: any[], label: string) {
        return (
            <Box key={key}>
                <Editable defaultValue={ label } 
                        onChange={(newValue) => handleChange(newValue, key, questionArray)}>
                    <EditablePreview />
                    <EditableInput />
                </Editable>
                <Skeleton height="30px" />
                <Button onClick={() => handleRemove(key, questionArray)}>
                    <DeleteIcon />
                </Button>
            </Box>
        )
    }

    function handleChange(newValue, key, questions) {
        const newList = questions.map((quest) => {
            if (quest.id === key) {
                quest.name = newValue;
                return quest;
            }
            return quest;
        });
        setQuestions(newList);
    }
    
    function questionLongAnswer(key: any, questionArray: any[], label: string) {
        return (
            <Box key={key}>
                <Text>{ label }</Text>
                <Stack>
                    <Skeleton height="30px" />
                    <Skeleton height="30px" />
                    <Skeleton height="30px" />
                </Stack>
                <Button onClick={() => handleRemove(key, questionArray)}>
                    <DeleteIcon />
                </Button>
            </Box>
        )
    }

    function handleRemove(key, questions) {
        const newList = questions.filter((quest) => quest.id !== key);
        setQuestions(newList);
    }

    return (
      <>
        <Flex>
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
        <Menu>
            {({ isOpen }) => (
                <>
                <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                    Add Eterapia
                </MenuButton>
                <MenuList>
                    {
                        eterapias.map(eterapia => {
                            return <MenuItem 
                                    key={eterapia.id} 
                                    onClick={() => {
                                            let exists = false;
                                            eterapiasToAdd.forEach(ete => {
                                                if (ete.id === eterapia.id) {
                                                    exists = true;
                                                    return;
                                                }
                                            })
                                            if (!exists) {
                                                setEterapiasToAdd([...eterapiasToAdd, eterapia])
                                            }
                                        }
                                    }
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
                return questionShortAnswer(question.id, questions, question.name);
            }
            if (question.type === 'long') {
                return questionLongAnswer(question.id, questions, question.name);
            }
        }) }
        
        <Menu>
            {({ isOpen }) => (
                <>
                <MenuButton isActive={isOpen} as={Button}>
                    <SmallAddIcon />
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => {
                        const question: Question = { id: Math.random(), name: 'Type your question here', type: 'short' }
                        setQuestions([...questions, question])
                    }}>Add question short answer</MenuItem>
                    <MenuItem onClick={() => {
                        const question: Question = { id: Math.random(), name: 'Type your question here', type: 'long' }
                        setQuestions([...questions, question])
                    }}>Add question long answer</MenuItem>
                </MenuList>
                </>
            )}
        </Menu>

        <Divider />
      </>
  )
}