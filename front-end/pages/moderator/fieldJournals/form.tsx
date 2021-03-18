import MyTitle from "../../../components/shared/MyTitle";
import { Divider, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import Question from "../../../components/fieldJournalForm/Question";
import MenuChangeEterapia from "../../../components/fieldJournalForm/MenuChangeEterapia";

import api from '../../../services/api';
import { Button } from "@chakra-ui/button";
import MyToast from "../../../components/shared/MyToast";

interface QuestionDTO {
    id: any;
    name: string;
    type: 'short' | 'long';
}

interface Eterapias {
    id: string;
    name: string;
}

interface Field {
    name: string;
    type: 'string' | 'int' | 'date' | 'boolean';
    value: string | number | Date | boolean;
}

interface FieldJournal {
    title: string;
    fields: Field[];
    eterapiaId: string;
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
    const myToast = new MyToast();
    const [questions, setQuestions] = useState([]);
    const [eterapias, setEterapias] = useState([]);
    const [fieldJournalTitle, setFieldJournalTitle] = useState('');
    const [eterapiaSelectedId, setEterapiaSelectedId] = useState('');

    function cleanUp() {
        setQuestions([]);
        setFieldJournalTitle('');
        setEterapiaSelectedId('');
    }

    useEffect(() => {
        const token = localStorage.getItem('@eterapias:token');
        const id = localStorage.getItem('@eterapias:myId');
        getEterapias(token).then(eterapias => {
            const myEterapias = selectMyEterapias(eterapias, id);
            const myEterapiasPreparated = preparateMyEterapias(myEterapias);
            setEterapias(myEterapiasPreparated);
        })
    }, []);

    function handleChange(newValue, index) {
        questions[index].value = newValue;
        setQuestions(questions);
    }

    return (
      <>
        <MenuChangeEterapia
            eterapias={eterapias}
            setQuestions={setQuestions}
            setFieldJournalTitle={setFieldJournalTitle}
            setEterapiaSelectedId={setEterapiaSelectedId}
        />

        <MyTitle>{'Create Field Journal'}</MyTitle>

        <Text>{ fieldJournalTitle }</Text>

        <form onSubmit={async (event) => {
            event.preventDefault();
            const token = localStorage.getItem('@eterapias:token');
            try {
                await saveFieldJournal(token, {
                    title: fieldJournalTitle,
                    eterapiaId: eterapiaSelectedId,
                    fields: preparateQuestionsToSend(questions)
                })

                myToast.execute({ status: 'success', title: 'Field Journal created.' });
                cleanUp();
            } catch (err) {
                myToast.execute({ status: 'error', title: 'Error', description: err.message });
            }
        }}>
            { questions.map((question, index) => {
                return <Question 
                    key={Math.random()}
                    label={question.name}
                    type={question.type}
                    index={index}
                    handleChange={handleChange}
                />
            }) }
            <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                >
                Submit
            </Button>
        </form>

        <Divider />
      </>
  )
}

function preparateQuestionsToSend(questions: any[]): Field[] {
    const fields = questions.map(question => {
        if (question.type === 'short' || question.type === 'long') {
            return {
                name: question.name,
                type: 'string',
                value: question.value
            }
        }
        return question;
    })

    return fields;
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

            const newFieldTemplate = {
                name: fieldTemplate.name,
                type: fieldTemplate.type,
                value: '',
            }

            return newFieldTemplate;
        })

        eterapiaQuestion.fieldTemplates = newFieldTemplates;
        return eterapiaQuestion;
    }

    let eterapiasQuestions = [];
    eterapias.forEach(eterapia => {
        const eterapiaQuestion = {
            id: eterapia.id,
            name: eterapia.name,
            fieldJournalTitle: eterapia.fieldJournalTemplate.description.title,
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

async function saveFieldJournal(token: string, fieldJournalJson: FieldJournal) {
    const response = await api.post('/fieldjournals/moderator', fieldJournalJson, {
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });

    const fieldJournal = response.data;
    return fieldJournal;
}