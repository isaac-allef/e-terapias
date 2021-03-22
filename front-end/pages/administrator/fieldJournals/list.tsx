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

export default function ListFieldJournals() {
  const myToast = new MyToast();
  const [heads, setHeads] = useState<string[]>(['Title', 'Eterapia', 'Moderator']);
  const [matrix, setMatrix] = useState<Line[]>([]);
  const [page ,setPage] =useState(1);

  function removeElementFromMatrix(matrix: Line[], id: string) {
    const newMatrix = matrix.filter(elemente => elemente.elementMain.id !== id);
    setMatrix(newMatrix);
  }

  async function handleRemove(matrix: Line[], id: string) {
    try {
      const token = localStorage.getItem('@eterapias:token');
      const fieldJournal = await removeFieldJournal(token, id);

      removeElementFromMatrix(matrix, id);
      
      myToast.execute({ status: 'success', title: `${fieldJournal.title} deleted.` });
    } catch (err) {
      myToast.execute({ status: 'error', title: 'Error', description: err.message });
    }
  }

  function convertFieldJournalsJsonToMatrixMyTable(fieldJournals: any[]) {
    const matrixMyTable = fieldJournals.map(fieldJournal => {

      let eterapiaName = [];
      let moderatorEmail = [];
      if (fieldJournal.eterapia) {
        eterapiaName = [fieldJournal.eterapia.name];
        moderatorEmail = [fieldJournal.moderator.email];
      }

      return { 
              elementMain: { id: fieldJournal.id, link: '/administrator/fieldJournals/detail', name: fieldJournal.title}, 
              others: [eterapiaName, moderatorEmail]
            }
    })

    return matrixMyTable;
  }

    useEffect(() => {
      const token = localStorage.getItem('@eterapias:token');
      getFieldJournals(token, page).then(fieldJournalsJson => {
        const fieldJournalsMatrix = convertFieldJournalsJsonToMatrixMyTable(fieldJournalsJson);
        setMatrix(fieldJournalsMatrix);
      })
    }, [page]);
    return (
        <Layout>
        <MyTitle>List Field Journals</MyTitle>
        <MyInput placeholder="Search the field journals" search={true} ></MyInput>
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
        </Layout>
    )
}

async function removeFieldJournal(token: string, id: string) {
  const response = await api.delete(`/fieldjournals/${id}/moderator`, {
    headers: {
      'Authorization': `token ${token}`
    }
  });
  const fieldJournal = response.data;
  return fieldJournal;
}

async function getFieldJournals(token: string, page = 1) {
  const response = await api.get('/fieldjournals/administrator', {
    params: {
      relations: ['eterapia', 'moderator'],
      page: page,
    },
    headers: {
      'Authorization': `token ${token}`
    }
  });
  const fieldJournals = response.data;
  return fieldJournals;
}