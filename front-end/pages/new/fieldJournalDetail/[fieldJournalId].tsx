import { Box, Divider, Grid, GridItem, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/shared/Layout";
import MyTitle from "../../../components/shared/MyTitle";
import api from "../../../services/api";
import React from "react";
import { Button } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";
import MyMenu from "../../../components/new/MyMenu";

export default function FieldJournalDetail() {
    const router = useRouter();
	const id = router.query.fieldJournalId as string;

	const [me, setMe] = useState(null);
	const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('@etherapies:token'));
    }, []);
	
	useEffect(() => {
		if (token) {
			if (id) {
				getFieldJournal(token, id).then(FieldJournal => setMe(FieldJournal));
			}
		}
	}, [token, id]);

    return (
		<Layout menu={<MyMenu manager={true} />}>
        <MyTitle>FieldJournal Detail</MyTitle>
		{ me ? details(me) : null }
        <Divider marginBottom='1rem'/>
		{ me ? fields(me.fields) : null }
        <Divider marginTop='1rem' marginBottom='1rem' />
		<Button colorScheme="red">
			<DeleteIcon />
        </Button>
        </Layout>
    )
}

const details = (fieldJournal) => (
	<Box marginBottom='1rem'>
		<Text><b>Name: </b>{`${fieldJournal.name}`}</Text>
		<Grid templateColumns='2fr 1fr'>
			<GridItem><Text><b>Moderator: </b> {`${fieldJournal.moderator.name} - ${fieldJournal.moderator.email}`}</Text></GridItem>
			<GridItem><Text><b>Etherapy: </b> {`${fieldJournal.etherapy.identifier} - ${fieldJournal.etherapy.name}`}</Text></GridItem>
		</Grid>
	</Box>
)

const fields = (fields) =>  (
	<Box >
		{React.Children.toArray(fields.map(field => {
			return <>
			<Text>{field.name}</Text>
			<Box 
				borderWidth="1px" 
				rounded='md'
				paddingTop='0.5rem'
				paddingBottom='0.5rem'
				paddingLeft='1rem'
				paddingRight='1rem'
			>{field.value}</Box>
			</>
		}))}
	</Box>
)

const getFieldJournal = async (token: string, id: string): Promise<any> => {
	const response = await api.get(`/fieldJournals/${id}`, {
		headers: {
			'Authorization': `token ${token}`
		}
	});
	const fieldJournal = response.data;

	return fieldJournal;
}
