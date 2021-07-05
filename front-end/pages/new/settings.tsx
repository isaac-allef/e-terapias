import * as Yup from 'yup';
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Divider, Flex } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import MyToast from "../../components/shared/MyToast";
import { useRouter } from 'next/router';
import Icon from "@chakra-ui/icon";
import { AiOutlineCloudSync, AiTwotoneMail } from 'react-icons/ai';
import { BiKey } from 'react-icons/bi';
import { IoIosDocument } from 'react-icons/io';
import Layout from "../../components/shared/Layout";
import { Textarea } from "@chakra-ui/textarea";
import axios from 'axios';
import { useEffect, useState } from "react";
import MyMenu from '../../components/new/MyMenu';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import api from '../../services/api';
import MyTitle from '../../components/shared/MyTitle';

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
      etherapiesColumnIdentifier: Yup.string(),
      etherapiesColumnName: Yup.string(),
      participantsLink: Yup.string(),
      participantsIndex: Yup.number().default(0),
      participantsColumnMainChoiceEtherapy: Yup.string(),
      participantsColumnsOthersChoiceEtherapies: Yup.string(),
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
        etherapiesColumnIdentifier,
        etherapiesColumnName,
        participantsLink,
        participantsIndex,
        participantsColumnMainChoiceEtherapy,
        participantsColumnsOthersChoiceEtherapies,
    } = values;
    
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
                column_identifier: etherapiesColumnIdentifier,
                column_name: etherapiesColumnName,
            },
            participants: {
                sheet_link: participantsLink,
                sheet_index: participantsIndex,
                column_main_choice_etherapy: participantsColumnMainChoiceEtherapy,
                columns_others_choice_etherapies: participantsColumnsOthersChoiceEtherapies
                                                    ?.replace(/(\r\n|\n|\r)/gm, "")
                                                    .replace(/ /g,'')
                                                    .split(';'),
            }
        }

        await putSettings(token, offerId, settings);

        actions.setSubmitting(false);

        myToast.execute({ status: 'success', title: 'Field Journal updated.' });
    } catch (err) {
        myToast.execute({ status: 'error', title: 'Error', description: err.message });
    }
  }

  const syncEtherapies = async (
      client_email, 
      private_key, 
      link, 
      index, 
      column_identifier, 
      column_name
    ) => {
      try {
        await syncEtherapiesList(
            token, 
            offerId, 
            client_email, 
            private_key, 
            link, 
            index, 
            column_identifier, 
            column_name
        );
        myToast.execute({ status: 'success', title: 'Etherapies list updated' })
    } catch (err) {
        myToast.execute({ status: 'error', title: 'Error', description: err.message })
    }
  }

  const syncModerators = async (
      client_email, 
      private_key, 
      link, 
      index, 
      column_email, 
      column_name, 
      column_etherapies_identifiers
    ) => {
    try {
      await syncModeratorsList(
          token, 
          offerId, 
          client_email, 
          private_key, 
          link, 
          index, 
          column_email, 
          column_name, 
          column_etherapies_identifiers
        );
      myToast.execute({ status: 'success', title: 'Moderators list updated' })
  } catch (err) {
      myToast.execute({ status: 'error', title: 'Error', description: err.message })
  }
}

  return (
    <Layout menu={<MyMenu manager={true} itemSelected='settings' />}>
        <MyTitle>Settings</MyTitle>
        {   initialValues ?
            settingsSheetsForm(
                initialValues, 
                SignupSchema, 
                functionSubmitForm, 
                syncEtherapies, 
                syncModerators
            )
            : null
        }
      </Layout>
  )
}

const syncEtherapiesList = async (token, offerId, client_email, private_key, link, index, column_identifier, column_name) => {
    return axios.post('/api/syncEtherapiesList', {
        offerId,
        client_email,
        private_key: private_key.replace(/\\n/gm, '\n'),
        link,
        index,
        column_identifier,
        column_name,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
}

const syncModeratorsList = async (token, offerId, client_email, private_key, link, index, column_email, column_name, column_etherapies_identifiers) => {
    return axios.post('/api/syncModeratorsList', {
        offerId,
        client_email, 
        private_key: private_key.replace(/\\n/gm, '\n'),
        link,
        index,
        column_email,
        column_name,
        column_etherapies_identifiers,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
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
        etherapiesColumnIdentifier: settings?.etherapies?.column_identifier,
        etherapiesColumnName: settings?.etherapies?.column_name,
        participantsLink: settings?.participants?.sheet_link,
        participantsIndex: settings?.participants?.sheet_index,
        participantsColumnMainChoiceEtherapy: settings?.participants?.column_main_choice_etherapy,
        participantsColumnsOthersChoiceEtherapies: settings?.participants?.columns_others_choice_etherapies?.join(';'),
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
    },
    participants: {
        sheet_link: string,
        sheet_index: number,
        column_main_choice_etherapy: string;
        columns_others_choice_etherapies: string[];
    },
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

const settingsSheetsForm = (initialValues, SignupSchema, functionSubmitForm, syncEtherapies, syncModerators) => (
    <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={functionSubmitForm}
        >
        {(props) => (
            <Form>
                <Flex justifyContent='space-around' paddingBottom='3vh'>
                    <Button
                        leftIcon={<AiOutlineCloudSync />}
                        mt={4}
                        colorScheme="yellow"
                        isLoading={props.isSubmitting}
                        onClick={async () => {
                            props.setSubmitting(true);
                            const { 
                                client_email,
                                private_key,
                                etherapiesLink, 
                                etherapiesIndex, 
                                etherapiesColumnIdentifier, 
                                etherapiesColumnName 
                            } = props.values;
                            
                            await syncEtherapies(
                                client_email,
                                private_key,
                                etherapiesLink, 
                                etherapiesIndex, 
                                etherapiesColumnIdentifier, 
                                etherapiesColumnName,
                            );
                            props.setSubmitting(false);
                        }}
                        >
                        Sync etherapies
                    </Button>
                    <Button
                        leftIcon={<AiOutlineCloudSync />}
                        mt={4}
                        colorScheme="yellow"
                        isLoading={props.isSubmitting}
                        onClick={async () => {
                            props.setSubmitting(true);
                            const { 
                                client_email,
                                private_key,
                                moderatorsLink, 
                                moderatorsIndex, 
                                moderatorsColumnEmail, 
                                moderatorsColumnName, 
                                moderatorsColumnEtherapiesIdentifiers, 
                            } = props.values;
                            
                            await syncModerators(
                                client_email,
                                private_key,
                                moderatorsLink, 
                                moderatorsIndex, 
                                moderatorsColumnEmail, 
                                moderatorsColumnName,
                                moderatorsColumnEtherapiesIdentifiers,
                            );
                            props.setSubmitting(false);
                        }}
                        >
                        Sync moderators
                    </Button>
                </Flex>
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
                            <FormLabel margin={0} htmlFor="moderatorsColumnName">Column name</FormLabel>
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
                            <FormLabel margin={0} htmlFor="moderatorsColumnEtherapiesIdentifiers">Column etherapies identifiers</FormLabel>
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
                            <FormLabel margin={0} htmlFor="etherapiesLink">Link</FormLabel>
                            <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<Icon as={IoIosDocument} color="gray.400" />} />
                                <Input {...field} id="etherapiesLink" placeholder="link" />
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
                    <Field name="etherapiesColumnIdentifier">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.etherapiesColumnIdentifier && form.touched.etherapiesColumnIdentifier}>
                            <FormLabel margin={0} htmlFor="etherapiesColumnIdentifier">Column identifier</FormLabel>
                            <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<Icon as={IoIosDocument} color="gray.400" />} />
                                <Input {...field} id="etherapiesColumnIdentifier" placeholder="column identifier" />
                            </InputGroup>
                        <   FormErrorMessage>{form.errors.etherapiesColumnIdentifier}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                    <Field name="etherapiesColumnName">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.etherapiesColumnName && form.touched.etherapiesColumnName}>
                            <FormLabel margin={0} htmlFor="etherapiesColumnName">Column name</FormLabel>
                            <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<Icon as={IoIosDocument} color="gray.400" />} />
                                <Input {...field} id="etherapiesColumnName" placeholder="column name" />
                            </InputGroup>
                        <   FormErrorMessage>{form.errors.etherapiesColumnName}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionButton _expanded={{ bg: "blue.500", color: "white" }}>
                    <Box flex="1" textAlign="left">
                    <Heading size='sm'>Sheet participants</Heading>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <Field name="participantsLink">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.participantsLink && form.touched.participantsLink}>
                            <FormLabel margin={0} htmlFor="participantsLink">Link</FormLabel>
                            <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<Icon as={AiTwotoneMail} color="gray.400" />} />
                                <Input {...field} id="participantsLink" placeholder="link" />
                            </InputGroup>
                        <   FormErrorMessage>{form.errors.participantsLink}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                    <Field name="participantsIndex">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.participantsIndex && form.touched.participantsIndex}>
                            <FormLabel margin={0} htmlFor="participantsIndex">Index</FormLabel>
                            <InputGroup>
                                <NumberInput 
                                    {...field} id="participantsIndex"
                                    onChange={ (val) => form.setFieldValue(field.name, val) }
                                    min={0} max={100}
                                >
                                <NumberInputField {...field} id="participantsIndex" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                                </NumberInput>
                            </InputGroup>
                        <   FormErrorMessage>{form.errors.participantsIndex}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                    <Field name="participantsColumnMainChoiceEtherapy">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.participantsColumnMainChoiceEtherapy && form.touched.participantsColumnMainChoiceEtherapy}>
                            <FormLabel margin={0} htmlFor="participantsColumnMainChoiceEtherapy">Column main choice etherapy</FormLabel>
                            <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<Icon as={AiTwotoneMail} color="gray.400" />} />
                                <Input {...field} id="participantsColumnMainChoiceEtherapy" placeholder="column" />
                            </InputGroup>
                        <   FormErrorMessage>{form.errors.participantsColumnMainChoiceEtherapy}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                    <Field name="participantsColumnsOthersChoiceEtherapies">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.participantsColumnsOthersChoiceEtherapies && form.touched.participantsColumnsOthersChoiceEtherapies}>
                            <FormLabel margin={0} htmlFor="participantsColumnsOthersChoiceEtherapies">Columns others choice etherapies ( separate per ; )</FormLabel>
                            <InputGroup>
                            <InputLeftElement pointerEvents="none" />
                                <Textarea {...field} id="participantsColumnsOthersChoiceEtherapies" placeholder="columns" />
                            </InputGroup>
                        <   FormErrorMessage>{form.errors.participantsColumnsOthersChoiceEtherapies}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                </AccordionPanel>
            </AccordionItem>
            </Accordion>
            
            <Divider />

            <Flex justifyContent='flex-end' paddingBottom='3vh'>
                <Button
                    mt={4}
                    colorScheme="blue"
                    isLoading={props.isSubmitting}
                    type="submit"
                    >
                    Save
                </Button>
            </Flex>

            </Form>
        )}
        </Formik>
);

const syncListForm = (
    text: string, 
    syncList: Function, 
    toastSuccess?: Function,
    toastError?: Function ) => (
    <Formik
            initialValues={{}}
            onSubmit={async (values, actions) => {
                try {
                    await syncList();
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