// import { CircularProgress, Progress } from "@chakra-ui/progress";
import { Spinner } from "@chakra-ui/spinner";

export default function MyLoading() {
    return (
        <>
        <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#6930c3"
            size="xl"
        />
        {/* <Progress size="sm" isIndeterminate /> */}
        {/* <CircularProgress isIndeterminate color="#6930c3" /> */}
        </>
    )
}