import { Field, Form, Formik } from "formik";
import MyTitle from "../../components/MyTitle";
import * as Yup from 'yup';
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Divider } from "@chakra-ui/layout";

export default function ModeratorForm() {
    const SignupSchema = Yup.object().shape({
        email: Yup.string().email().required('Required'),
        password: Yup.string().required('Required'),
    });
    
    const initialValues = {
        email: '',
        password: '',
    }
    
    const functionSubmitForm = (values, actions) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 1000)      
        console.log(values);
    }

    return (
      <>
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
      </>
  )
}