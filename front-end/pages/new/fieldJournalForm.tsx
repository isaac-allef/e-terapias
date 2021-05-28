import { Divider, Flex, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MyToast from "../../components/shared/MyToast";
import Layout from "../../components/shared/Layout";
import MyTitle from "../../components/shared/MyTitle";
import MenuSelectEtherapy from "../../components/new/fieldJournalForm/MenuSelectEtherapy";
import Question from "../../components/new/fieldJournalForm/Question";
import MyDivider from "../../components/shared/MyDivider";
import api from "../../services/api";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import MyDatePicker from "../../components/new/DatePicker/MyDatePicker";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { CalendarIcon } from "@chakra-ui/icons";
import MyButton from "../../components/shared/MyButton";
import MyMenu from "../../components/new/MyMenu";

interface field {
    name: string;
    type: string;
    value: string;
}

interface templateField {
    name: string;
    type: 'short' | 'long';
}

interface fieldJournal {
    name: string;
    date: Date;
    fields: field[];
    etherapyId: string;
}

export default function FieldJournalForm() {
    const myToast = new MyToast();
    const router = useRouter();
    const [date, setDate] = useState(new Date());
    const [fields, setFields] = useState([]);
    const [templateFields, setTemplateFields] = useState([]);
    const [etherapies, setEtherapies] = useState([]);
    const [etherapySelected, setEtherapySelected] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('@etherapies:token'));
    }, []);

    function cleanUp() {
        setFields([]);
        setEtherapySelected(null);
    }

    useEffect(() => {
        if (token) {
            getMyInformations(token).then(me => {
                setEtherapies(me.etherapies);
            })
        }
    }, [token]);

    const createFieldsBasedInTemplateFields = (templateFields: templateField[]): field[] => {
        const fields: field[] = templateFields?.map(templateField => ({
            name: templateField.name,
            type: templateField.type,
            value: '',
        }));

        return fields;
    }

    useEffect(() => {
        const templateFieldsExists = etherapySelected?.template.templateFields;
        setTemplateFields(templateFieldsExists);
        const newFields = createFieldsBasedInTemplateFields(templateFieldsExists);
        setFields(newFields);
    }, [etherapySelected]);

    function handleChange(newValue, index) {
        fields[index].value = newValue;
        setFields(fields);
    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
      });
    
    const initialValues = {
        name: '',
    }

    const functionSubmitForm = async (values, actions) => {
        const { name } = values;
        try {
            const fieldJournalJson: fieldJournal = {
                name,
                date,
                fields,
                etherapyId: etherapySelected.id,
            }

            await postFieldJournals(token, fieldJournalJson);

            actions.setSubmitting(false);

            myToast.execute({ status: 'success', title: 'Field Journal created.' });
            cleanUp();
            router.push('/');
        } catch (err) {
            myToast.execute({ status: 'error', title: 'Error', description: err.message });
        }
    }

    return (
        <Layout menu={<MyMenu manager={true} />}>
        <MyTitle>{'Create Field Journal'}</MyTitle>
        
        <Text fontSize='small' marginBottom='-1px'>Eterapia</Text>
        <MenuSelectEtherapy
            etherapies={etherapies}
            setEtherapySelected={setEtherapySelected}
        />

        <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={functionSubmitForm}
            >
            {(props) => (
                <Form>
            <Text>Date</Text>
            <InputGroup>
                <InputLeftAddon children={<CalendarIcon color="gray.500" />} />
                <MyDatePicker selectedDate={date} onChange={date => setDate(date as Date)} />
            </InputGroup>
            <Field name="name">
                {({ field, form }) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel htmlFor="name" margin='0px' >Name</FormLabel>
                            <Input {...field} id="name" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                )}
            </Field>
            { templateFields?.map((templateField, index) => {
                return <Question 
                    key={Math.random()}
                    label={templateField.name}
                    type={templateField.type}
                    index={index}
                    handleChange={handleChange}
                />
            }) }

            <MyDivider />

            <Flex justifyContent='flex-end'>
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

        <Divider />
      </Layout>
  )
}

const getMyInformations = async (token: string): Promise<any> => {
    const response = await api.get('/moderators/me', {
        headers: {
          'Authorization': `token ${token}`
        }
    });

    const myInformations = response.data;
    return myInformations;
}

const postFieldJournals = async (token: string, fieldJournalJson: fieldJournal): Promise<any> => {
    const response = await api.post('/fieldJournals', fieldJournalJson, {
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });

    const fieldJournal = response.data;
    return fieldJournal;
}