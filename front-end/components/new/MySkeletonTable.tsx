import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

export default function MySkeletonTable({ isLoaded, children }) {
    return (
        <>
        {
			isLoaded ?
                children
            :
                <Stack spacing={4} marginTop={4} marginBottom={4} >
                    <Skeleton height={10} />
                    <Skeleton height={10} />
                    <Skeleton height={10} />
                    <Skeleton height={10} />
                    <Skeleton height={10} />
                </Stack>
		}
        </>
    )
}