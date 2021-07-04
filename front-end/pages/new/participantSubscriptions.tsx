import { Flex, Heading, LinkBox, LinkOverlay, Table, Tr, Th, Td, Text, Thead, Wrap, Tbody, Box, Select, Checkbox, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Stack, CheckboxGroup, Button, RadioGroup, Radio } from "@chakra-ui/react";
import { Children, useEffect, useState } from "react";
import Layout from "../../components/shared/Layout";
import MyTitle from "../../components/shared/MyTitle";
import api, { cancelRequest } from "../../services/api";
import { useRouter } from 'next/router';
import axios from "axios";
import MyLoading from "../../components/shared/MyLoading";
import MyButton from "../../components/shared/MyButton";

const Filter = ({ columnSelected, originalContent, setContent }) => {
  	const [optionChoiced, setOptionChoiced] = useState('&@%#$!');
  	const [options, setOptions] = useState([]);
	const [quantTotalSubscriptions, setQuantTotalSubscriptions] = useState(null);
	const [quantFilteredSubscriptions, setQuantFielteredSubscriptions] = useState(null);

	  useEffect(() => {
		const responsesWithoutRepetions = [];
		let count = 0;
		originalContent.forEach(line => {
			count += 1;
			const response = line[columnSelected];
			if (!responsesWithoutRepetions.includes(response)) {
				responsesWithoutRepetions.push(response);
			}
		})

		setOptions(responsesWithoutRepetions);
		setQuantTotalSubscriptions(count);
	  }, []);

	const CleanButtom = ({ setValue }) => (
        <Button variant='ghost' textColor='gray.600' onClick={() => {
			setContent(originalContent)
            setValue('&@%#$!')
			setQuantFielteredSubscriptions(null)
        }}>Clean</Button>
    )

	return (
		<>
		<Text>Select the etherapy you want to filter:</Text>

		<Box maxHeight='20vh' overflowY='scroll' marginTop={4} marginBottom={4}>
			<RadioGroup
				colorScheme="blue"
				value={optionChoiced} 
				onChange={(selected) => {
					setOptionChoiced(selected as string)
				}}
			>
				<Stack>
				{
				Children.toArray(
					options.map(option => {
						return <Radio value={option} >
								{option}
							</Radio>
					})
				)
				}
				</Stack>
			</RadioGroup>
		</Box>
		<Flex justifyContent='space-between' marginBottom={4}>
			<MyButton onClick={() => {
				const contentFiltered = originalContent
											.filter(
												line => line[columnSelected] === optionChoiced
											)
				setContent(contentFiltered);
				setQuantFielteredSubscriptions(contentFiltered.length)
			}}
			>Filter</MyButton>
			<CleanButtom setValue={setOptionChoiced} />
		</Flex>
		<Text>{`Total: ${quantTotalSubscriptions}`}</Text>
		{
			quantFilteredSubscriptions ?
			<Text>{`Filtered: ${quantFilteredSubscriptions}`}</Text>
			: null
		}
		</>
				
	)
}

export default function ParticipantList() {
  const router = useRouter();
  const [participants, setParticipants] = useState(null);
  const [token, setToken] = useState('');
  const [offerId, setOfferId] = useState('');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

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
				setContent(participants.objectJson);
				setLoading(false);
			})
			return () => cancelRequest();
		}
    }, [token]);

    return (
        <Layout menu={null} >
		<Flex justifyContent='space-between'>
			<MyTitle>Participants</MyTitle>
		</Flex>

		{
			loading ? <MyLoading /> :
			<>
			<Accordion allowToggle defaultIndex={[0]} marginBottom={4}>
			<AccordionItem>
				<AccordionButton>
					<Box flex="1" textAlign="left">
					Options and informations
					</Box>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel pb={4}>
			<Filter 
				columnSelected='Caso tenha se interessado por mais de uma e-terapia, indique a sua primeira opção?'
				originalContent={participants.objectJson}
				setContent={setContent}
			/>
			</AccordionPanel>
			</AccordionItem>
			</Accordion>
			
			<Box overflow='scroll' height='75vh'>
			<Table variant='striped' boxSize='max-content'>
				<Thead background='blue.500'>
					<Tr>
						{Children.toArray(
							participants
							.columnsNames
							.map(column => <Th color='white'>{column}</Th>
						)
						)}
					</Tr>
				</Thead>
				<Tbody>
					{content.map(line => {
						return Children.toArray(
							<Tr>{
								Children.toArray(
									participants
									.columnsNames
									.map(column => <Td>{line[column]}</Td>)
								)
							}</Tr>
						)
					})}
				</Tbody>
			</Table>
			</Box>
			</>
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