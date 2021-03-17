import MyTitle from "../../components/shared/MyTitle";
import { Divider } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import Question from "../../components/fieldJournalForm/Question";
import MenuChangeEterapia from "../../components/fieldJournalForm/MenuChangeEterapia";

import api from '../../services/api';

interface QuestionDTO {
    id: any;
    name: string;
    type: 'short' | 'long';
}

interface Eterapias {
    id: string;
    name: string;
}

// [
//     { id: 'aaaaaaaa', name: 'Como dormir cedo', 
//         fieldTemplates: [
//             {
//                 name: "Qual o seu nome?",
//                 type: "short"
//             },
//             {
//                 name: "Faça uma redação",
//                 type: "long"
//             },
//         ]
//     },
//     { id: 'bbbbbbbb', name: 'Curtindo a vida', 
//         fieldTemplates: [
//             {
//                 name: "Como você está?",
//                 type: "short"
//             },
//         ]
//     },
//     { id: 'cccccccc', name: 'A vida é assim, bro', fieldTemplates: [] },
// ]

export default function FieldJournalForm() {
    const [questions, setQuestions] = useState([]);
    const [eterapias, setEterapias] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('@eterapias:token');
        const id = localStorage.getItem('@eterapias:myId');
        getEterapias(token).then(eterapias => {
            const myEterapias = selectMyEterapias(eterapias, id);
            const myEterapiasPreparated = preparateMyEterapias(myEterapias);
            setEterapias(myEterapiasPreparated);
        })
    }, []);

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

function preparateMyEterapias(eterapias: any[]) {

    function changeStringTypeToShortOrLongType(eterapiaQuestion: any) {
        const { fieldTemplates } = eterapiaQuestion;
        const newFieldTemplates = fieldTemplates.map(fieldTemplate => {
            if (fieldTemplate.name[0] === ':') {
                fieldTemplate.type = 'short'
            } else {
                fieldTemplate.type = 'long'
            }

            return fieldTemplate;
        })

        eterapiaQuestion.fieldTemplates = newFieldTemplates;
        return eterapiaQuestion;
    }

    let eterapiasQuestions = [];
    eterapias.forEach(eterapia => {
        const eterapiaQuestion = {
            id: eterapia.id,
            name: eterapia.name,
            fieldTemplates: eterapia.fieldJournalTemplate.description.fieldTemplates
        }

        const a = changeStringTypeToShortOrLongType(eterapiaQuestion);
        eterapiasQuestions.push(a);
    })


    return eterapiasQuestions;
}

function selectMyEterapias(eterapias: any[], id: string) {
    function moderatorExistsInArray(moderators: any[], id: string) {
        let exists = false;
        moderators.forEach(moderator => {
            if (moderator.id === id) {
                exists = true;
                return;
            }
        })
        return exists;
    }

    const myEterapias = eterapias.filter(eterapia => {
        return moderatorExistsInArray(eterapia.moderators, id);
    });

    return myEterapias;
}

async function getEterapias(token: string) {
    const response = await api.get('/eterapias/moderator', {
        params: {
            relations: ['fieldJournalTemplate', 'moderators']
        },
        headers: {
          'Authorization': `token ${token}`
        }
    });

    const eterapias = response.data;
    return eterapias;
}