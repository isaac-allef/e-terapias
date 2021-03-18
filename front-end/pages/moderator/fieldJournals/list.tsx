import { Divider } from "@chakra-ui/layout";
import Link from "next/link";
import MyButton from "../../../components/shared/MyButton";
import MyTitle from "../../../components/shared/MyTitle";

export default function ListFieldJournals() {
    return (
        <>
        <MyTitle>List Field Journals</MyTitle>
        <Divider />
        <MyButton hide={false}>
          <Link href={'/moderator/fieldJournals/form'}>New field journal</Link>
        </MyButton>
        </>
    )
}