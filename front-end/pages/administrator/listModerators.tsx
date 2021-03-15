import { Divider } from "@chakra-ui/layout";
import MyButton from "../../components/shared/MyButton";
import MyInput from "../../components/shared/MyInput";
import MyTable from "../../components/list/MyTable";
import MyTitle from "../../components/shared/MyTitle";
import { useState } from "react";

export default function ListModerators() {
  const [heads, setHeads] = useState(['Name', 'Eterapias']);
  const [matrix, setMatrix] = useState([
    [{ id:'aaa', link: '/', name:'Fulano'}, ['Como dormir acordado']],
    [{ id:'bbb', link: '/', name:'Sicrano'}, ['Como dormir acordado', 'Terapia']],
    [{ id:'ccc', link: '/', name:'Curinga'}, ['Terapia']],
  ]);

  function handleRemove(matrix: any[][], id: string) {
    const newMatrix = matrix.filter(elemente => elemente[0].id !== id);
    setMatrix(newMatrix);
  }

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
