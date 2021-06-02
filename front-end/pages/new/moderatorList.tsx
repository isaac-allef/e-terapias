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

export default function ModeratorList() {

  const [matrix, setMatrix] = useState<Line[]>([]);
  const [page , setPage] = useState(1);
  const per_page = 5;
  const [sort , setSort] = useState('updated_at');
  const [direction , setDirection] = useState('asc');
  const [search, setSearch] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        setToken(localStorage.getItem('@etherapies:token'));
    }, []);

    const parseModeratorsToMatrix = (moderators: any): Line[] => {
      return moderators.map((moderator: any) => {
        return {
          link: `/new/moderatorDetail/${moderator.id}`,
          content: [
            [moderator.name],
            moderator.etherapies.map((etherapy: any) => etherapy.identifier),
			[timestampToDateTime(moderator.created_at)],
			[timestampToDateTime(moderator.updated_at)],
          ]
        }
      })
    }

    useEffect(() => {
		if (token) {
			if (search !== '') {
				setLoading(true);
				searchModerators({ 
					token, 
					keywords: search,
					page, 
					per_page, 
				}).then(moderators => {
					return parseModeratorsToMatrix(moderators);
				}).then(matrix => setMatrix(matrix))
				setLoading(false);
			} else {
				setLoading(true);
				getModerators({ 
					token, 
					page, 
					per_page, 
					sort: sort as 'name' | 'created_at' | 'updated_at', 
					direction: direction as 'asc' | 'desc',
				}).then(moderators => {
					return parseModeratorsToMatrix(moderators);
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
		{ name: 'Eterapias' }, 
		{ name: 'Created_at', action: () => sortAndDirection('created_at') }, 
		{ name: 'Updated_at', action: () => sortAndDirection('updated_at') }
	];

    return (
        <Layout menu={<MyMenu manager={true} />}>
		<MyTitle>Moderators</MyTitle>
		<MySearchInput handleChange={setSearch} placeholder='Search Moderators' />

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
const getModerators = async ({ token, page, per_page, sort, direction }: loadParams): Promise<any> => {
	const response = await api.get('/moderators', {
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
	const moderators = response.data;
	
	if (!moderators) {
		return [];
	}

	return moderators;
}

type searchParams ={
	token: string;
	keywords: string;
	page: number;
	per_page: number;
}
const searchModerators = async ({ token, keywords, page, per_page }: searchParams): Promise<any> => {
	const response = await api.get(`/moderators/search/${keywords}`, {
		params: {
			page,
			per_page,
		},
		headers: {
			'Authorization': `token ${token}`
		}
	});
	const moderators = response.data;
	
	if (!moderators) {
		return [];
	}

	return moderators;
}