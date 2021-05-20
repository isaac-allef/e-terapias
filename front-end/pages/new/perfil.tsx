import { Box, Divider, Grid, GridItem, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";
import { Button } from "@chakra-ui/button";
import { UnlockIcon } from "@chakra-ui/icons";
import Layout from "../../components/shared/Layout";
import MyTitle from "../../components/shared/MyTitle";
import api from "../../services/api";

export default function Perfil() {
    const router = useRouter();
	const [me, setMe] = useState(null);
	// const [token, setToken] = useState(localStorage.getItem('@etherapies:token'));
	const [token, _] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhhMDRjNGEwLTVhY2MtNDVhZi1iOTMxLWYyNTRmOTE0YmQ3YyIsImlhdCI6MTYyMTAyODg5OH0.tbSNd_Cl32z_phFMHcpMGjDcb80a32vZRtzOmS_wVUc');
	
	useEffect(() => {
		if (token) {
			getMeModerator(token).then(moderator => setMe(moderator));
		}
	}, [token]);

    return (
        <Layout>
        <MyTitle>Perfil</MyTitle>
		{ me ? details(me) : null }
        <Divider marginBottom='1rem' />
		<Button colorScheme="yellow">
			<UnlockIcon marginRight='0.5rem'/>
            Change password
        </Button>
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

const getMeModerator = async (token: string): Promise<any> => {
	const response = await api.get(`/moderators/me`, {
		headers: {
			'Authorization': `token ${token}`
		}
	});
	const moderator = response.data;

	return moderator;
}
