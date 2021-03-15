import MyTitle from "../../components/shared/MyTitle";
import { Divider } from "@chakra-ui/layout";
import { useState } from "react";
import Question from "../../components/fieldJournalForm/Question";
import MenuChangeEterapia from "../../components/fieldJournalForm/MenuChangeEterapia";

interface QuestionDTO {
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

    return (
      <>
        <MenuChangeEterapia
            eterapias={eterapias}
            setQuestions={setQuestions}
        />

        <MyTitle>{'Create Field Journal'}</MyTitle>

        { questions.map(question => {
            return Question({ label: question.name, type: question.type });
        }) }

        <Divider />
      </>
  )
}