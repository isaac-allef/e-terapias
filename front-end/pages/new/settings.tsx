import MyTitle from "../../components/shared/MyTitle";
import * as Yup from 'yup';
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Divider, Flex } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";

import api from '../../services/api';

import MyToast from "../../components/shared/MyToast";
import { useRouter } from 'next/router';
import Icon from "@chakra-ui/icon";
import { AiTwotoneMail } from 'react-icons/ai';
import { BiKey } from 'react-icons/bi';
import { IoIosDocument } from 'react-icons/io';
import Layout from "../../components/shared/Layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Textarea } from "@chakra-ui/textarea";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function Login() {
    const myToast = new MyToast();
    const router = useRouter();
    const [initialValues, setInitialValues] = useState(null);

    const getSettings = async () => {
        return axios.get('/api/getSettingsGoogleSheets');
    }

    useEffect(() => {
        getSettings().then(settings => {
            setInitialValues(settings.data);
        });
    }, []);
    
  const SignupSchema = Yup.object().shape({
    docIdEtherapies: Yup.string(),
    docIdModerators: Yup.string(),
    client_email: Yup.string().email(),
    private_key: Yup.string().matches(/^-----BEGIN PRIVATE KEY-----.*-----END PRIVATE KEY-----\\n$/, 'Private key is no valid'),
  });

  const functionSubmitForm = async (values, actions) => {
    const { linkEtherapiesSheet, linkModeratorsSheet } = values;
  }

  return (
      <Layout>
        <Tabs isFitted variant='line'>
            <TabList mb="1em">
                <Tab>Settings</Tab>
                <Tab>Uploads</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    {   initialValues ?
                        settingsSheetsForm(initialValues, SignupSchema, functionSubmitForm)
                        : null
                    }
                </TabPanel>
                <TabPanel>
                    <Flex justifyContent='space-around' paddingBottom='3vh'>
                        <Button>Upload etherapies list</Button>
                        <Button>Upload moderators list</Button>
                    </Flex>
                </TabPanel>
            </TabPanels>
        </Tabs>
      </Layout>
  )
}

const settingsSheetsForm = (initialValues, SignupSchema, functionSubmitForm) => (
    <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={functionSubmitForm}
        >
        {(props) => (
            <Form>
            <Field name="docIdEtherapies">
                {({ field, form }) => (
                <FormControl isInvalid={form.errors.docIdEtherapies && form.touched.docIdEtherapies}>
                    <FormLabel htmlFor="docIdEtherapies">Doc id etherapies</FormLabel>
                    <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<Icon as={IoIosDocument} color="gray.400" />} />
                        <Input disabled {...field} id="docIdEtherapies" placeholder="Id" />
                    </InputGroup>
                <   FormErrorMessage>{form.errors.docIdEtherapies}</FormErrorMessage>
                </FormControl>
                )}
            </Field>
            <Field name="docIdModerators">
                {({ field, form }) => (
                <FormControl isInvalid={form.errors.docIdModerators && form.touched.docIdModerators}>
                    <FormLabel htmlFor="docIdModerators">Doc id moderators</FormLabel>
                    <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<Icon as={IoIosDocument} color="gray.400" />} />
                        <Input disabled {...field} id="docIdModerators" placeholder="Id" />
                    </InputGroup>
                <   FormErrorMessage>{form.errors.docIdModerators}</FormErrorMessage>
                </FormControl>
                )}
            </Field>
            <Field name="client_email">
                {({ field, form }) => (
                <FormControl isInvalid={form.errors.client_email && form.touched.client_email}>
                    <FormLabel htmlFor="client_email">Client email</FormLabel>
                    <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<Icon as={AiTwotoneMail} color="gray.400" />} />
                        <Input disabled {...field} id="client_email" placeholder="Client email" />
                    </InputGroup>
                <   FormErrorMessage>{form.errors.client_email}</FormErrorMessage>
                </FormControl>
                )}
            </Field>
            <Field name="private_key">
                {({ field, form }) => (
                <FormControl isInvalid={form.errors.private_key && form.touched.private_key}>
                    <FormLabel htmlFor="private_key">Private key</FormLabel>
                    <InputGroup>
                    <InputRightElement pointerEvents="none" children={<Icon as={BiKey} color="gray.400" />} />
                        <Textarea disabled {...field} id="private_key" placeholder="Private key" />
                    </InputGroup>
                <   FormErrorMessage>{form.errors.private_key}</FormErrorMessage>
                </FormControl>
                )}
            </Field>
            <Divider />

            <Button
                disabled
                mt={4}
                colorScheme="green"
                isLoading={props.isSubmitting}
                type="submit"
                >
                Save
            </Button>
            </Form>
        )}
        </Formik>
);