import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import { SmallAddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/input";
import { Field, Form, Formik } from "formik";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Layout from "../../components/shared/Layout";
import MyTitle from "../../components/shared/MyTitle";
import MyDivider from "../../components/shared/MyDivider";
import MyButton from "../../components/shared/MyButton";
import api from "../../services/api";
import MenuAddEtherapies from "../../components/new/templateForm/MenuAddEterapias";
import QuestionTemplate from "../../components/new/templateForm/QuestionTemplate";
import MyMenu from "../../components/new/MyMenu";
import MyToast from "../../components/shared/MyToast";

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
    const myToast = new MyToast();
    const router = useRouter();
    const [questionsTemplates, setQuestionsTemplates] = useState([]);
    const [etherapies, setEtherapies] = useState([]);
    const [etherapiesToAdd, setEtherapiesToAdd] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('@etherapies:token'));
    }, []);

    useEffect(() => {
        if (token) {
            getEtherapies(token).then(etherapies => {
                setEtherapies(etherapies);
            })
        }
    }, [token]);

    const addNewQuestionTemplate = (): void => {
        const newQuestionTemplate: Question = { id: Math.random(), name: 'Type your question here', type: 'short' }
        setQuestionsTemplates([...questionsTemplates, newQuestionTemplate])
    }

    const findQuestionTemplateIndex = (id: number): number => {
        const index = questionsTemplates.findIndex(questionTemplate => questionTemplate.id === id);
        return index;
    } 

    const changeQuestionTemplateValue = (newValue: string, id: number): void => {
        const index = findQuestionTemplateIndex(id);
        questionsTemplates[index].name = newValue;
        setQuestionsTemplates(questionsTemplates);
    }

    const changeQuestionTemplateType = (type: string, id: number): void => {
        const index = findQuestionTemplateIndex(id);
        const newQuestionsTemplates =  [...questionsTemplates]
        newQuestionsTemplates[index].type = type;
        setQuestionsTemplates(newQuestionsTemplates);
    }

    const removeQuestionTemplate = (id: number): void => {
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
        try {
            const { name } = values;

            const etherapiesIds = getIdsFromEtherapies(etherapiesToAdd);

            const templateJson = createTemplateJson(name, etherapiesIds);
            
            await postTemplates(token, templateJson);

            actions.setSubmitting(false);

            myToast.execute({ status: 'success', title: 'Template created.' });
        
            router.push('/new/templateList');
        } catch (err) {
            myToast.execute({ status: 'error', title: 'Error', description: err.message });
        }
    }

    return (
        <Layout menu={<MyMenu manager={true} />}>
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
                questionsTemplates?.map(question => {
                    return (
                        <Box key={question.id} position='relative'>
                            <QuestionTemplate 
                                id={question.id}
                                type={question.type}
                                label={question.name} 
                                handleChangeValue={changeQuestionTemplateValue}
                                handleChangeType={changeQuestionTemplateType}
                                handleRemove={removeQuestionTemplate}
                            />
                        </Box>
                    )
                })
                }

                <Flex justifyContent='flex-end'>
                    <Button 
                        variant='outline'
                        onClick={() => addNewQuestionTemplate()}
                    ><SmallAddIcon /></Button>
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

    const templateCreated = response.data;
    return templateCreated;
}