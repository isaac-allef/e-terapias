import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/alert";
import { Box, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../../components/shared/Layout";
import MyTitle from "../../../../components/shared/MyTitle";
import { api } from '../../../../services/api';

import dynamic from "next/dynamic";
import MyLoading from "../../../../components/shared/MyLoading";

export default function ModeratorDetail() {
    const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });
    const router = useRouter();
    const { id } = router.query;

    const [moderator, setModerator] = useState(null);
    const [infoModeratorSheet, setInfoModeratorSheet] = useState(null);
    const [infoModeratorSheetIsLoading, setInfoModeratorSheetIsLoading] = useState(true);
    
    const loadInfoModeratorSheet = async (email: string) => {
        try {
            const infoModeratorSheet = await axios.get(`/api/infoModeratorSheet?email=${email}`)
            setInfoModeratorSheet(infoModeratorSheet);
        } catch (err) {
            console.log(err.message)
        }
        setInfoModeratorSheetIsLoading(false);
    }

    useEffect(() => {
        const token = localStorage.getItem('@eterapias:token');
        if (id) {
            getModerator(token, id as string).then(async moderator => {
                setModerator(moderator);
                await loadInfoModeratorSheet(moderator.email);
            })
        }
    }, [id]);

    return (
        <Layout>
            <MyTitle>Moderator Detail</MyTitle>
            <Flex justifyContent='space-between'>
                <Box>
                    <Text fontWeight='bold'>Email: </Text>
                    <Text>{ moderator ? moderator.email : null }</Text>
                </Box>
                <Box>
                    <Text fontWeight='bold'>Eterapias: </Text>
                    {
                        moderator ? moderator.eterapias.map(eterapia => {
                            return (
                                <Text key={eterapia.id}>{ eterapia.name }</Text>
                            )
                        })
                        : null
                    }
                </Box>
            </Flex>
            <Text fontWeight='bold'>Info: </Text>
            { infoModeratorSheetIsLoading ?
                <MyLoading />
                :
                infoModeratorSheet ?
                    <DynamicReactJson src={infoModeratorSheet.data} />
                    :
                    <Alert status="error">
                        <AlertIcon />
                        <AlertTitle mr={2}>Error!</AlertTitle>
                        <AlertDescription>Load info from google sheet failed.</AlertDescription>
                    </Alert>
            }
        </Layout>
    )
}

async function getModerator(token: string, id: string) {
    const response = await api.get(`/moderators/${id}`, {
        params: {
            relations: ['eterapias'],
        },
        headers: {
          'Authorization': `token ${token}`,
        }
    });

    const moderator = response.data;
    return moderator;
}