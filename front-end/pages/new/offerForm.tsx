import { Flex } from "@chakra-ui/layout";
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
import MyMenu from "../../components/new/MyMenu";
import MyToast from "../../components/shared/MyToast";
import MyDatePicker from "../../components/new/DatePicker/MyDatePicker";

interface Offer {
    name: string;
    dateStart: Date;
    dateEnd: Date;
    settings: any;
}

export default function OfferForm() {
    const myToast = new MyToast();
    const router = useRouter();
    const [token, setToken] = useState('');
    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());

    useEffect(() => {
        setToken(localStorage.getItem('@etherapies:token'));
    }, []);

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        dateStart: Yup.date(),
        dateEnd: Yup.date(),
      });
    
      const initialValues = {
          name: '',
      }

    const functionSubmitForm = async (values, actions) => {
        try {
            const { name } = values;

            await postOffer(token, { name, dateStart, dateEnd, settings: {} });

            actions.setSubmitting(false);

            myToast.execute({ status: 'success', title: 'Template created.' });
        
            router.push('/new/dashboard');
        } catch (err) {
            myToast.execute({ status: 'error', title: 'Error', description: err.message });
        }
    }

    return (
        <Layout menu={null}>
        <MyTitle>{'Create Offer'}</MyTitle>

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
                
                <Flex direction='column'>
                    <FormControl>
                        <FormLabel>Date start</FormLabel>
                        <MyDatePicker selectedDate={dateStart} onChange={date => setDateStart(date as Date)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Date start</FormLabel>
                        <MyDatePicker selectedDate={dateEnd} onChange={date => setDateEnd(date as Date)} />
                    </FormControl>
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

const postOffer = async (token: string, offer: Offer): Promise<any> => {
    const response = await api.post('/offers', offer, {
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });

    const offerCreated = response.data;
    return offerCreated;
}