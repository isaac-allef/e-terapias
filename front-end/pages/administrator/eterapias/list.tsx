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

export default function ListEterapias() {
  const myToast = new MyToast();
  const [heads, setHeads] = useState<string[]>(['Name', 'Moderators', 'Field Journal Template']);
  const [matrix, setMatrix] = useState<Line[]>([]);
  const [page ,setPage] =useState(1);

  function removeElementFromMatrix(matrix: Line[], id: string) {
    const newMatrix = matrix.filter(elemente => elemente.elementMain.id !== id);
    setMatrix(newMatrix);
  }

  async function handleRemove(matrix: Line[], id: string) {
    try {
      const token = localStorage.getItem('@eterapias:token');
      const fieldJournalTemplate = await removeEterapia(token, id);

      removeElementFromMatrix(matrix, id);
      
      myToast.execute({ status: 'success', title: `${fieldJournalTemplate.name} deleted.` });
    } catch (err) {
      myToast.execute({ status: 'error', title: 'Error', description: err.message });
    }
  }

  function convertEterapiasJsonToMatrixMyTable(eterapias: any[]) {
    const matrixMyTable = eterapias.map(eterapia => {

      let moderatorsNames = [];
      let fieldJournalTemplateName = []

      if (eterapia.moderators) {
        moderatorsNames = eterapia.moderators.map(moderator => moderator.email);
      }

      if (eterapia.fieldJournalTemplate) {
        fieldJournalTemplateName = [eterapia.fieldJournalTemplate.name]
      }

      return { 
              elementMain: { id: eterapia.id, link: '/administrator/fieldJournalsTemplates/detail', name: eterapia.name}, 
              others: [moderatorsNames, fieldJournalTemplateName]
            }
    })

    return matrixMyTable;
  }

  useEffect(() => {
    const token = localStorage.getItem('@eterapias:token');
    getEterapias(token, page).then(eterapiasJson => {
      const eterapiasMatrix = convertEterapiasJsonToMatrixMyTable(eterapiasJson);
      setMatrix(eterapiasMatrix);
    })
  }, [page]);

    return (
        <Layout>
        <MyTitle>List Eterapias</MyTitle>
        <MyInput placeholder="Search the eterapias" search={true} ></MyInput>
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
        <MyButton>
          <Link href={'/administrator/eterapias/form'}>New eterapia</Link>
        </MyButton>
        </Layout>
    )
}

async function removeEterapia(token: string, id: string) {
  const response = await api.delete(`/eterapias/${id}`, {
    headers: {
      'Authorization': `token ${token}`
    }
  });
  const eterapia = response.data;
  return eterapia;
}

async function getEterapias(token: string, page = 1) {
  const response = await api.get('/eterapias', {
    params: {
      relations: ['moderators', 'fieldJournalTemplate'],
      page: page,
    },
    headers: {
      'Authorization': `token ${token}`
    }
  });
  const fieldJournalsTemplates = response.data;
  return fieldJournalsTemplates;
}