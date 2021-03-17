import MyTitle from "../../components/shared/MyTitle";
import * as Yup from 'yup';
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Divider } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";

import api from '../../services/api';

import MyToast from "../../components/shared/MyToast";
import { useRouter } from 'next/router';

export default function Login() {
    const myToast = new MyToast();
    const router = useRouter();
    const { entity } = router.query;
    
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
    const token = await authenticationJWT(email, password);
    if (!token) {
        myToast.execute({
            title: 'Error', 
            status: 'error', 
            description: 'Incorrect email/password combination',
        })

        return;

    }
    
    localStorage.setItem(
        '@eterapias:token',
        token,
    );

    actions.setSubmitting(false);

    if (entity === 'administrator') {
        router.push('/administrator/dashboard');
    } else if (entity === 'moderator') {
        router.push('/');
    }
  }

  async function authenticationJWT(email: string, password: string): Promise<string | null> {
    try {
        const response = await api.post(`/sessions/${entity}`, {
            email,
            password,
        });
        const { token } = response.data;
        return token;
    } catch(error) {
        console.log(error);
        return null;
    }
  }

  return (
      <>
        <MyTitle>{`Login ${entity}`}</MyTitle>
        
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
                            <Input {...field} id="password" placeholder="password" type="password" />
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
      </>
  )
}
