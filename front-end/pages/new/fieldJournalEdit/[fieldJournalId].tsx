import { Flex, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MyToast from "../../../components/shared/MyToast";
import Layout from "../../../components/shared/Layout";
import MyTitle from "../../../components/shared/MyTitle";
import Question from "../../../components/new/fieldJournalForm/Question";
import MyDivider from "../../../components/shared/MyDivider";
import api from "../../../services/api";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import MyDatePicker from "../../../components/new/DatePicker/MyDatePicker";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { CalendarIcon } from "@chakra-ui/icons";
import MyButton from "../../../components/shared/MyButton";
import MyMenu from "../../../components/new/MyMenu";
import { typesOfQuestions } from "../../../utils/typesOfQuestions";

interface field {
    name: string;
    type: typesOfQuestions;
    value: string;
    options?: string[];
    isRequired: boolean;
}

interface fieldJournal {
    name: string;
    date: Date;
    fields: field[];
}

export default function FieldJournalForm() {
    const myToast = new MyToast();
    const router = useRouter();
    const id = router.query.fieldJournalId as string;
    const [date, setDate] = useState(new Date());
    const [fields, setFields] = useState([]);
	const [initialValues, setInitialValues] = useState(null);
	const [me, setMe] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('@etherapies:token'));
    }, []);

    function cleanUp() {
        setFields([]);
    }

    useEffect(() => {
        if (token) {
            if (id) {
                getFieldJournal(token, id).then(fieldJournal => setMe(fieldJournal));
            }
        }
	}, [token, id]);

    useEffect(() => {
        if (me) {
            setInitialValues({name: me.name})
            setDate(new Date(me.date))
            setFields(me.fields);
        }
    }, [me]);

    function handleChange(newValue, index) {
        const field = fields[index];
        if (field.type === 'check') {
            const findedIndex = field.value.findIndex(v => v === newValue);
            if (findedIndex > -1) {
                for( var i = 0; i < field.value.length; i++){ 
                    if ( field.value[i] === newValue) { 
                        field.value.splice(i, 1); 
                    }
                }
            } else {
                field.value = [...(field.value), newValue]
            }
        } else {
            field.value = newValue
        }
        setFields(fields);
    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
    });

    const functionSubmitForm = async (values, actions) => {
        const { name } = values;
        try {
            const fieldJournalJson: fieldJournal = {
                name,
                date,
                fields,
            }

            await putFieldJournals(token, id, fieldJournalJson);

            actions.setSubmitting(false);

            myToast.execute({ status: 'success', title: 'Field Journal updated.' });
            cleanUp();
            router.push('/new/myFieldJournalList');
        } catch (err) {
            myToast.execute({ status: 'error', title: 'Error', description: err.message });
        }
    }

    return (
        <Layout menu={<MyMenu manager={false} />}>
        <MyTitle>{'Edit Field Journal'}</MyTitle>
        
        {
            initialValues ?
            <>
            <Text fontSize='small' marginBottom='-1px'>Eterapia</Text>
            <Text>{ me?.etherapy.name }</Text>

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
                { fields?.map((field, index) => {
                    return <Question 
                        key={Math.random()}
                        label={field.name}
                        type={field.type}
                        index={index}
                        handleChange={handleChange}
                        defaultValue={field.value}
                        defaultOptions={field.options}
                        isRequired={field.isRequired}
                    />
                }) }

                <MyDivider />

                <Flex justifyContent='space-between' paddingBottom='3vh'>
                <MyButton styleType='delete' deleteFunction={() => {
                    deleteFieldJournal(token, me.id)
                    router.push('/new/myFieldJournalList');
                }} />

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
            </> : null
        }

        <MyDivider />
      </Layout>
  )
}

const getFieldJournal = async (token: string, id: string): Promise<any> => {
    const response = await api.get(`/moderators/me/fieldJournals/${id}`, {
        headers: {
          'Authorization': `token ${token}`
        }
    });

    const fieldJournal = response.data;
    return fieldJournal;
}

const putFieldJournals = async (token: string, id: string, fieldJournalJson: fieldJournal): Promise<any> => {
    const response = await api.put(`/fieldJournals/${id}`, fieldJournalJson, {
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });

    const fieldJournal = response.data;
    return fieldJournal;
}

const deleteFieldJournal = async (token: string, id: string): Promise<any> => {
    const response = await api.delete(`/fieldJournals/me/${id}`, {
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });

    return response.data;
}