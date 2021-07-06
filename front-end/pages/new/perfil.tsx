import { Box, Divider, Grid, GridItem, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";
import { UnlockIcon } from "@chakra-ui/icons";
import Layout from "../../components/shared/Layout";
import MyTitle from "../../components/shared/MyTitle";
import api from "../../services/api";
import MyMenu from "../../components/new/MyMenu";
import Link from "next/link";
import MyButton from "../../components/shared/MyButton";

export default function Perfil() {
    const router = useRouter();
	const [me, setMe] = useState(null);
	const [token, setToken] = useState('');
	const [offerId, setOfferId] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('@etherapies:token'));
        setOfferId(localStorage.getItem('@etherapies:offerId'));
    }, []);
	
	useEffect(() => {
		if (token && offerId) {
			getMeModerator(token, offerId).then(moderator => setMe(moderator));
		}
	}, [token, offerId]);

    return (
        <Layout menu={<MyMenu manager={false} itemSelected='perfil' />}>
        
		<MyTitle>Profile</MyTitle>
		
		{ me ? details(me) : null }
        
		<Divider marginBottom='1rem' />
		
		<Link href={'/new/changePasswordForm'}>
			<div>
			<MyButton colorScheme="yellow">
				<UnlockIcon marginRight='0.5rem'/>
				Change password
			</MyButton>
			</div>
		</Link>
        
		</Layout>
    )
}

const details = (moderator) => (
	<Box marginBottom='1rem'>
		<Grid templateColumns='2fr 1fr' marginBottom='1rem'>
			<GridItem><Text><b>Name: </b>{`${moderator.name}`}</Text></GridItem>
			<GridItem><Text><b>Email: </b>{`${moderator.email}`}</Text></GridItem>
		</Grid>
		<Text fontWeight='black'>Etherapies:</Text>
		{React.Children.toArray(moderator.etherapies.map(moderator => (
			<Grid templateColumns='2fr 1fr'>
				<GridItem><Text><b>Identifier: </b> {moderator.identifier}</Text></GridItem>
				<GridItem><Text><b>Name: </b> {moderator.name}</Text></GridItem>
			</Grid>
		)))}
	</Box>
)

const getMeModerator = async (token: string, offerId: string): Promise<any> => {
	const response = await api.get(`/moderators/me`, {
		headers: {
			'Authorization': `token ${token}`
		}
	});
	const moderator = response.data;

	const etherapiesFilteredByOffer = moderator.etherapies.filter(etherapy => etherapy.offer.id === offerId)
	moderator.etherapies = etherapiesFilteredByOffer;

	return moderator;
}
