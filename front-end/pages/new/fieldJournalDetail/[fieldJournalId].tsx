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
import { Checkbox, CheckboxGroup, Input, Radio, RadioGroup, Textarea } from "@chakra-ui/react";

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
		
		<MyButton styleType='delete' deleteFunction={() => {
			deleteFieldJournal(token, me.id)
			router.push('/new/fieldJournalList');
		}} />
        
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
			{showField(field)}
			</>
		}))}
	</Box>
)

const showField = (field) => {
	if (['short', 'long', 'date', 'linear', 'choice', 'check'].includes(field.type)) {

		if (field.type === 'short' || field.type === 'date') {
			return <Input isDisabled value={field.value}/>
		}
	
		if (field.type === 'long') {
			return <Textarea isDisabled value={field.value}/>
		}

		if (field.type === 'linear') {
			const arrayOptions = Array.from(
				{ length: parseInt(field.options[1]) }, 
				(_, i) => (i + parseInt(field.options[0]) + '')
			)
			return <>
				<RadioGroup value={field.value}>
				{
					React.Children.toArray(arrayOptions.map(option => {
						return <Radio isDisabled value={option}>{ option }</Radio>
					}))
				}
				</RadioGroup>
			</>
		}

		if (field.type === 'choice') {
			return <>
				<RadioGroup value={field.value}>
				{
					React.Children.toArray(field.options.map(option => {
						return <Radio isDisabled value={option}>{ option }</Radio>
					}))
				}
				</RadioGroup>
			</>
		}

		if (field.type === 'check') {
			return <>
				<CheckboxGroup value={field.value}>
				{
					React.Children.toArray(field.options.map(option => {
						return <Checkbox isDisabled value={option}>{ option }</Checkbox>
					}))
				}
				</CheckboxGroup>
			</>
		}
	}
	else {
		return <Box 
			borderWidth="1px" 
			rounded='md'
			paddingTop='0.5rem'
			paddingBottom='0.5rem'
			paddingLeft='1rem'
			paddingRight='1rem'
		>{field.value}</Box>
	}
}

const getFieldJournal = async (token: string, id: string): Promise<any> => {
	const response = await api.get(`/fieldJournals/${id}`, {
		headers: {
			'Authorization': `token ${token}`
		}
	});
	const fieldJournal = response.data;

	return fieldJournal;
}


const deleteFieldJournal = async (token: string, id: string): Promise<any> => {
    const response = await api.delete(`/fieldJournals/${id}`, {
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        }
    });

    return response.data;
}