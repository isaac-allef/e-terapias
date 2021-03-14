import MyTitle from "../../components/MyTitle";
import { Button } from "@chakra-ui/button";
import { Box, Divider, Stack, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { DeleteIcon, SmallAddIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface Question {
    id: any;
    name: string;
    type: 'short' | 'long';
}

export default function FieldJournalTemplateForm() {
    const [questions, setQuestions] = useState([]);
    
    function questionShortAnswer (key: any, questionArray: any[], label: string) {
        return (
            <Box key={key}>
                <Text>{ label }</Text>
                <Skeleton height="30px" />
                <Button onClick={() => handleRemove(key, questionArray)}>
                    <DeleteIcon />
                </Button>
            </Box>
        )
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