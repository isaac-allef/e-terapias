import { Flex, Heading, LinkBox, LinkOverlay, Table, Tr, Th, Td, Text, Thead, Wrap, Tbody, Box, Select, Checkbox, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Stack, CheckboxGroup, Button } from "@chakra-ui/react";
import { Children, useEffect, useState } from "react";
import Layout from "../../components/shared/Layout";
import MyTitle from "../../components/shared/MyTitle";
import api, { cancelRequest } from "../../services/api";
import { useRouter } from 'next/router';
import axios from "axios";
import MyLoading from "../../components/shared/MyLoading";
import MyButton from "../../components/shared/MyButton";

const Filter = ({ arrayOptionsSelect, structFilter, setFilterBy }) => {
	const [columnSeleted, setColumnSeleted] = useState(null);
  	const [optionsChecked, setOptionsChecked] = useState([]);

	return (
		<>
		<Select placeholder="Select option" onChange={(a) => {
			setColumnSeleted(a.target.value);
			setOptionsChecked([]);
		}}>
			{Children.toArray(
				arrayOptionsSelect.map(column => <option>{column}</option>)
			)}
		</Select>
		<Box maxHeight='20vh' overflowY='scroll' marginTop={4} marginBottom={4}>
			{/* {console.log(optionsChecked)} */}
			<Stack>
			{
				columnSeleted ? 
				<CheckboxGroup>
					{
					Children.toArray(
					structFilter[columnSeleted].map(option => {
						return <Checkbox 
									colorScheme="blue"
									value={option} 
									onChange={(e) => {
										if (!optionsChecked.includes(e.target.value)) {
											setOptionsChecked([...optionsChecked, e.target.value])
										} else {
											setOptionsChecked(optionsChecked.filter(v => v !== e.target.value))
										}
									}} 
								>
								{option}
							</Checkbox>
					})
					)
				}
				</CheckboxGroup>
				: null
			}
			</Stack>
		</Box>
		<MyButton onClick={() => setFilterBy({
			columnSelected: columnSeleted,
			optionsChecked: optionsChecked,
		})}>Filter</MyButton>
		</>
				
	)
}

export default function ParticipantList() {
  const router = useRouter();
  const [participants, setParticipants] = useState(null);
  const [token, setToken] = useState('');
  const [offerId, setOfferId] = useState('');
  const [structFilter, setStructFilter] = useState({});
  const [filterBy, setFilterBy] = useState({
	  columnSelected: null,
	  optionsChecked: [],
  });

    useEffect(() => {
        setToken(localStorage.getItem('@etherapies:token'));
		setOfferId(localStorage.getItem('@etherapies:offerId'));
    }, []);

    useEffect(() => {
		if (token) {
			getParticipants({ 
				token, 
				offerId,
			}).then(participants => {
				setParticipants(participants);
			})
			return () => cancelRequest();
		}
    }, [token]);

    return (
        <Layout menu={null} >
		{console.log(filterBy)}
		<Flex justifyContent='space-between'>
			<MyTitle>Participants</MyTitle>
		</Flex>

		{
			participants ?
			<>
			<Accordion allowToggle marginBottom={4}>
			<AccordionItem>
				<AccordionButton>
					<Box flex="1" textAlign="left">
					Filter
					</Box>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel pb={4}>
					<Filter 
						arrayOptionsSelect={participants.columnsNames}
						structFilter={structFilter}
						setFilterBy={setFilterBy}
					/>
				</AccordionPanel>
			</AccordionItem>
			</Accordion>
			
			<Box overflow='scroll' height='75vh'>
			<Table variant='striped' boxSize='max-content'>
				<Thead background='blue.500'>
					<Tr>
						{Children.toArray(
							participants.columnsNames.map(column => {
								structFilter[column] = [];
								return <Th color='white'>{column}</Th>
							})
						)}
					</Tr>
				</Thead>
				<Tbody>
					{participants.objectJson.map(line => {
						return Children.toArray(
							<Tr>{
								Children.toArray(
									participants.columnsNames.map(column => {
										const response = line[column];
										if (!structFilter[column].includes(response)) {
											structFilter[column].push(response);
										}
										return <Td>{line[column]}</Td>
									})
								)
							}</Tr>
						)
					})}
				</Tbody>
			</Table>
			</Box>
			</>
			: <MyLoading />
		}

        </Layout>
    )
}

const getParticipants = async ({ token, offerId }): Promise<any> => {
	const response = await api.get(`/offers/${offerId}`, {
		headers: {
			'Authorization': `token ${token}`
		}
	});
	const offer = response.data;
	const { settings } = offer;

    const response2 = await axios.get('/api/readSheet', {
		params: {
			client_email: settings.serviceAccount.client_email,
			private_key: settings.serviceAccount.private_key.replace(/\\n/gm, '\n'),
            docId: settings.participants.sheet_link,
            docIndex: settings.participants.sheet_index,
        }
	});
	
	const participants = response2.data;
	
	if (!participants) {
		return [];
	}

	return participants;
}