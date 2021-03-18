import { Field, Form, Formik } from "formik";
import MyTitle from "../../../components/shared/MyTitle";
import * as Yup from 'yup';
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Divider } from "@chakra-ui/layout";
import Header from "../../../components/shared/Header";

export default function EterapiaForm() {
    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
    });
    
    const initialValues = {
        name: '',
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
        <Header />
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
      </>
  )
}