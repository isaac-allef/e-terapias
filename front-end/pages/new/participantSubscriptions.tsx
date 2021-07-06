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
  const [mainColumn, setMainColumn] = useState(null);
  const [secondaryColumns, setSecondaryColumns] = useState([]);

    useEffect(() => {
        setToken(localStorage.getItem('@etherapies:token'));
		setOfferId(localStorage.getItem('@etherapies:offerId'));
    }, []);

    useEffect(() => {
		if (token && offerId) {
			getSettings({ token, offerId })
				.then(settings => {
					getParticipants({ settings }).then(participants => {
						setParticipants(participants);
						setContent(participants.objectJson);
						setMainColumn(settings?.participants?.column_main_choice_etherapy);
						setSecondaryColumns(settings?.participants?.columns_others_choice_etherapies);
						setLoading(false);
					})
			})
			return () => cancelRequest();
		}
    }, [token, offerId]);

    return (
        <Layout menu={<MyMenu manager={true} itemSelected='subscriptions' />} >
		<Flex justifyContent='space-between'>
			<MyTitle>Participants Reports</MyTitle>
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
				columnSelected={mainColumn}
				originalContent={participants.objectJson}
				setContent={setContent}
				othersColumns={secondaryColumns}
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

const getSettings = async ({ token, offerId }): Promise<any> => {
	const response = await api.get(`/offers/${offerId}`, {
		headers: {
			'Authorization': `token ${token}`
		}
	});
	const offer = response.data;
	const { settings } = offer;

	return settings;
}

const getParticipants = async ({ settings }): Promise<any> => {

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