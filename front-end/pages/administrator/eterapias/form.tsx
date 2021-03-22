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

interface Eterapia {
    name: string;
}

export default function EterapiaForm() {
    const myToast = new MyToast();
    const router = useRouter();

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
    });
    
    const initialValues = {
        name: '',
    }
    
    const functionSubmitForm = async (values, actions) => {
        const { name } = values;

        const token = localStorage.getItem('@eterapias:token');

        try {
            const eterapia = await saveNewEterapia(token, { name });
            myToast.execute({ status: 'success', title: 'Eterapia created.' });

            actions.setSubmitting(false);

            router.push('/administrator/eterapias/list');
        } catch(err) {
            myToast.execute({ status: 'error', title: 'Error', description: err.message });
            actions.setSubmitting(false);
        }

    }

    return (
      <Layout>
        <MyTitle>{'Create Eterapia'}</MyTitle>
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

async function saveNewEterapia(token: string, eterapiaJson: Eterapia) {
    const response = await api.post('/eterapias', eterapiaJson, {
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });

    const eterapia = response.data;
    return eterapia;
  }