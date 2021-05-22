import { Divider, Flex, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MyToast from "../../components/shared/MyToast";
import Layout from "../../components/shared/Layout";
import MyTitle from "../../components/shared/MyTitle";
import MenuSelectEtherapy from "../../components/new/fieldJournalForm/MenuSelectEtherapy";
import Question from "../../components/new/fieldJournalForm/Question";
import MyDivider from "../../components/shared/MyDivider";
import { Button } from "@chakra-ui/button";
import api from "../../services/api";
import { Input } from "@chakra-ui/input";

interface field {
    name: string;
    type: string;
    value: string;
}

interface templateField {
    name: string;
    type: 'short' | 'long';
}

interface fieldJournal {
    name: string;
    fields: field[];
    etherapyId: string;
}

export default function FieldJournalForm() {
    const myToast = new MyToast();
    const router = useRouter();
    const [name, setName] = useState('');
    const [fields, setFields] = useState([]);
    const [templateFields, setTemplateFields] = useState([]);
    const [etherapies, setEtherapies] = useState([]);
    const [etherapySelected, setEtherapySelected] = useState(null);
    // const [token, setToken] = useState(localStorage.getItem('@etherapies:token'));
    const [token, _] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhhMDRjNGEwLTVhY2MtNDVhZi1iOTMxLWYyNTRmOTE0YmQ3YyIsImlhdCI6MTYyMTAyODg5OH0.tbSNd_Cl32z_phFMHcpMGjDcb80a32vZRtzOmS_wVUc');

    function cleanUp() {
        setFields([]);
        setName('');
        setEtherapySelected(null);
    }

    useEffect(() => {
        getMyInformations(token).then(me => {
            setEtherapies(me.etherapies);
        })
    }, []);

    const createFieldsBasedInTemplateFields = (templateFields: templateField[]): field[] => {
        const fields: field[] = templateFields?.map(templateField => ({
            name: templateField.name,
            type: templateField.type,
            value: '',
        }));

        return fields;
    }

    useEffect(() => {
        const templateFieldsExists = etherapySelected?.template.templateFields;
        setTemplateFields(templateFieldsExists);
        const newFields = createFieldsBasedInTemplateFields(templateFieldsExists);
        setFields(newFields);
    }, [etherapySelected]);

    function handleChange(newValue, index) {
        fields[index].value = newValue;
        setFields(fields);
    }

    return (
      <Layout>
        <MyTitle>{'Create Field Journal'}</MyTitle>
        
        <Text fontSize='small' marginBottom='-1px'>Eterapia</Text>
        <MenuSelectEtherapy
            etherapies={etherapies}
            setEtherapySelected={setEtherapySelected}
        />

        <form onSubmit={async (event) => {
            event.preventDefault();
            try {
                const fieldJournalJson: fieldJournal = {
                    name,
                    fields,
                    etherapyId: etherapySelected.id,
                }

                await postFieldJournals(token, fieldJournalJson);

                myToast.execute({ status: 'success', title: 'Field Journal created.' });
                cleanUp();
                router.push('/');
            } catch (err) {
                myToast.execute({ status: 'error', title: 'Error', description: err.message });
            }
        }}>
            <Text>Name</Text>
            <Input 
                value={name}
                onChange={value => setName(value.target.value)}
            />
            { templateFields?.map((templateField, index) => {
                return <Question 
                    key={Math.random()}
                    label={templateField.name}
                    type={templateField.type}
                    index={index}
                    handleChange={handleChange}
                />
            }) }

            <MyDivider />

            <Flex justifyContent='flex-end'>
                <Button
                    mt={4}
                    colorScheme="teal"
                    type="submit"
                    >
                    Save
                </Button>
            </Flex>
        </form>

        <Divider />
      </Layout>
  )
}

const getMyInformations = async (token: string): Promise<any> => {
    const response = await api.get('/moderators/me', {
        headers: {
          'Authorization': `token ${token}`
        }
    });

    const myInformations = response.data;
    return myInformations;
}

const postFieldJournals = async (token: string, fieldJournalJson: fieldJournal): Promise<any> => {
    const response = await api.post('/fieldJournals', fieldJournalJson, {
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });

    const fieldJournal = response.data;
    return fieldJournal;
}