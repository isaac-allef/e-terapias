import { Button, IconButton } from "@chakra-ui/button";
import { Box, Container, Divider, Flex, Heading } from "@chakra-ui/layout";
import { DeleteIcon, Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import MyTitle from "../../../components/shared/MyTitle";
import MenuAddEterapias from "../../../components/fieldJournalTemplateForm/MenuAddEterapias";
import QuestionTemplate from "../../../components/fieldJournalTemplateForm/QuestionTemplate";
import MenuAddNewQuestionTemplate from "../../../components/fieldJournalTemplateForm/MenuAddNewQuestionTemplate";

import api from '../../../services/api';
import { Input } from "@chakra-ui/input";
import { Field, Form, Formik } from "formik";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";

import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Layout from "../../../components/shared/Layout";

import { IoMdCloseCircle } from 'react-icons/io';
import MyDivider from "../../../components/shared/MyDivider";

interface Question {
    id: number;
    name: string;
    type: 'short' | 'long';
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

    const addNewQuestionTemplate = (type: 'short' | 'long'): void => {
        const newQuestionTemplate: Question = { id: Math.random(), name: 'Type your question here', type }
        setQuestionsTemplates([...questionsTemplates, newQuestionTemplate])
    }

    const handleChangeQuestionTemplate = (newValue: string, id: number): void => {
        const newQuestionsTemplates = questionsTemplates.map(questionTemplate => {
            if (questionTemplate.id === id) {
                questionTemplate.name = newValue;
                return questionTemplate;
            }
            return questionTemplate;
        });
        setQuestionsTemplates(newQuestionsTemplates);
    }

    const handleRemove = (id: number): void => {
        const newQuestionsTemplates = questionsTemplates.filter(questionTemplate => questionTemplate.id !== id);
        setQuestionsTemplates(newQuestionsTemplates);
    }

    const questionsTemplatesTofieldTemplates = (): FiledTemplate[] => {
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

    const createFieldJournalTemplateJson = (name: string, title: string): FieldJournalTemplate => {
        const fieldTemplates = questionsTemplatesTofieldTemplates();
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

        const fieldJournalTemplateJson = createFieldJournalTemplateJson(name, title);

        const token = localStorage.getItem('@eterapias:token');
        const fieldJournalTemplate = await saveNewFieldJournalTemplate(token, fieldJournalTemplateJson);
    
        const fieldJournalTemplateId = fieldJournalTemplate.id;
        await addFieldJournalTemplateToEterapias(token, fieldJournalTemplateId, eterapiasToAdd)
        actions.setSubmitting(false);
    
        router.push('/administrator/fieldJournalsTemplates/list');
    }

    return (
      <Layout>
        <MyTitle>{'Create Field Journal Template'}</MyTitle>

        <MenuAddEterapias
            eterapias={eterapias}
            setEterapias={setEterapias}
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
                            <FormLabel htmlFor="name" margin='0px' >Name</FormLabel>
                                <Input {...field} id="name" />
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        </FormControl>
                    )}
                </Field>

                <Heading marginTop='3vh' marginBottom='3vh' size='md'>Description</Heading>

                <Field name="title">
                    {({ field, form }) => (
                        <FormControl isInvalid={form.errors.title && form.touched.title}>
                            <FormLabel htmlFor="title" margin='0px' >Title</FormLabel>
                                <Input {...field} id="title" type="title" />
                            <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                        </FormControl>
                    )}
                </Field>

                {
                questionsTemplates.map(question => {
                    return (
                        <Box key={question.id} position='relative'>
                            <QuestionTemplate 
                                id={question.id}
                                type={question.type}
                                label={question.name} 
                                handleChange={handleChangeQuestionTemplate}
                            />
                            <IconButton
                                top='15px'
                                right='-24px'
                                position='absolute'
                                variant='unstyled'
                                isRound={true}
                                size='lg'
                                boxSize='30px'
                                aria-label="close" 
                                icon={<Icon as={IoMdCloseCircle} boxSize='30px' color='#ec4646' />} 
                                onClick={() =>  handleRemove(question.id)}
                            />
                        </Box>
                    )
                })
                }

                <Flex justifyContent='flex-end'>
                    <MenuAddNewQuestionTemplate
                        setNewQuestionTemplate={addNewQuestionTemplate}
                    />
                </Flex>

                <MyDivider />

                <Flex justifyContent='flex-end' paddingBottom='3vh'>
                <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                    >
                    Save
                </Button>
                </Flex>
            </Form>
            )}
        </Formik>
      </Layout>
  )
}

const addFieldJournalTemplateToEterapias = async (
    token: string, 
    fieldJournalTemplateId: string, 
    eterapiasToAdd: any[]
    ): Promise<void> => {
    eterapiasToAdd.forEach(async eterapia => {
        await addFieldJournalTemplateToOneEterapia(token, fieldJournalTemplateId, eterapia.id)
    })
}

const addFieldJournalTemplateToOneEterapia = async (
    token: string, 
    fieldJournalTemplateId: string, 
    eterapiaId: string
    ): Promise<any> => {
    const response = await api.put(`/eterapias/${eterapiaId}`, { fieldJournalTemplateId }, {
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });

    const eterapia = response.data;
    return eterapia;
}

const getEterapias = async (token: string): Promise<any[]> => {
    const response = await api.get('/eterapias', {
        params: {
            relations: ['fieldJournalTemplate'],
            limit: 100,
          },
        headers: {
          'Authorization': `token ${token}`
        }
    });

    const eterapias = response.data;
    return eterapias;
}

const saveNewFieldJournalTemplate = async (
    token: string, 
    fieldJournalTemplateJson: FieldJournalTemplate
    ): Promise<any> => {
    const response = await api.post('/fieldjournaltemplates', fieldJournalTemplateJson, {
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });

    const fieldjournaltemplate = response.data;
    return fieldjournaltemplate;
}