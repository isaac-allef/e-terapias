import { Flex, Heading, LinkBox, LinkOverlay, Table, Tr, Th, Td, Text, Thead, Wrap, Tbody, Box } from "@chakra-ui/react";
import { Children, useEffect, useState } from "react";
import Layout from "../../components/shared/Layout";
import MyTitle from "../../components/shared/MyTitle";
import api, { cancelRequest } from "../../services/api";
import { useRouter } from 'next/router';
import axios from "axios";
import MyLoading from "../../components/shared/MyLoading";

export default function ParticipantList() {
  const router = useRouter();
  const [participants, setParticipants] = useState(null);
  const [token, setToken] = useState('');
  const [offerId, setOfferId] = useState('');
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        setToken(localStorage.getItem('@etherapies:token'));
		setOfferId(localStorage.getItem('@etherapies:offerId'));
    }, []);

    useEffect(() => {
		if (token) {
			setLoading(true);
			getParticipants({ 
				token, 
				offerId,
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

const getParticipants = async ({ token, offerId, docId, docIndex }): Promise<any> => {
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
            docId,
            docIndex,
        }
	});
	
	const participants = response2.data;
	
	if (!participants) {
		return [];
	}

	return participants;
}