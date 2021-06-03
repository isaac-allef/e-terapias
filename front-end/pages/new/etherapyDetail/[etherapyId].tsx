import { Box, Grid, GridItem, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MyTable from "../../../components/new/MyTable";
import Layout from "../../../components/shared/Layout";
import MyTitle from "../../../components/shared/MyTitle";
import api from "../../../services/api";
import React from "react";
import MyMenu from "../../../components/new/MyMenu";
import Link from "next/link";
import MyDivider from "../../../components/shared/MyDivider";
import MyButton from "../../../components/shared/MyButton";

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
	const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('@etherapies:token'));
    }, []);
	
	const timestampFormat = (timestamp: string): string => {
		return new Date(timestamp).toUTCString();
	}

    const parseFieldJournalsToMatrix = (fieldJournals: any): Line[] => {
		return fieldJournals.map((fieldJournal: any) => {
		  return {
			link: `/new/fieldJournalDetail/${fieldJournal.id}`,
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
		if (token) {
			if (id) {
				getEtherapy(token, id).then(etherapy => setMe(etherapy));
			}
		}
	}, [token, id]);

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
		<Layout menu={<MyMenu manager={true} />}>
        <MyTitle>Etherapy Detail</MyTitle>
		{ me ? details(me) : null }
		<Text fontWeight='black'>Field journals: </Text>
        <MyTable
            heads={heads}
            matrix={matrix}
			page={page}
			setPage={setPage}
		/>
        <MyDivider />
		<MyButton styleType='delete' />
        </Layout>
    )
}

const details = (etherapy) => (
	<Box marginBottom='1rem'>
		<Grid templateColumns='2fr 1fr' marginBottom='1rem'>
			<GridItem><Text><b>Identifier: </b>{`${etherapy.identifier}`}</Text></GridItem>
			<GridItem><Text><b>Name: </b>{`${etherapy.name}`}</Text></GridItem>
		</Grid>
		<Text fontWeight='black'>Moderadors:</Text>
		{React.Children.toArray(etherapy.moderators.map(moderator => (
			<Grid templateColumns='2fr 1fr'>
				<GridItem>
					<Text><b>Name: </b> 
						<Link href={`/new/moderatorDetail/${moderator.id}`}>
							{moderator.name}
						</Link>
					</Text>
				</GridItem>
				<GridItem><Text><b>Email: </b> {moderator.email}</Text></GridItem>
			</Grid>
		)))}
	</Box>
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