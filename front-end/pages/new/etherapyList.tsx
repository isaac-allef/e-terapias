import { Divider } from "@chakra-ui/layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import MySearchInput from "../../components/new/MySearchInput";
import MyTable from "../../components/new/MyTable";
import Layout from "../../components/shared/Layout";
import MyButton from "../../components/shared/MyButton";
import MyTitle from "../../components/shared/MyTitle";
import api, { cancelRequest } from "../../services/api";

interface Line {
  link: string;
  content: string[][];
}

export default function EtherapyList() {

  const [matrix, setMatrix] = useState<Line[]>([]);
  const [page , setPage] = useState(1);
  const per_page = 5;
  const [sort , setSort] = useState('updated_at');
  const [direction , setDirection] = useState('asc');
  const [search, setSearch] = useState('');
  // const [token, setToken] = useState(localStorage.getItem('@etherapies:token'));
  const [token, _] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmZTJmYmQyLTRmNTYtNGY0ZS04NzcwLTJjMzc0MTI3MTU2YiIsImlhdCI6MTYyMTAyODk0N30.3HzZioMqIsu1pR_Fb8c9whLOUeho7bh_eZRXN-RtuCI');
	
	const timestampFormat = (timestamp: string): string => {
		return new Date(timestamp).toUTCString();
	}

    const parseEtherapiesToMatrix = (etherapies: any): Line[] => {
      return etherapies.map((etherapy: any) => {
        return {
          link: '/',
          content: [
            [etherapy.name],
            etherapy.moderators.map((moderator: any) => moderator.name),
			[timestampFormat(etherapy.created_at)],
			[timestampFormat(etherapy.updated_at)],
          ]
        }
      })
    }

    useEffect(() => {
		if (search !== '') {
			searchEtherapies({ 
				token, 
				keywords: search,
				page, 
				per_page, 
			}).then(moderators => {
				return parseEtherapiesToMatrix(moderators);
			  }).then(matrix => setMatrix(matrix))
		} else {
			getEtherapies({ 
				token, 
				page, 
				per_page, 
				sort: sort as 'name' | 'created_at' | 'updated_at', 
				direction: direction as 'asc' | 'desc',
			}).then(etherapies => {
				return parseEtherapiesToMatrix(etherapies);
			}).then(matrix => setMatrix(matrix))
		}
		return () => cancelRequest();
    }, [page, direction, sort, search]);

	const sortAndDirection = (sortBy: string) => {
		setSort(sortBy)
		setDirection('asc')
		if (direction === 'asc') {
			setDirection('desc')
		}
	}

	const heads = [
		{ name: 'Name', action: () => sortAndDirection('name') }, 
		{ name: 'Moderators' }, 
		{ name: 'Created_at', action: () => sortAndDirection('created_at') }, 
		{ name: 'Updated_at', action: () => sortAndDirection('updated_at') }
	];

    return (
        <Layout>
        <MyTitle>Etherapies</MyTitle>
		<MySearchInput handleChange={setSearch} placeholder='Search Etherapies' />
        <MyTable
            heads={heads}
            matrix={matrix}
			page={page}
			setPage={setPage}
		/>
        <Divider />
        <MyButton>
			<Link href={'/'}>New Etherapy</Link>
        </MyButton>
        </Layout>
    )
}

type loadParams ={
	token: string;
	page: number;
	per_page: number;
	sort?: 'name' | 'created_at' | 'updated_at';
    direction?: 'asc' | 'desc';
}
const getEtherapies = async ({ token, page, per_page, sort, direction }: loadParams): Promise<any> => {
	const response = await api.get('/etherapies', {
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
	const etherapies = response.data;
	
	if (!etherapies) {
		return [];
	}

	return etherapies;
}

type searchParams ={
	token: string;
	keywords: string;
	page: number;
	per_page: number;
}
const searchEtherapies = async ({ token, keywords, page, per_page }: searchParams): Promise<any> => {
	const response = await api.get(`/etherapies/search/${keywords}`, {
		params: {
			page,
			per_page,
		},
		headers: {
			'Authorization': `token ${token}`
		}
	});
	const etherapies = response.data;
	
	if (!etherapies) {
		return [];
	}

	return etherapies;
}