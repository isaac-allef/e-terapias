import { Center, Divider } from "@chakra-ui/layout";
import Link from "next/link";
import Layout from "../../../components/shared/Layout";
import MyButton from "../../../components/shared/MyButton";
import MyTitle from "../../../components/shared/MyTitle";
import MyInput from "../../../components/shared/MyInput";
import MyTable from "../../../components/list/MyTable";
import { useEffect, useState } from "react";
import api from '../../../services/api';
import MyToast from "../../../components/shared/MyToast";
import MyPagination from "../../../components/list/MyPagination";

interface Line {
  elementMain: {id: string, link: string, name: string};
  others: string[][];
}

export default function ListFieldJournalsTemplates() {
  const myToast = new MyToast();
  const [heads, setHeads] = useState<string[]>(['Name', 'Eterapias']);
  const [matrix, setMatrix] = useState<Line[]>([]);
  const [page ,setPage] =useState(1);

  function removeElementFromMatrix(matrix: Line[], id: string) {
    const newMatrix = matrix.filter(elemente => elemente.elementMain.id !== id);
    setMatrix(newMatrix);
  }

  async function handleRemove(matrix: Line[], id: string) {
    try {
      const token = localStorage.getItem('@eterapias:token');
      const fieldJournalTemplate = await removeFieldJournalTemplate(token, id);

      removeElementFromMatrix(matrix, id);
      
      myToast.execute({ status: 'success', title: `${fieldJournalTemplate.name} deleted.` });
    } catch (err) {
      myToast.execute({ status: 'error', title: 'Error', description: err.message });
    }
  }

  function convertFieldJournalsTemplatesJsonToMatrixMyTable(fieldJournalsTemplates: any[]) {
    const matrixMyTable = fieldJournalsTemplates.map(fieldJournalTemplate => {

      let eterapiasNames = [];
      if (fieldJournalTemplate.eterapias) {
        eterapiasNames = fieldJournalTemplate.eterapias.map(eterapia => eterapia.name);
      }

      return { 
              elementMain: { id: fieldJournalTemplate.id, link: '/administrator/fieldJournalsTemplates/detail', name: fieldJournalTemplate.name}, 
              others: [eterapiasNames]
            }
    })

    return matrixMyTable;
  }

  useEffect(() => {
    const token = localStorage.getItem('@eterapias:token');
    getFieldJournalsTemplates(token, page).then(fieldJournalsTemplatesJson => {
      const fieldJournalsTemplatesMatrix = convertFieldJournalsTemplatesJsonToMatrixMyTable(fieldJournalsTemplatesJson);
      setMatrix(fieldJournalsTemplatesMatrix);
    })
  }, [page]);

    return (
        <Layout>
          <MyTitle>List Field Journals Templates</MyTitle>
          <MyInput placeholder="Search the field journals templates" search={true} ></MyInput>
          <MyTable
              heads={heads}
              matrix={matrix}
              handleRemove={handleRemove}
          />
          <Center>
            <MyPagination
              page={page}
              setPage={setPage}
            />
          </Center>
          <Divider />
          <MyButton hide={false}>
            <Link href={'/administrator/fieldJournalsTemplates/form'}>New field journal template</Link>
          </MyButton>
        </Layout>
    )
}
async function removeFieldJournalTemplate(token: string, id: string) {
  const response = await api.delete(`/fieldjournaltemplates/${id}`, {
    headers: {
      'Authorization': `token ${token}`
    }
  });
  const fieldJournalTemplate = response.data;
  return fieldJournalTemplate;
}

async function getFieldJournalsTemplates(token: string, page = 1) {
  const response = await api.get('/fieldjournaltemplates', {
    params: {
      relations: ['eterapias'],
      page: page,
    },
    headers: {
      'Authorization': `token ${token}`
    }
  });
  const fieldJournalsTemplates = response.data;
  return fieldJournalsTemplates;
}