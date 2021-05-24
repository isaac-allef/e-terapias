import { Divider } from "@chakra-ui/layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import MyTable from "../../components/new/MyTable";
import Layout from "../../components/shared/Layout";
import MyButton from "../../components/shared/MyButton";
import MyInput from "../../components/shared/MyInput";
import MyTitle from "../../components/shared/MyTitle";
import api from "../../services/api";

interface Line {
  link: string;
  content: string[][];
}

export default function MyFieldJournalList() {

  const [matrix, setMatrix] = useState<Line[]>([]);
  const [page , setPage] = useState(1);
  const per_page = 5;
  const [sort , setSort] = useState('updated_at');
  const [direction , setDirection] = useState('asc');
  // const [token, setToken] = useState(localStorage.getItem('@etherapies:token'));
  const [token, _] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhhMDRjNGEwLTVhY2MtNDVhZi1iOTMxLWYyNTRmOTE0YmQ3YyIsImlhdCI6MTYyMTAyODg5OH0.tbSNd_Cl32z_phFMHcpMGjDcb80a32vZRtzOmS_wVUc');
	
	const timestampFormat = (timestamp: string): string => {
		return new Date(timestamp).toUTCString();
	}

    const parseFieldJournalsToMatrix = (fieldJournals: any): Line[] => {
      return fieldJournals.map((fieldJournal: any) => {
        return {
          link: '/',
          content: [
            [fieldJournal.name],
            [fieldJournal.etherapy.identifier],
			[timestampFormat(fieldJournal.created_at)],
			[timestampFormat(fieldJournal.updated_at)],
          ]
        }
      })
    }

    useEffect(() => {
      	getMyFieldJournals({ 
			token, 
			page, 
			per_page, 
			sort: sort as 'name' | 'created_at' | 'updated_at', 
			direction: direction as 'asc' | 'desc',
		}).then(fieldJournals => {
        	return parseFieldJournalsToMatrix(fieldJournals);
      	}).then(matrix => setMatrix(matrix))
    }, [page, direction, sort]);

	const sortAndDirection = (sortBy: string) => {
		setSort(sortBy)
		setDirection('asc')
		if (direction === 'asc') {
			setDirection('desc')
		}
	}

	const heads = [
		{ name: 'Name', action: () => sortAndDirection('name') }, 
		{ name: 'Etherapy' }, 
		{ name: 'Created_at', action: () => sortAndDirection('created_at') }, 
		{ name: 'Updated_at', action: () => sortAndDirection('updated_at') }
	];

    return (
        <Layout>
        <MyTitle>FieldJournals</MyTitle>
        <MyInput placeholder="Search field journals" search={true} ></MyInput>
        <MyTable
            heads={heads}
            matrix={matrix}
			page={page}
			setPage={setPage}
		/>
        <Divider />
        <MyButton>
			<Link href={'/'}>New field journal</Link>
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
const getMyFieldJournals = async ({ token, page, per_page, sort, direction }: loadParams): Promise<any> => {
	const response = await api.get('/moderators/me/fieldJournals', {
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