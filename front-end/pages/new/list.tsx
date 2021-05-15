import { Button } from "@chakra-ui/button";
import { Center, Divider } from "@chakra-ui/layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import MyPagination from "../../components/list/MyPagination";
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

export default function ListFieldJournals() {
  const [heads, _setHeads] = useState<string[]>(['Name', 'Eterapias', 'Created_at', 'Updated_at']);
  const [matrix, setMatrix] = useState<Line[]>([]);
  const [page , setPage] = useState(1);
  const [per_page , setPerPage] = useState(5);
  const [sort , setSort] = useState('updated_at');
  const [direction , setDirection] = useState('asc');
	
	const timestampFormat = (timestamp: string): string => {
		return new Date(timestamp).toUTCString();
	}

    const parseTemplatesToMatrix = (templates: any): Line[] => {
      return templates.map((template: any) => {
        return {
          link: '/',
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
		// const token = localStorage.getItem('@eterapias:token');
		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmZTJmYmQyLTRmNTYtNGY0ZS04NzcwLTJjMzc0MTI3MTU2YiIsImlhdCI6MTYyMTAyODk0N30.3HzZioMqIsu1pR_Fb8c9whLOUeho7bh_eZRXN-RtuCI';
      	getTemplates({ 
			token, 
			page, 
			per_page, 
			sort: sort as 'name' | 'created_at' | 'updated_at', 
			direction: direction as 'asc' | 'desc',
		}).then(templates => {
        	return parseTemplatesToMatrix(templates);
      	}).then(matrix => setMatrix(matrix))
    }, [page, direction]);

    return (
        <Layout>
        <MyTitle>Templates</MyTitle>
        <MyInput placeholder="Search templates" search={true} ></MyInput>
		<Button
			onClick={() => {
				setSort('updated_at');
				direction === 'asc'? setDirection('desc') : setDirection('asc');
			}}
		>updated_at</Button>
          <MyTable
              heads={heads}
              matrix={matrix}
          />
          <Center>
            <MyPagination
              page={page}
              setPage={setPage}
            />
          </Center>
        <Divider />
        <MyButton>
          <Link href={'/'}>New template</Link>
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
	return templates;

	return []
}