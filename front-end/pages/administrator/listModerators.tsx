import { Divider } from "@chakra-ui/layout";
import MyButton from "../../components/shared/MyButton";
import MyInput from "../../components/shared/MyInput";
import MyTable from "../../components/list/MyTable";
import MyTitle from "../../components/shared/MyTitle";
import { useEffect, useState } from "react";

import api from '../../services/api';
import MyToast from "../../components/shared/MyToast";

export default function ListModerators() {
  const myToast = new MyToast();
  const [heads, setHeads] = useState(['Email', 'Eterapias']);
  const [matrix, setMatrix] = useState([]);

  async function handleRemove(matrix: any[][], id: string) {
    try {
      const token = localStorage.getItem('@eterapias:token');
      const moderator = await removeModerator(token, id);
      
      myToast.execute({ status: 'success', title: `${moderator.email} deleted.` });
  
      const newMatrix = matrix.filter(elemente => elemente[0].id !== id);
      setMatrix(newMatrix);
    } catch (err) {
      myToast.execute({ status: 'error', title: 'Error', description: err.message });
    }
  }

  function convertJsonToMatrix(moderators: any[]) {
    return moderators.map(moderator => {
      const eterapias = moderator.eterapias.map(eterapia => eterapia.name);
      return [{ id:moderator.id, link: '/', name:moderator.email}, eterapias]
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('@eterapias:token');
    getModerators(token).then(moderatorsJson => {
      const moderatorsMatrix = convertJsonToMatrix(moderatorsJson);
      setMatrix(moderatorsMatrix);
    })
  }, []);

  return (
      <>
        <MyTitle>{'List Moderatos'}</MyTitle>
        <MyInput placeholder="Search the moderators" search={true} ></MyInput>
        <MyTable
            heads={heads}
            matrix={matrix}
            handleRemove={handleRemove}
        />

        <Divider />
        <MyButton hide={false}>{'New moderator'}</MyButton>
      </>
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

async function getModerators(token: string) {
  const response = await api.get('/moderators', {
    params: {
      relations: ['eterapias']
    },
    headers: {
      'Authorization': `token ${token}`
    }
  });
  const moderators = response.data;
  return moderators;
}

// [
//   [{ id:'aaa', link: '/', name:'Fulano'}, ['Como dormir acordado']],
//   [{ id:'bbb', link: '/', name:'Sicrano'}, ['Como dormir acordado', 'Terapia']],
//   [{ id:'ccc', link: '/', name:'Curinga'}, ['Terapia']],
// ]