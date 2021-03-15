import { Button } from "@chakra-ui/react"


export default function MyButton({ hide=false, children }) {
    return (
        <>{
            hide? null :
            <Button>{ children }</Button>
        }</>
    )
}