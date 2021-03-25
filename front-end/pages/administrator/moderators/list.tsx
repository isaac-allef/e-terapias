import { Center, Divider } from "@chakra-ui/layout";
import MyButton from "../../../components/shared/MyButton";
import MyInput from "../../../components/shared/MyInput";
import MyTable from "../../../components/list/MyTable";
import MyTitle from "../../../components/shared/MyTitle";
import { useEffect, useState } from "react";

import api from '../../../services/api';
import MyToast from "../../../components/shared/MyToast";
import Link from "next/link";
import Layout from "../../../components/shared/Layout";
import MyPagination from "../../../components/list/MyPagination";

interface Line {
  elementMain: {id: string, link: string, name: string};
  others: string[][];
}

export default function ListModerators() {
  const myToast = new MyToast();
  const [heads, setHeads] = useState<string[]>(['Email', 'Eterapias']);
  const [matrix, setMatrix] = useState<Line[]>([]);
  const [page ,setPage] =useState(1);

  function removeElementFromMatrix(matrix: Line[], id: string) {
    const newMatrix = matrix.filter(elemente => elemente.elementMain.id !== id);
      setMatrix(newMatrix);
  }

  async function handleRemove(matrix: Line[], id: string) {
    try {
      const token = localStorage.getItem('@eterapias:token');
      const moderator = await removeModerator(token, id);

      removeElementFromMatrix(matrix, id);
      
      myToast.execute({ status: 'success', title: `${moderator.email} deleted.` });
    } catch (err) {
      myToast.execute({ status: 'error', title: 'Error', description: err.message });
    }
  }

  function convertModeratorsJsonToMatrixMyTable(moderators: any[]) {
    const matrixMyTable = moderators.map(moderator => {

      let eterapiasNames = [];
      if (moderator.eterapias) {
        eterapiasNames = moderator.eterapias.map(eterapia => eterapia.name);
      }

      return { 
              elementMain: { id: moderator.id, link: `/administrator/moderators/detail/${moderator.id}`, name: moderator.email}, 
              others: [eterapiasNames]
            }
    })

    return matrixMyTable;
  }

  useEffect(() => {
    const token = localStorage.getItem('@eterapias:token');
    getModerators(token, page).then(moderatorsJson => {
      const moderatorsMatrix = convertModeratorsJsonToMatrixMyTable(moderatorsJson);
      setMatrix(moderatorsMatrix);
    })
  }, [page]);

  return (
      <Layout>
        <MyTitle>{'List Moderatos'}</MyTitle>
        <MyInput placeholder="Search the moderators" search={true} ></MyInput>
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
          <Link href={'/administrator/moderators/form'}>New moderator</Link>
        </MyButton>
      </Layout>
  )
}

async function removeModerator(token: string, id: string) {
  const response = await api.delete(`/moderators/${id}`, {
    headers: {
      'Authorization': `token ${token}`
    }
  });
  const moderators = response.data;
  return moderators;
}

async function getModerators(token: string, page = 1) {
  const response = await api.get('/moderators', {
    params: {
      relations: ['eterapias'],
      page: page,
    },
    headers: {
      'Authorization': `token ${token}`
    }
  });
  const moderators = response.data;
  return moderators;
}



// [
//   {elementMain: { id:'aaa', link: '/', name:'Fulano'}, others: [ ['Como dormir acordado'] ]},
//   {elementMain: { id:'bbb', link: '/', name:'Sicrano'}, others: [ ['Como dormir acordado', 'Terapia']]},
//   {elementMain: { id:'ccc', link: '/', name:'Curinga'}, others: [ ['Terapia']]},
// ]