import { Divider, Flex, Text } from "@chakra-ui/layout";
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
import { CalendarIcon, DeleteIcon } from "@chakra-ui/icons";
import MyButton from "../../../components/shared/MyButton";
import { Button } from "@chakra-ui/button";

interface field {
    name: string;
    type: string;
    value: string;
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
	}, [id]);

    useEffect(() => {
        if (me) {
            setInitialValues({name: me.name})
            setDate(new Date(me.date))
            setFields(me.fields);
        }
    }, [me]);

    function handleChange(newValue, index) {
        fields[index].value = newValue;
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
            router.push('/');
        } catch (err) {
            myToast.execute({ status: 'error', title: 'Error', description: err.message });
        }
    }

    return (
      <Layout>
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
                    />
                }) }

                <MyDivider />

                <Flex justifyContent='space-between' paddingBottom='3vh'>
                    <Button mt={4} colorScheme="red">
                        <DeleteIcon />
                    </Button>
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

        <Divider />
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