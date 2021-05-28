import { Divider } from "@chakra-ui/layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import MyMenu from "../../components/new/MyMenu";
import MySearchInput from "../../components/new/MySearchInput";
import MySkeletonTable from "../../components/new/MySkeletonTable";
import MyTable from "../../components/new/MyTable";
import Layout from "../../components/shared/Layout";
import MyButton from "../../components/shared/MyButton";
import MyInput from "../../components/shared/MyInput";
import MyTitle from "../../components/shared/MyTitle";
import api, { cancelRequest } from "../../services/api";

interface Line {
  link: string;
  content: string[][];
}

export default function TemplateList() {

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
	
	const timestampFormat = (timestamp: string): string => {
		return new Date(timestamp).toUTCString();
	}

    const parseTemplatesToMatrix = (templates: any): Line[] => {
      return templates.map((template: any) => {
        return {
          link: `/new/templateEdit/${template.id}`,
          content: [
            [template.name],
            template.etherapies.map((etherapy: any) => etherapy.identifier),
			      [timestampFormat(template.created_at)],
			      [timestampFormat(template.updated_at)],
          ]
        }
      })
    }

    useEffect(() => {
		if (token) {
			if (search !== '') {
				setLoading(true);
				searchTemplates({ 
					token, 
					keywords: search,
					page, 
					per_page, 
				}).then(moderators => {
					return parseTemplatesToMatrix(moderators);
				}).then(matrix => setMatrix(matrix))
				setLoading(false);
			} else {
				setLoading(true);
				getTemplates({ 
					token, 
					page, 
					per_page, 
					sort: sort as 'name' | 'created_at' | 'updated_at', 
					direction: direction as 'asc' | 'desc',
				}).then(templates => {
					return parseTemplatesToMatrix(templates);
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
        <MyTitle>Templates</MyTitle>
		<MySearchInput handleChange={setSearch} placeholder='Search templates' />
		<MySkeletonTable isLoaded={!loading}>
			<MyTable
				heads={heads}
				matrix={matrix}
				page={page}
				setPage={setPage}
			/>
		</MySkeletonTable>
        <Divider />
        <MyButton>
			<Link href={'/new/templateForm'}>New template</Link>
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
const getTemplates = async ({ token, page, per_page, sort, direction }: loadParams): Promise<any> => {
	const response = await api.get('/templates', {
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
	const templates = response.data;
	
	if (!templates) {
		return [];
	}

	return templates;
}

type searchParams ={
	token: string;
	keywords: string;
	page: number;
	per_page: number;
}
const searchTemplates = async ({ token, keywords, page, per_page }: searchParams): Promise<any> => {
	const response = await api.get(`/templates/search/${keywords}`, {
		params: {
			page,
			per_page,
		},
		headers: {
			'Authorization': `token ${token}`
		}
	});
	const templates = response.data;
	
	if (!templates) {
		return [];
	}

	return templates;
}