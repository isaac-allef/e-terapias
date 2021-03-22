import { Field, Form, Formik } from "formik";
import MyTitle from "../../../components/shared/MyTitle";
import * as Yup from 'yup';
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Divider } from "@chakra-ui/layout";
import Layout from "../../../components/shared/Layout";
import api from '../../../services/api';
import { useRouter } from "next/router";
import MyToast from "../../../components/shared/MyToast";

interface Moderator {
    email: string;
    password: string;
}

export default function ModeratorForm() {
    const myToast = new MyToast();
    const router = useRouter();

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email().required('Required'),
        password: Yup.string().required('Required'),
    });
    
    const initialValues = {
        email: '',
        password: '',
    }
    
    const functionSubmitForm = async (values, actions) => {
        const { email, password } = values;

        const token = localStorage.getItem('@eterapias:token');

        try {
            const moderator = await saveNewModerator(token, { email, password });
            myToast.execute({ status: 'success', title: 'Moderator created.' });

            actions.setSubmitting(false);

            router.push('/administrator/moderators/list');
        } catch(err) {
            myToast.execute({ status: 'error', title: 'Error', description: err.message });
            actions.setSubmitting(false);
        }
    }

    return (
      <Layout>
        <MyTitle>{'Create Moderator'}</MyTitle>
        <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={functionSubmitForm}
        >
        {(props) => (
            <Form>
            <Field name="email">
                {({ field, form }) => (
                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                            <Input {...field} id="email" placeholder="email" />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                )}
            </Field>
            <Field name="password">
                {({ field, form }) => (
                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                            <Input {...field} id="password" placeholder="password" />
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                )}
            </Field>

            <Divider />

            <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
                >
                Submit
            </Button>
        </Form>
        )}
        </Formik>
      </Layout>
  )
}

async function saveNewModerator(token: string, moderatorJson: Moderator) {
    const response = await api.post('/moderators', moderatorJson, {
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });

    const eterapia = response.data;
    return eterapia;
}