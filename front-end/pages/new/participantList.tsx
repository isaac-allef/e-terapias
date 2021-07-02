import { Flex, Heading, LinkBox, LinkOverlay, Table, Tr, Th, Td, Text, Thead, Wrap, Tbody, Box } from "@chakra-ui/react";
import { Children, useEffect, useState } from "react";
import Layout from "../../components/shared/Layout";
import MyTitle from "../../components/shared/MyTitle";
import { cancelRequest } from "../../services/api";
import { useRouter } from 'next/router';
import axios from "axios";
import MyLoading from "../../components/shared/MyLoading";

export default function ParticipantList() {
  const router = useRouter();
  const [participants, setParticipants] = useState(null);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        setToken(localStorage.getItem('@etherapies:token'));
    }, []);

    useEffect(() => {
		if (token) {
			setLoading(true);
			getParticipants({ 
				token, 
                docId: '1LtRsnsCGTk9Gl0QS-Wm4FVnoNRvdOHg4KPYlydV-KS0',
                docIndex: 2,
			}).then(participants => {
				setParticipants(participants);
			})
			setLoading(false);
			return () => cancelRequest();
		}
    }, [token]);

    return (
        <Layout menu={null} >
		
		<Flex justifyContent='space-between'>
			<MyTitle>Participants</MyTitle>
		</Flex>

		{
			participants ?
			<Box overflow='scroll' height='75vh'>
			<Table variant='striped' boxSize='max-content'>
				<Thead background='blue.500'>
					<Tr>
						{Children.toArray(
							participants.columnsNames.map(column => <Th color='white'>{column}</Th>)
						)}
					</Tr>
				</Thead>
				<Tbody>
					{participants.objectJson.map(line => {
						return Children.toArray(
							<Tr>{
								Children.toArray(
									participants.columnsNames.map(column => <Td>{line[column]}</Td>)
								)
							}</Tr>
						)
					})}
				</Tbody>
			</Table>
			</Box>
			: <MyLoading />
		}

        </Layout>
    )
}

const getParticipants = async ({ token, docId, docIndex }): Promise<any> => {
	// const response = await api.get(`/offers/${offerId}`, {
	// 	headers: {
	// 		'Authorization': `token ${token}`
	// 	}
	// });
	// const offer = response.data;

    const response = await axios.get('/api/readSheet', {
		params: {
            docId,
            docIndex,
        }
	});
	
	const participants = response.data;
	
	if (!participants) {
		return [];
	}

	return participants;
}