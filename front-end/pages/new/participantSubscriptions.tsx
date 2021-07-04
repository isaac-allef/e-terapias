import { Flex, Table, Tr, Th, Td, Text, Thead, Wrap, Tbody, Box, Select, Checkbox, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Stack, CheckboxGroup, Button, RadioGroup, Radio } from "@chakra-ui/react";
import { Children, useEffect, useState } from "react";
import Layout from "../../components/shared/Layout";
import MyTitle from "../../components/shared/MyTitle";
import api, { cancelRequest } from "../../services/api";
import { useRouter } from 'next/router';
import axios from "axios";
import MyLoading from "../../components/shared/MyLoading";
import MyButton from "../../components/shared/MyButton";
import React from 'react';
import { CSVLink } from "react-csv";
import { MdFileDownload } from "react-icons/md";
import MyMenu from "../../components/new/MyMenu";

const convertColumnsNamesToCSV = (columnsNames) => {
	return columnsNames.map(columnName => {
		return {
			label: columnName,
			key: columnName,
		}
	})
}

const Filter = ({ columnSelected, originalContent, setContent, othersColumns }) => {
  	const [optionChoiced, setOptionChoiced] = useState('&@%#$!');
  	const [options, setOptions] = useState([]);
	const [quantTotalSubscriptions, setQuantTotalSubscriptions] = useState(null);
	const [quantFilteredSubscriptions, setQuantFielteredSubscriptions] = useState(null);
  	const [columnsChecked, setColumnsChecked] = useState([]);

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
		<Text>Select the secundaries etherapies you want to filter:</Text>

		<Box maxHeight='20vh' overflowY='scroll' overflowX='hidden' marginTop={4} marginBottom={4}>
		<CheckboxGroup>
			<Wrap>{
			Children.toArray(
			othersColumns.map(option => {
				return <Checkbox 
							isDisabled={optionChoiced === '&@%#$!'}
							colorScheme="blue"
							value={option} 
							onChange={(e) => {
								if (!columnsChecked.includes(e.target.value)) {
									setColumnsChecked([...columnsChecked, e.target.value])
								} else {
									setColumnsChecked(columnsChecked.filter(v => v !== e.target.value))
								}
							}} 
						>
						{option}
					</Checkbox>
			})
			)
			}</Wrap>
		</CheckboxGroup>
		</Box>
		<Flex justifyContent='space-between' marginBottom={4}>
			<MyButton onClick={() => {
				const contentFiltered = originalContent
											.filter(
												line => {
													if (line[columnSelected] !== optionChoiced) {
														return false;
													}

													if (JSON.stringify(columnsChecked) !== '[]') {
														let ok = false;
														for (let i=0; i<columnsChecked.length; i++) {
															if (line[columnsChecked[i]] !== '') {
																ok = true;
																break;
															}
														}
														if (!ok) {
															return false;
														}
													}

													return true;
												}
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
        <Layout menu={<MyMenu manager={true} itemSelected='subscriptions' />} >
		<Flex justifyContent='space-between'>
			<MyTitle>Subscriptions</MyTitle>
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
				othersColumns={[
					'e-terapia 01 - horário disponível:',
					'e-terapia 02 - horários disponíveis:',
					'e-terapia 03 - horário disponível',
					'e-terapia 05 - horário disponível:',
					'e-terapia 04 - horários disponíveis',
					'e-terapia 06 - horários disponíveis:',
					'e-terapia 07 - horário disponível',
					'e-terapia 08 - horários disponíveis:',
					'e-terapia 09 - Inscrições encerradas temporariamente.',
					'e-terapia 10 - horários disponíveis:',
					'e-terapia 11 - horário disponível:',
					'e-terapia 12 - Inscrições encerradas temporariamente. ',
					'e-terapia 13 - horário disponível:',
					'e-terapia 14 - horário disponível:',
					'e-terapia 15 - horário disponível:',
				]}
			/>
			</AccordionPanel>
			</AccordionItem>
			</Accordion>
			
			<Flex justifyContent='flex-end' >
			<CSVLink 
				headers={convertColumnsNamesToCSV(participants.columnsNames)}
				data={content}
				filename='testing.csv'
			>
				<MyButton colorScheme="green" variant='ghost' leftIcon={<MdFileDownload />} >
					Export to CSV
				</MyButton>
			</CSVLink>
			</Flex>

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