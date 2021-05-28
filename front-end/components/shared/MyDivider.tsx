import { Divider } from "@chakra-ui/layout";

export default function MyDivider({...props}) {
    return (
        <>
        <Divider {...props} marginTop='1rem' marginBottom='1rem' />
        </>
    )
}