import { Divider } from "@chakra-ui/layout";
import Link from "next/link";
import MyButton from "../../../components/shared/MyButton";
import MyTitle from "../../../components/shared/MyTitle";

export default function ListEterapias() {
    return (
        <>
        <MyTitle>List Eterapias</MyTitle>
        <Divider />
        <MyButton hide={false}>
          <Link href={'/administrator/eterapias/form'}>New eterapia</Link>
        </MyButton>
        </>
    )
}