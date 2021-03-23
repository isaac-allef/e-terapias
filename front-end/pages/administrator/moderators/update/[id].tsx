import { Field, Form, Formik } from "formik";
import MyTitle from "../../../../components/shared/MyTitle";
import * as Yup from 'yup';
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Divider } from "@chakra-ui/layout";
import Layout from "../../../../components/shared/Layout";
import api from '../../../../services/api';
import { useRouter } from "next/router";
import MyToast from "../../../../components/shared/MyToast";
import { useEffect, useState } from "react";
import MenuAddEterapias from "../../../../components/fieldJournalTemplateForm/MenuAddEterapias";

interface Moderator {
    email: string;
    password: string;
}

interface ModeratorIdEterapiaId {
    moderatorId: string;
    eterapiaId: string;
}

export default function ModeratorForm() {
    const myToast = new MyToast();
    const router = useRouter();
    const { id } = router.query;

    const [moderator, setModerator] = useState(null);
    const [eterapias, setEterapias] = useState([]);
    const [myEterapias, setMyEterapias] = useState([]);

    const removeFromEterapiasElementsThatExistsInMyEterapias = (myEterapias) => {
        const newEterapias = eterapias.filter(eterapia => {
            const exists = myEterapias.find((myEterapia) => myEterapia.id === eterapia.id);
            if (exists) {
                return false;
            }
            return true;
        });

        setEterapias(newEterapias);
    }

    const dropEterapias = () => {
        moderator.eterapias.forEach(eterapia => {
            const exists = myEterapias.find(myEterapia => myEterapia.id === eterapia.id);
            if (!exists) {
                const moderatorIdEterapiaIdJson: ModeratorIdEterapiaId = {
                    moderatorId: moderator.id,
                    eterapiaId: eterapia.id,
                }
                const token = localStorage.getItem('@eterapias:token');
                addOrDropEterapia(
                    token,
                    moderatorIdEterapiaIdJson,
                    'drop',
                )
            }
        })
    }

    const addEterapias = () => {
        myEterapias.forEach(myEterapia => {
            const exists = moderator.eterapias.find(eterapia => eterapia.id === myEterapia.id)
            if (!exists) {
                const moderatorIdEterapiaIdJson: ModeratorIdEterapiaId = {
                    moderatorId: moderator.id,
                    eterapiaId: myEterapia.id,
                }
                const token = localStorage.getItem('@eterapias:token');
                addOrDropEterapia(
                    token,
                    moderatorIdEterapiaIdJson,
                    'add',
                )
            }
        })
    }

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email(),
        password: Yup.string(),
    });
    
    const initialValues = {
        email: '',
        password: '',
    }
    
    const functionSubmitForm = async (values, actions) => {
        const { email, password } = values;

        const token = localStorage.getItem('@eterapias:token');

        try {
            const moderator = await saveModerator(token, { email, password }, id as string);
            dropEterapias();
            addEterapias();
            myToast.execute({ status: 'success', title: 'Moderator saved.' });

            actions.setSubmitting(false);

            router.push('/administrator/moderators/list');
        } catch(err) {
            myToast.execute({ status: 'error', title: 'Error', description: err.message });
            actions.setSubmitting(false);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('@eterapias:token');
        getEterapias(token).then(eterapias => {
            setEterapias(eterapias);
        })
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('@eterapias:token');
        if (id) {
            getModerator(token, id as string).then(moderator => {
                setModerator(moderator);
                setMyEterapias(moderator.eterapias);
                removeFromEterapiasElementsThatExistsInMyEterapias(moderator.eterapias);
            })
        }
    }, [id]);

    return (
      <Layout>
        <MyTitle>{'Update Moderator'}</MyTitle>
        <MenuAddEterapias
            eterapias={eterapias}
            setEterapias={setEterapias}
            eterapiasToAdd={myEterapias}
            setEterapiasToAdd={setMyEterapias}
        />
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
                            <Input isDisabled {...field} id="password" placeholder="password" />
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
                Save
            </Button>
        </Form>
        )}
        </Formik>
      </Layout>
  )
}

async function saveModerator(token: string, moderatorJson: Moderator, id: string) {
    delete moderatorJson.password;

    if (moderatorJson.email === '') {
        delete moderatorJson.email;
    }

    const response = await api.put(`/moderators/${id}`, moderatorJson, {
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });

    const moderator = response.data;
    return moderator;
}

async function getModerator(token: string, id: string) {
    const response = await api.get(`/moderators/${id}`, {
        params: {
            relations: ['eterapias'],
        },
        headers: {
          'Authorization': `token ${token}`,
        }
    });

    const moderator = response.data;
    return moderator;
}

const getEterapias = async (token: string): Promise<any[]> => {
    const response = await api.get('/eterapias', {
        params: {
            relations: ['fieldJournalTemplate'],
            limit: 100,
          },
        headers: {
          'Authorization': `token ${token}`
        }
    });

    const eterapias = response.data;
    return eterapias;
}

async function addOrDropEterapia(
        token: string, 
        moderatorIdEterapiaIdJson: ModeratorIdEterapiaId,
        addOrDrop: 'add' | 'drop',
    ) {
    const response = await api.patch(`/moderators/${addOrDrop}Eterapia`, moderatorIdEterapiaIdJson, {
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });
}