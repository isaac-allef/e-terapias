import { useEffect, useState } from "react";
import MyMenu from "../../components/new/MyMenu";
import MySearchInput from "../../components/new/MySearchInput";
import MySkeletonTable from "../../components/new/MySkeletonTable";
import MyTable from "../../components/new/MyTable";
import Layout from "../../components/shared/Layout";
import MyTitle from "../../components/shared/MyTitle";
import api, {cancelRequest} from "../../services/api";
import { timestampToDate, timestampToDateTime } from "../../utils/timestampFormat";

interface Line {
  link: string;
  content: string[][];
}

export default function FieldJournalList() {

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

    const parseFieldJournalsToMatrix = (fieldJournals: any): Line[] => {
      return fieldJournals.map((fieldJournal: any) => {
        return {
          link: `/new/fieldJournalDetail/${fieldJournal.id}`,
          content: [
            [fieldJournal.name],
            [timestampToDate(fieldJournal.date)],
            [fieldJournal.moderator.name + ' - ' + fieldJournal.moderator.email],
            [fieldJournal.etherapy.identifier + ' - ' + fieldJournal.etherapy.name],
			[timestampToDateTime(fieldJournal.created_at)],
			[timestampToDateTime(fieldJournal.updated_at)],
          ]
        }
      })
    }

    useEffect(() => {
		if (token) {
			if (search !== '') {
				setLoading(true);
				searchFieldJournals({ 
					token, 
					keywords: search,
					page, 
					per_page, 
				}).then(fieldJournals => {
					return parseFieldJournalsToMatrix(fieldJournals);
				}).then(matrix => setMatrix(matrix))
				setLoading(false);
			} else {
				setLoading(true);
				getFieldJournals({ 
				token, 
				page, 
				per_page, 
				sort: sort as 'name' | 'date' | 'created_at' | 'updated_at', 
				direction: direction as 'asc' | 'desc',
			}).then(fieldJournals => {
				return parseFieldJournalsToMatrix(fieldJournals);
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
		{ name: 'Date', action: () => sortAndDirection('date') }, 
		{ name: 'Moderator' }, 
		{ name: 'Etherapy' }, 
		{ name: 'Created_at', action: () => sortAndDirection('created_at') }, 
		{ name: 'Updated_at', action: () => sortAndDirection('updated_at') }
	];

    return (
        <Layout menu={<MyMenu manager={true} itemSelected='fieldJournalList' />}>
        <MyTitle>FieldJournals</MyTitle>
		<MySearchInput handleChange={setSearch} placeholder='Search field journals' />
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
	sort?: 'name' | 'date' | 'created_at' | 'updated_at';
    direction?: 'asc' | 'desc';
}
const getFieldJournals = async ({ token, page, per_page, sort, direction }: loadParams): Promise<any> => {
	const response = await api.get('/fieldJournals', {
		params: {
			page,
			per_page,
			sort,
			direction,
			offerId: localStorage.getItem('@etherapies:offerId'),
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

type searchParams ={
	token: string;
	keywords: string;
	page: number;
	per_page: number;
}
const searchFieldJournals = async ({ token, keywords, page, per_page }: searchParams): Promise<any> => {
	const response = await api.get(`/fieldJournals/search/${keywords}`, {
		params: {
			page,
			per_page,
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