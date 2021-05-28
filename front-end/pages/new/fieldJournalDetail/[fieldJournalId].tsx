import { Box, Grid, GridItem, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/shared/Layout";
import MyTitle from "../../../components/shared/MyTitle";
import api from "../../../services/api";
import React from "react";
import MyMenu from "../../../components/new/MyMenu";
import Link from "next/link";
import MyDivider from "../../../components/shared/MyDivider";
import MyButton from "../../../components/shared/MyButton";

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
        
		<MyDivider />
		
		{ me ? fields(me.fields) : null }
        
		<MyDivider />
		
		<MyButton type='delete' />
        
		</Layout>
    )
}

const details = (fieldJournal) => (
	<Box marginBottom='1rem'>
		<Text><b>Name: </b>{`${fieldJournal.name}`}</Text>
		<Grid templateColumns='2fr 1fr'>
			<GridItem>
				<Text><b>Moderator: </b> 
				<Link href={`/new/moderatorDetail/${fieldJournal.moderator.id}`}>
					{`${fieldJournal.moderator.name} - ${fieldJournal.moderator.email}`}
				</Link>
				</Text>
			</GridItem>
			<GridItem>
				<Text><b>Etherapy: </b> 
				<Link href={`/new/etherapyDetail/${fieldJournal.etherapy.id}`}>
					{`${fieldJournal.etherapy.identifier} - ${fieldJournal.etherapy.name}`}
				</Link>
				</Text>
			</GridItem>
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
