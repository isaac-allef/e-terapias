import { Divider } from "@chakra-ui/layout";
import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";
import MyTable from "../../components/MyTable";
import MyTitle from "../../components/MyTitle";

export default function List() {
  return (
      <>
        <MyTitle>{'List Moderatos'}</MyTitle>
        <MyInput placeholder="Search the moderators" search={true} ></MyInput>
        <MyTable
            heads={['Name', 'Eterapias']}
            matrix={[
              ['Fulano', 'Como dormir acordado'],
              ['Sicrano', 'Como dormir acordado'],
              ['Curinga', 'Terapia'],
            ]}
        />

        <Divider />
        <MyButton hide={false}>{'New moderator'}</MyButton>
      </>
  )
}
