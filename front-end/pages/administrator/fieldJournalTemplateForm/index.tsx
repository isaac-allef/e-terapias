import MyTitle from "../../../components/MyTitle";
import { Button } from "@chakra-ui/button";
import { Box, Divider, Flex, Text, Wrap } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { ChevronDownIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import QuestionTemplate from "./components/QuestionTemplate";
import MenuAddNewQuestionTemplate from "./components/MenuAddNewQuestionTemplate";

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
    const [questionsTemplates, setQuestionsTemplates] = useState([]);
    const [eterapias, _setEterapias] = useState([
        { id: 'aaaaaaaa', name: 'Como dormir cedo' },
        { id: 'bbbbbbbb', name: 'Curtindo a vida' },
        { id: 'cccccccc', name: 'A vida é assim, bro' },
    ]);
    const [eterapiasToAdd, setEterapiasToAdd] = useState([]);

    function setNewQuestionTemplate(type: 'short' | 'long') {
        const question: Question = { id: Math.random(), name: 'Type your question here', type }
        setQuestionsTemplates([...questionsTemplates, question])
    }

    function handleChange(newValue, key) {
        const newList = questionsTemplates.map((quest) => {
            if (quest.id === key) {
                quest.name = newValue;
                return quest;
            }
            return quest;
        });
        setQuestionsTemplates(newList);
    }

    function handleRemove(key) {
        const newList = questionsTemplates.filter((quest) => quest.id !== key);
        setQuestionsTemplates(newList);
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

        <MyTitle>{'Create Field Journal Template'}</MyTitle>

        {
        questionsTemplates.map(question => {
            return (
                <Box key={question.id}>
                    <QuestionTemplate 
                        id={question.id}
                        type={question.type}
                        label={question.name} 
                        handleChange={handleChange}
                    />
                    <Button onClick={() => handleRemove(question.id)}>
                        <DeleteIcon />
                    </Button>
                </Box>
            )
        })
        }
        
        <MenuAddNewQuestionTemplate 
            setNewQuestionTemplate={setNewQuestionTemplate}
        />

        <Divider />
      </>
  )
}
