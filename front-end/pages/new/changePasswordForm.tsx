import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Layout from "../../components/shared/Layout";
import MyTitle from "../../components/shared/MyTitle";
import MyDivider from "../../components/shared/MyDivider";
import MyButton from "../../components/shared/MyButton";
import api from "../../services/api";
import { PasswordInput } from "../../components/shared/PasswordInput";
import MyToast from "../../components/shared/MyToast";
import { Button } from "@chakra-ui/button";

interface changePassword {
    currentPassword: string,
	newPassword: string,
	newPasswordConfirmation: string,
}

export default function ChangePasswordForm() {
    const myToast = new MyToast();
    const router = useRouter();
    // const [token, setToken] = useState(localStorage.getItem('@etherapies:token'));
    const [token, _] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhhMDRjNGEwLTVhY2MtNDVhZi1iOTMxLWYyNTRmOTE0YmQ3YyIsImlhdCI6MTYyMTAyODg5OH0.tbSNd_Cl32z_phFMHcpMGjDcb80a32vZRtzOmS_wVUc');

    const SignupSchema = Yup.object().shape({
        currentPassword: Yup.string().required('Required'),
        newPassword: Yup.string().required('Required').notOneOf([Yup.ref('currentPassword'), null], 'New password must be different from current'),
        newPasswordConfirmation: Yup.string().oneOf([Yup.ref('newPassword'), null], 'New password and new password confirmation must match'),
      });
    
      const initialValues = {
          currentPassword: '',
          newPassword: '',
          newPasswordConfirmation: '',
      }

    const functionSubmitForm = async (values, actions) => {
        try {
        const { currentPassword, newPassword, newPasswordConfirmation } = values;

        const changePasswordBody: changePassword = {
            currentPassword,
            newPassword,
            newPasswordConfirmation,
        }
        
        await patchChangePassword(token, changePasswordBody);

        actions.setSubmitting(false);
        
        myToast.execute({ status: 'success', title: 'Passwor changed' });

        router.push('/');
        } catch (err) {
            myToast.execute({ status: 'error', title: 'Error', description: err.message });
        }
    }

    return (
      <Layout>
        <MyTitle>{'Change Password'}</MyTitle>

        <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={functionSubmitForm}
            >
            {(props) => (
                <Form>
                <Field name="currentPassword">
                    {({ field, form }) => (
                        <FormControl isRequired isInvalid={form.errors.currentPassword && form.touched.currentPassword}>
                            <FormLabel htmlFor="currentPassword" margin='0px' >Current password</FormLabel>
                                <PasswordInput props={field} id="currentPassword" />
                            <FormErrorMessage>{form.errors.currentPassword}</FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
                <Field name="newPassword">
                    {({ field, form }) => (
                        <FormControl isRequired isInvalid={form.errors.newPassword && form.touched.newPassword}>
                            <FormLabel htmlFor="newPassword" margin='0px' >New password</FormLabel>
                                <PasswordInput props={field} id="newPassword" />
                            <FormErrorMessage>{form.errors.newPassword}</FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
                <Field name="newPasswordConfirmation">
                    {({ field, form }) => (
                        <FormControl isRequired isInvalid={form.errors.newPasswordConfirmation && form.touched.newPasswordConfirmation}>
                            <FormLabel htmlFor="newPasswordConfirmation" margin='0px' >New password confirmation</FormLabel>
                                <PasswordInput props={field} id="newPasswordConfirmation" />
                            <FormErrorMessage>{form.errors.newPasswordConfirmation}</FormErrorMessage>
                        </FormControl>
                    )}
                </Field>

                <MyDivider />

                <Flex justifyContent='flex-end' paddingBottom='3vh'>
                <Button colorScheme="yellow"
                    mt={4}
                    isLoading={props.isSubmitting}
                    type="submit"
                    >
                    Change
                </Button>
                </Flex>
                </Form>
            )}
        </Formik>
      </Layout>
  )
}

const patchChangePassword = async (token: string, body: changePassword): Promise<any> => {
    const response = await api.patch('/moderators/me/changePassword', body, {
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });

    const isChanged = response.data;
    return isChanged;
}
