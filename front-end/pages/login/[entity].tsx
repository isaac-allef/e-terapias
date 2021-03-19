import MyTitle from "../../components/shared/MyTitle";
import * as Yup from 'yup';
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Divider } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";

import api from '../../services/api';

import MyToast from "../../components/shared/MyToast";
import { useRouter } from 'next/router';
import LayoutLogin from "../../components/shared/LayoutLogin";
import Icon from "@chakra-ui/icon";
import { AiTwotoneMail, AiOutlineLock } from 'react-icons/ai';

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
    const { id, token } = await authenticationJWT(email, password);
    if (!token) {
        myToast.execute({
            title: 'Error', 
            status: 'error', 
            description: 'Incorrect email/password combination',
        })

        return;

    }
    
    localStorage.setItem('@eterapias:token', token);
    localStorage.setItem('@eterapias:myId', id);

    actions.setSubmitting(false);

    if (entity === 'administrator') {
        localStorage.setItem('@eterapias:entity', 'administrator');
        router.push('/administrator/dashboard');
    } else if (entity === 'moderator') {
        localStorage.setItem('@eterapias:entity', 'moderator');
        router.push('/moderator/fieldJournals/list');
    }
  }

  async function authenticationJWT(email: string, password: string): Promise<{ id: string, token: string } | null> {
    try {
        const response = await api.post(`/sessions/${entity}`, {
            email,
            password,
        });
        const { token } = response.data;
        const { id } = response.data[`${entity}`]
        return { id, token };
    } catch(error) {
        console.log(error);
        return { id: null, token: null };
    }
  }

  return (
      <LayoutLogin>
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
                        {/* <FormLabel htmlFor="email">Email</FormLabel> */}
                            <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<Icon as={AiTwotoneMail} color="gray.400" />} />
                                <Input {...field} id="email" placeholder="email" />
                            </InputGroup>
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                )}
            </Field>
            <Field name="password">
                {({ field, form }) => (
                    <FormControl marginTop='1rem' isInvalid={form.errors.password && form.touched.password}>
                        {/* <FormLabel htmlFor="password">Password</FormLabel> */}
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<Icon as={AiOutlineLock} color="gray.400" />} />
                            <Input {...field} id="password" placeholder="password" type="password" />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                )}
            </Field>

            <Divider />

            <Button
                mt={4}
                colorScheme="green"
                isLoading={props.isSubmitting}
                type="submit"
                width='100%'
                >
                Log in
            </Button>
        </Form>
        )}
        </Formik>
      </LayoutLogin>
  )
}
