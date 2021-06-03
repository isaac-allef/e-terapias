import { useEffect, useState } from "react";
import MyMenu from "../../components/new/MyMenu";
import MySearchInput from "../../components/new/MySearchInput";
import MySkeletonTable from "../../components/new/MySkeletonTable";
import MyTable from "../../components/new/MyTable";
import Layout from "../../components/shared/Layout";
import MyTitle from "../../components/shared/MyTitle";
import api, { cancelRequest } from "../../services/api";
import { timestampToDateTime } from "../../utils/timestampFormat";

interface Line {
  link: string;
  content: string[][];
}

export default function EtherapyList() {

  const [matrix, setMatrix] = useState<Line[]>([]);
  const [page , setPage] = useState(1);
  const per_page = 5;
  const [sort , setSort] = useState('updated_at');
  const [direction , setDirection] = useState('desc');
  const [search, setSearch] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        setToken(localStorage.getItem('@etherapies:token'));
    }, []);

    const parseEtherapiesToMatrix = (etherapies: any): Line[] => {
      return etherapies.map((etherapy: any) => {
        return {
          link: `/new/etherapyDetail/${etherapy.id}`,
          content: [
            [etherapy.name],
            etherapy.moderators.map((moderator: any) => moderator.name),
			[timestampToDateTime(etherapy.created_at)],
			[timestampToDateTime(etherapy.updated_at)],
          ]
        }
      })
    }

    useEffect(() => {
		if (token) {
			if (search !== '') {
				setLoading(true);
				searchEtherapies({ 
					token, 
					keywords: search,
					page, 
					per_page, 
				}).then(moderators => {
					return parseEtherapiesToMatrix(moderators);
				}).then(matrix => setMatrix(matrix))
				setLoading(false);
			} else {
				setLoading(true);
				getEtherapies({ 
					token, 
					page, 
					per_page, 
					sort: sort as 'name' | 'created_at' | 'updated_at', 
					direction: direction as 'asc' | 'desc',
				}).then(etherapies => {
					return parseEtherapiesToMatrix(etherapies);
				}).then(matrix => setMatrix(matrix))
				setLoading(false);
			}
			return () => cancelRequest();
		}
    }, [token, page, direction, sort, search]);

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
        <Layout menu={<MyMenu manager={true} itemSelected='etherapyList' />}>
        <MyTitle>Etherapies</MyTitle>
		<MySearchInput handleChange={setSearch} placeholder='Search Etherapies' />
		<MySkeletonTable isLoaded={!loading}>
			<MyTable
				heads={heads}
				matrix={matrix}
				page={page}
				setPage={setPage}
			/>
		</MySkeletonTable>
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