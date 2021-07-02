import * as Yup from 'yup';
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Divider, Flex } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import MyToast from "../../components/shared/MyToast";
import { useRouter } from 'next/router';
import Icon from "@chakra-ui/icon";
import { AiTwotoneMail } from 'react-icons/ai';
import { BiKey } from 'react-icons/bi';
import { IoIosDocument } from 'react-icons/io';
import Layout from "../../components/shared/Layout";
import { Textarea } from "@chakra-ui/textarea";
import axios from 'axios';
import { useEffect, useState } from "react";
import MyMenu from '../../components/new/MyMenu';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import api from '../../services/api';

export default function Login() {
    const myToast = new MyToast();
    const router = useRouter();
    const [initialValues, setInitialValues] = useState(null);
    const [token, setToken] = useState('');
    const [offerId, setOfferId] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('@etherapies:token'));
        setOfferId(localStorage.getItem('@etherapies:offerId'));
    }, []);

    const uploadEtherapiesList = async () => {
        return axios.post('/api/uploadEtherapiesList', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
    }

    const uploadModeratorsList = async () => {
        return axios.post('/api/uploadModeratorsList', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
    }

    useEffect(() => {
        if (token && offerId) {
            getSettings(token, offerId).then(settings => {
                setInitialValues(settings);
            });
        }
    }, [token, offerId]);
    
  const SignupSchema = Yup.object().shape({
      client_email: Yup.string().email(),
      private_key: Yup.string().matches(/^-----BEGIN PRIVATE KEY-----.*-----END PRIVATE KEY-----\\n$/, 'Private key is no valid'),
      moderatorsLink: Yup.string(),
      moderatorsIndex: Yup.number().default(0),
      moderatorsColumnEmail: Yup.string(),
      moderatorsColumnName: Yup.string(),
      moderatorsColumnEtherapiesIdentifiers: Yup.string(),
      etherapiesLink: Yup.string(),
      etherapiesIndex: Yup.number().default(0),
      etherapyColumnIdentifier: Yup.string(),
      etherapyColumnName: Yup.string(),
  });

  const functionSubmitForm = async (values, actions) => {
    const { 
        client_email,
        private_key,
        moderatorsLink,
        moderatorsIndex,
        moderatorsColumnEmail,
        moderatorsColumnName,
        moderatorsColumnEtherapiesIdentifiers,
        etherapiesLink,
        etherapiesIndex,
        etherapyColumnIdentifier,
        etherapyColumnName,
    } = values;

    console.log(etherapiesIndex)

    try {
        const settings: settings = {
            serviceAccount: {
                client_email,
                private_key,
            },
            moderators: {
                sheet_link: moderatorsLink,
                sheet_index: moderatorsIndex,
                column_email: moderatorsColumnEmail,
                column_name: moderatorsColumnName,
                column_etherapies_identifiers: moderatorsColumnEtherapiesIdentifiers,
            },
            etherapies: {
                sheet_link: etherapiesLink,
                sheet_index: etherapiesIndex,
                column_name: etherapyColumnIdentifier,
                column_identifier: etherapyColumnName,
            }
        }

        await putSettings(token, offerId, settings);

        actions.setSubmitting(false);

        myToast.execute({ status: 'success', title: 'Field Journal updated.' });
    } catch (err) {
        myToast.execute({ status: 'error', title: 'Error', description: err.message });
    }
  }

  return (
    <Layout menu={<MyMenu manager={true} itemSelected='settings' />}>
        <Flex justifyContent='space-around' paddingBottom='3vh'>
            {
                uploadListForm(
                    'Upload etherapies list', 
                    uploadEtherapiesList,
                    () => myToast.execute({ status: 'success', title: 'Etherapies list updated' }),
                    (err) => myToast.execute({ status: 'error', title: 'Error', description: err.message })
                )
            }
            {
                uploadListForm(
                    'Upload moderators list', 
                    uploadModeratorsList,
                    () => myToast.execute({ status: 'success', title: 'Moderators list updated' }),
                    (err) => myToast.execute({ status: 'error', title: 'Error', description: err.message })
                )
            }
        </Flex>
        {   initialValues ?
            settingsSheetsForm(initialValues, SignupSchema, functionSubmitForm)
            : null
        }
      </Layout>
  )
}

const getSettings = async (token, offerId)  => {
    const result = await api.get(`/offers/${offerId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
    });

    const offer = result.data;

    const { settings } = offer;

    return {
        client_email: settings?.serviceAccount?.client_email,
        private_key: settings?.serviceAccount?.private_key,
        moderatorsLink: settings?.moderators?.sheet_link,
        moderatorsIndex: settings?.moderators?.sheet_index,
        moderatorsColumnEmail: settings?.moderators?.column_email,
        moderatorsColumnName: settings?.moderators?.column_name,
        moderatorsColumnEtherapiesIdentifiers: settings?.moderators?.column_etherapies_identifiers,
        etherapiesLink: settings?.etherapies?.sheet_link,
        etherapiesIndex: settings?.etherapies?.sheet_index,
        etherapyColumnIdentifier: settings?.etherapies?.column_identifier,
        etherapyColumnName: settings?.etherapies?.column_name,
    };
}

interface settings {
    serviceAccount: {
        client_email: string,
        private_key: string,
    },
    moderators: {
        sheet_link: string,
        sheet_index: number,
        column_email: string,
        column_name: string,
        column_etherapies_identifiers: string,
    },
    etherapies: {
        sheet_link: string,
        sheet_index: number,
        column_identifier: string,
        column_name: string,
    }
};

const putSettings = async (token: string, offerId: string, settings: settings): Promise<any> => {
    const response = await api.put(`/offers/${offerId}`, { settings }, {
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });

    const offer = response.data;
    return offer;
}

const settingsSheetsForm = (initialValues, SignupSchema, functionSubmitForm) => (
    <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={functionSubmitForm}
        >
        {(props) => (
            <Form>
            <Accordion defaultIndex={[0]} allowToggle>
            <AccordionItem>
                <AccordionButton _expanded={{ bg: "blue.500", color: "white" }}>
                    <Box flex="1" textAlign="left">
                    <Heading size='sm'>Service account</Heading>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <Field name="client_email">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.client_email && form.touched.client_email}>
                            <FormLabel margin={0} htmlFor="client_email">Client email</FormLabel>
                            <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<Icon as={AiTwotoneMail} color="gray.400" />} />
                                <Input {...field} id="client_email" placeholder="Client email" />
                            </InputGroup>
                        <   FormErrorMessage>{form.errors.client_email}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                    <Field name="private_key">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.private_key && form.touched.private_key}>
                            <FormLabel margin={0} htmlFor="private_key">Private key</FormLabel>
                            <InputGroup>
                            <InputRightElement pointerEvents="none" children={<Icon as={BiKey} color="gray.400" />} />
                                <Textarea {...field} id="private_key" placeholder="Private key" />
                            </InputGroup>
                        <   FormErrorMessage>{form.errors.private_key}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionButton _expanded={{ bg: "blue.500", color: "white" }}>
                    <Box flex="1" textAlign="left">
                    <Heading size='sm'>Sheet moderators</Heading>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <Field name="moderatorsLink">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.moderatorsLink && form.touched.moderatorsLink}>
                            <FormLabel margin={0} htmlFor="moderatorsLink">Link</FormLabel>
                            <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<Icon as={IoIosDocument} color="gray.400" />} />
                                <Input {...field} id="moderatorsLink" placeholder="Id" />
                            </InputGroup>
                        <   FormErrorMessage>{form.errors.moderatorsLink}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                    <Field name="moderatorsIndex">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.moderatorsIndex && form.touched.moderatorsIndex}>
                            <FormLabel margin={0} htmlFor="moderatorsIndex">Index</FormLabel>
                            <InputGroup>
                                <NumberInput 
                                    {...field} id="moderatorsIndex"
                                    onChange={ (val) => form.setFieldValue(field.name, val) }
                                    min={0} max={100}
                                >
                                <NumberInputField {...field} id="moderatorsIndex" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                                </NumberInput>
                            </InputGroup>
                        <   FormErrorMessage>{form.errors.moderatorsIndex}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                    <Field name="moderatorsColumnEmail">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.moderatorsColumnEmail && form.touched.moderatorsColumnEmail}>
                            <FormLabel margin={0} htmlFor="moderatorsColumnEmail">Column email</FormLabel>
                            <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<Icon as={IoIosDocument} color="gray.400" />} />
                                <Input {...field} id="moderatorsColumnEmail" placeholder="column email" />
                            </InputGroup>
                        <   FormErrorMessage>{form.errors.moderatorsColumnEmail}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                    <Field name="moderatorsColumnName">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.moderatorsColumnName && form.touched.moderatorsColumnName}>
                            <FormLabel margin={0} htmlFor="moderatorsColumnName">Moderator column name</FormLabel>
                            <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<Icon as={IoIosDocument} color="gray.400" />} />
                                <Input {...field} id="moderatorsColumnName" placeholder="column name" />
                            </InputGroup>
                        <   FormErrorMessage>{form.errors.moderatorsColumnName}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                    <Field name="moderatorsColumnEtherapiesIdentifiers">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.moderatorsColumnEtherapiesIdentifiers && form.touched.moderatorsColumnEtherapiesIdentifiers}>
                            <FormLabel margin={0} htmlFor="moderatorsColumnEtherapiesIdentifiers">Moderator column etherapies identifiers</FormLabel>
                            <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<Icon as={IoIosDocument} color="gray.400" />} />
                                <Input {...field} id="moderatorsColumnEtherapiesIdentifiers" placeholder="column etherapies identifiers" />
                            </InputGroup>
                        <   FormErrorMessage>{form.errors.moderatorsColumnEtherapiesIdentifiers}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionButton _expanded={{ bg: "blue.500", color: "white" }}>
                    <Box flex="1" textAlign="left">
                    <Heading size='sm'>Sheet etherapies</Heading>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <Field name="etherapiesLink">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.etherapiesLink && form.touched.etherapiesLink}>
                            <FormLabel margin={0} htmlFor="etherapiesLink">Doc id moderators</FormLabel>
                            <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<Icon as={IoIosDocument} color="gray.400" />} />
                                <Input {...field} id="etherapiesLink" placeholder="Id" />
                            </InputGroup>
                        <   FormErrorMessage>{form.errors.etherapiesLink}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                    <Field name="etherapiesIndex">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.etherapiesIndex && form.touched.etherapiesIndex}>
                            <FormLabel margin={0} htmlFor="etherapiesIndex">Index</FormLabel>
                            <InputGroup>
                                <NumberInput 
                                    {...field} id="etherapiesIndex"
                                    onChange={ (val) => form.setFieldValue(field.name, val) }
                                    min={0} max={100}
                                >
                                <NumberInputField {...field} id="etherapiesIndex" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                                </NumberInput>
                            </InputGroup>
                        <   FormErrorMessage>{form.errors.etherapiesIndex}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                    <Field name="etherapyColumnIdentifier">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.etherapyColumnIdentifier && form.touched.etherapyColumnIdentifier}>
                            <FormLabel margin={0} htmlFor="etherapyColumnIdentifier">Etherapy column identifier</FormLabel>
                            <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<Icon as={IoIosDocument} color="gray.400" />} />
                                <Input {...field} id="etherapyColumnIdentifier" placeholder="Id" />
                            </InputGroup>
                        <   FormErrorMessage>{form.errors.etherapyColumnIdentifier}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                    <Field name="etherapyColumnName">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.etherapyColumnName && form.touched.etherapyColumnName}>
                            <FormLabel margin={0} htmlFor="etherapyColumnName">Etherapy column name</FormLabel>
                            <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<Icon as={IoIosDocument} color="gray.400" />} />
                                <Input {...field} id="etherapyColumnName" placeholder="Id" />
                            </InputGroup>
                        <   FormErrorMessage>{form.errors.etherapyColumnName}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                </AccordionPanel>
            </AccordionItem>
            </Accordion>
            
            <Divider />

            <Button
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

const uploadListForm = (
    text: string, 
    uploadList: Function, 
    toastSuccess?: Function,
    toastError?: Function ) => (
    <Formik
            initialValues={{}}
            onSubmit={async (values, actions) => {
                try {
                    await uploadList();
                    actions.setSubmitting(false);
                    toastSuccess? toastSuccess() : null;
                } catch (err) {
                    toastError? toastError(err) : null;
                }
            }}
            >
            {(props) => (
                <Form>
                    <Button 
                        isLoading={props.isSubmitting}
                        type="submit"
                    >{ text }</Button>
                </Form>
            )}
        </Formik>
)