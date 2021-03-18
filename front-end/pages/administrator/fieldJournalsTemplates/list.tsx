import { Divider } from "@chakra-ui/layout";
import Link from "next/link";
import Layout from "../../../components/shared/Layout";
import MyButton from "../../../components/shared/MyButton";
import MyTitle from "../../../components/shared/MyTitle";

export default function ListFieldJournalsTemplates() {
    return (
        <Layout>
          <MyTitle>List Field Journals Templates</MyTitle>
          <Divider />
          <MyButton hide={false}>
            <Link href={'/administrator/fieldJournalsTemplates/form'}>New field journal template</Link>
          </MyButton>
        </Layout>
    )
}