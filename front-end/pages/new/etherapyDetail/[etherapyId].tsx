import { Divider, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MyTable from "../../../components/new/MyTable";
import Layout from "../../../components/shared/Layout";
import MyTitle from "../../../components/shared/MyTitle";
import api from "../../../services/api";
import React from "react";
import { Button } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";

interface Line {
  link: string;
  content: string[][];
}

export default function EtherapyDetail() {
    const router = useRouter();
	const id = router.query.etherapyId as string;

	const [me, setMe] = useState(null);
	const [matrix, setMatrix] = useState<Line[]>([]);
	const [page , setPage] = useState(1);
	const per_page = 5;
	const [sort , setSort] = useState('updated_at');
	const [direction , setDirection] = useState('asc');
	// const [token, setToken] = useState(localStorage.getItem('@etherapies:token'));
	const [token, _] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmZTJmYmQyLTRmNTYtNGY0ZS04NzcwLTJjMzc0MTI3MTU2YiIsImlhdCI6MTYyMTAyODk0N30.3HzZioMqIsu1pR_Fb8c9whLOUeho7bh_eZRXN-RtuCI');
	
	const timestampFormat = (timestamp: string): string => {
		return new Date(timestamp).toUTCString();
	}

    const parseFieldJournalsToMatrix = (fieldJournals: any): Line[] => {
		return fieldJournals.map((fieldJournal: any) => {
		  return {
			link: '/',
			content: [
			  [fieldJournal.name],
			  [fieldJournal.moderator.name],
			  [timestampFormat(fieldJournal.created_at)],
			  [timestampFormat(fieldJournal.updated_at)],
			]
		  }
		})
	  }
	
	useEffect(() => {
		if (id) {
			getEtherapy(token, id).then(etherapy => setMe(etherapy));
		}
	}, [id]);

    useEffect(() => {
		if (me) {
			  getFieldJournals({ 
				token, 
				etherapyId: me.id,
				page, 
				per_page, 
				sort: sort as 'name' | 'created_at' | 'updated_at', 
				direction: direction as 'asc' | 'desc',
			}).then(fieldJournals => {
				return parseFieldJournalsToMatrix(fieldJournals);
			  }).then(matrix => setMatrix(matrix))
		}
    }, [me, page, direction, sort]);

	const sortAndDirection = (sortBy: string) => {
		setSort(sortBy)
		setDirection('asc')
		if (direction === 'asc') {
			setDirection('desc')
		}
	}

	const heads = [
		{ name: 'Name', action: () => sortAndDirection('name') }, 
		{ name: 'Moderator' }, 
		{ name: 'Created_at', action: () => sortAndDirection('created_at') }, 
		{ name: 'Updated_at', action: () => sortAndDirection('updated_at') }
	];

    return (
        <Layout>
        <MyTitle>Etherapy Detail</MyTitle>
		{ me ? details(me) : null }
		<Text>Field journals: </Text>
        <MyTable
            heads={heads}
            matrix={matrix}
			page={page}
			setPage={setPage}
		/>
        <Divider />
		<Button colorScheme="red">
			<DeleteIcon />
        </Button>
        </Layout>
    )
}

const details = (etherapy) => (
	<>
		<Text><>Identifier: </>{`${etherapy.identifier}`}</Text>
		<Text><>Name: </>{`${etherapy.name}`}</Text>
		<Text>Moderadors:</Text>
		{React.Children.toArray(etherapy.moderators.map(moderator => (
			<>
			<Text><>Name:</> {moderator.name}</Text>
			<Text><>Email:</> {moderator.email}</Text>
			</>
		)))}
	</>
)

const getEtherapy = async (token: string, id: string): Promise<any> => {
	const response = await api.get(`/etherapies/${id}`, {
		headers: {
			'Authorization': `token ${token}`
		}
	});
	const etherapy = response.data;

	return etherapy;
}


type loadParams ={
	token: string;
	etherapyId: string;
	page: number;
	per_page: number;
	sort?: 'name' | 'created_at' | 'updated_at';
    direction?: 'asc' | 'desc';
}

const getFieldJournals = async ({ token, etherapyId, page, per_page, sort, direction }: loadParams): Promise<any[]> => {
	const response = await api.get(`/etherapies/${etherapyId}/fieldJournals`, {
		params: {
			page,
			per_page,
			sort,
			direction,
		},
		headers: {
			'Authorization': `token ${token}`
		}
	});
	const fieldJournals = response.data;
	
	if (!fieldJournals) {
		return [];
	}

	return fieldJournals;
}