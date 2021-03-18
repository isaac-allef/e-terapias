import { Button } from "@chakra-ui/button";
import { Box, Divider } from "@chakra-ui/layout";
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import MyTitle from "../../components/shared/MyTitle";
import AddEterapias from "../../components/fieldJournalTemplateForm/AddEterapias";
import QuestionTemplate from "../../components/fieldJournalTemplateForm/QuestionTemplate";
import MenuAddNewQuestionTemplate from "../../components/fieldJournalTemplateForm/MenuAddNewQuestionTemplate";

import api from '../../services/api';
import { Input } from "@chakra-ui/input";
import { Field, Form, Formik } from "formik";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";

import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Header from "../../components/shared/Header";

interface Question {
    id: any;
    name: string;
    type: 'short' | 'long';
}

interface Eterapias {
    id: string;
    name: string;
}

interface FiledTemplate {
    name: string;
    type: 'string' | 'int' | 'date' | 'boolean';
}

interface FieldJournalTemplate {
    name: string;
    description: {
        title: string;
        fieldTemplates: FiledTemplate[];
    }
}

// [
//     { id: 'aaaaaaaa', name: 'Como dormir cedo' },
//     { id: 'bbbbbbbb', name: 'Curtindo a vida' },
//     { id: 'cccccccc', name: 'A vida é assim, bro' },
// ]

export default function FieldJournalTemplateForm() {
    const router = useRouter();
    const [questionsTemplates, setQuestionsTemplates] = useState([]);
    const [eterapias, setEterapias] = useState([]);
    const [eterapiasToAdd, setEterapiasToAdd] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('@eterapias:token');
        getEterapias(token).then(eterapias => {
            setEterapias(eterapias);
        })
    }, []);

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

    function createfieldTemplates(): FiledTemplate[] {
        return questionsTemplates.map(questionTemplate => {
            
            let caractereToIdentifyShortorLongQuestion = '';
            if (questionTemplate.type === 'short') {
                caractereToIdentifyShortorLongQuestion = ':'
            }
            
            return {
                name: caractereToIdentifyShortorLongQuestion + questionTemplate.name,
                type: 'string',
            }
        });
    }

    function createFieldJournalTemplate(name: string, title: string): FieldJournalTemplate {
        const fieldTemplates = createfieldTemplates();
        return {
            name,
            description: {
                title,
                fieldTemplates,
            }
        }
    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        title: Yup.string().required('Required'),
      });
    
      const initialValues = {
          name: '',
          title: '',
      }

    const functionSubmitForm = async (values, actions) => {
        const { name, title } = values;

        const fieldJournalTemplateJson = createFieldJournalTemplate(name, title);

        const token = localStorage.getItem('@eterapias:token');
        const fieldJournalTemplate = await createNewFieldJournalTemplate(token, fieldJournalTemplateJson);
    
        const fieldJournalTemplateId = fieldJournalTemplate.id;
        await addFieldJournalTemplateWithEterapias(token, fieldJournalTemplateId, eterapiasToAdd)
        actions.setSubmitting(false);
    
        router.push('/');
    }

    return (
      <>
        <Header />
        <MyTitle>{'Create Field Journal Template'}</MyTitle>

        <AddEterapias
            eterapias={eterapias}
            eterapiasToAdd={eterapiasToAdd}
            setEterapiasToAdd={setEterapiasToAdd}
        />

        <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={functionSubmitForm}
            >
            {(props) => (
                <Form>
                <Field name="name">
                    {({ field, form }) => (
                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                            <FormLabel htmlFor="name">Name</FormLabel>
                                <Input {...field} id="name" placeholder="name" />
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
                <Field name="title">
                    {({ field, form }) => (
                        <FormControl isInvalid={form.errors.title && form.touched.title}>
                            <FormLabel htmlFor="title">Title</FormLabel>
                                <Input {...field} id="title" placeholder="title" type="title" />
                            <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                        </FormControl>
                    )}
                </Field>

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

                <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                    >
                    Save
                </Button>
            </Form>
            )}
        </Formik>
      </>
  )
}

async function addFieldJournalTemplateWithEterapias(token: string, fieldJournalTemplateId: string, eterapiasToAdd: any[]) {
    eterapiasToAdd.forEach(async eterapia => {
        await addFieldJournalTemplateWithOneEterapia(token, fieldJournalTemplateId, eterapia.id)
    })
}

async function addFieldJournalTemplateWithOneEterapia(token: string, fieldJournalTemplateId: string, eterapiaId: string) {
    const response = await api.put(`/eterapias/${eterapiaId}`, { fieldJournalTemplateId }, {
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });
}

async function getEterapias(token: string) {
    const response = await api.get('/eterapias', {
        headers: {
          'Authorization': `token ${token}`
        }
    });

    const eterapias = response.data;
    return eterapias;
}

async function createNewFieldJournalTemplate(token: string, 
                                        fieldJournalTemplateJson: FieldJournalTemplate) {
    
    const response = await api.post('/fieldjournaltemplates', fieldJournalTemplateJson, {
        params: {
          relations: ['eterapias']
        },
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });

    const fieldjournaltemplate = response.data;
    return fieldjournaltemplate;
}


// const jsonData = {
//     name: "testando front end",
//     description: {
//         title: "Não gosto do batman",
//         fieldTemplates: [
//             {name: "Qual o seu nome?", type: "string"},
//             {name: "Quanto é 2 + 2?", type: "int"},
//             {name: "Informe sua data de nascimento", type: "date"},
//             {name: "Voçê é estudante?", type: "boolean"}
//         ]
//     }
// }