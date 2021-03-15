import MyTitle from "../../../components/MyTitle";
import { Button } from "@chakra-ui/button";
import { Box, Divider } from "@chakra-ui/layout";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import QuestionTemplate from "./components/QuestionTemplate";
import MenuAddNewQuestionTemplate from "./components/MenuAddNewQuestionTemplate";
import AddEterapias from "./components/AddEterapias";

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
        <MyTitle>{'Create Field Journal Template'}</MyTitle>

        <AddEterapias 
            eterapias={eterapias}
            eterapiasToAdd={eterapiasToAdd}
            setEterapiasToAdd={setEterapiasToAdd}
        />

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
