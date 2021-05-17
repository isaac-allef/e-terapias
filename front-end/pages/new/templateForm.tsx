import { IconButton } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/input";
import { Field, Form, Formik } from "formik";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";

import * as Yup from 'yup';
import { useRouter } from 'next/router';

import { IoMdCloseCircle } from 'react-icons/io';
import Layout from "../../components/shared/Layout";
import MyTitle from "../../components/shared/MyTitle";
import MyDivider from "../../components/shared/MyDivider";
import MyButton from "../../components/shared/MyButton";
import api from "../../services/api";
import MenuAddEtherapies from "../../components/fieldJournalTemplateForm/MenuAddEterapias";
import QuestionTemplate from "../../components/fieldJournalTemplateForm/QuestionTemplate";
import MenuAddNewQuestionTemplate from "../../components/fieldJournalTemplateForm/MenuAddNewQuestionTemplate";

interface Question {
    id: number;
    name: string;
    type: 'short' | 'long';
}

interface FiledTemplate {
    name: string;
    type: 'short' | 'long';
}

interface Template {
    description: {
        name: string;
        templateFields: FiledTemplate[];
        etherapiesIds: string[];
    }
}

export default function TemplateForm() {
    const router = useRouter();
    const [questionsTemplates, setQuestionsTemplates] = useState([]);
    const [etherapies, setEtherapies] = useState([]);
    const [etherapiesToAdd, setEtherapiesToAdd] = useState([]);
    // const [token, setToken] = useState(localStorage.getItem('@etherapies:token'));
    const [token, _] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmZTJmYmQyLTRmNTYtNGY0ZS04NzcwLTJjMzc0MTI3MTU2YiIsImlhdCI6MTYyMTAyODk0N30.3HzZioMqIsu1pR_Fb8c9whLOUeho7bh_eZRXN-RtuCI');

    useEffect(() => {
        getEtherapies(token).then(etherapies => {
            setEtherapies(etherapies);
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

    const parseQuestionsTemplatesToTemplateFields = (): FiledTemplate[] => {
        return questionsTemplates.map(questionTemplate => {    
            return {
                name: questionTemplate.name,
                type: questionTemplate.type,
            }
        });
    }

    const getIdsFromEtherapies = (etherapies: any[]): string[] => {
        return etherapies.map(etherapy => etherapy.id);
    }

    const createTemplateJson = (name: string, etherapiesIds: string[]): Template => {
        const templateFields = parseQuestionsTemplatesToTemplateFields();
        return {
            description: {
                name,
                templateFields,
                etherapiesIds,
            }
        }
    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
      });
    
      const initialValues = {
          name: '',
      }

    const functionSubmitForm = async (values, actions) => {
        const { name } = values;

        const etherapiesIds = getIdsFromEtherapies(etherapiesToAdd);

        const templateJson = createTemplateJson(name, etherapiesIds);
        
        const template = await postTemplates(token, templateJson);

        actions.setSubmitting(false);

        console.log(template);
    
        router.push('/');
    }

    return (
      <Layout>
        <MyTitle>{'Create Template'}</MyTitle>

        <MenuAddEtherapies
            eterapias={etherapies}
            setEterapias={setEtherapies}
            eterapiasToAdd={etherapiesToAdd}
            setEterapiasToAdd={setEtherapiesToAdd}
            warningEterapiaHasAFieldJournalTemplate={true}
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
                <MyButton
                    mt={4}
                    isLoading={props.isSubmitting}
                    type="submit"
                    >
                    Save
                </MyButton>
                </Flex>
            </Form>
            )}
        </Formik>
      </Layout>
  )
}

const getEtherapies = async (token: string): Promise<any[]> => {
    const response = await api.get('/etherapies', {
        params: {
            per_page: 100,
          },
        headers: {
          'Authorization': `token ${token}`
        }
    });

    const etherapies = response.data;
    return etherapies;
}

const postTemplates = async (token: string, template: Template): Promise<any> => {
    const response = await api.post('/templates', template, {
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });

    const etherapies = response.data;
    return etherapies;
}