import { Button } from "@chakra-ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";

interface MyProps {
    page: number;
    setPage: Function;
}

export default function MyPagination({ page, setPage }: MyProps) {
    const changePage = (newPage: number) => {
        newPage > 0 ? setPage(newPage) : null
    }

    const nextPage = () => {
        setPage(page + 1)
    }

    const backPage = () => {
        page > 1 ? setPage(page - 1) : null
    }

    return (
        <Flex>
            <Button 
                variant='outline'
                isDisabled={page === 1 ? true : false} 
                onClick={() => backPage()}
            ><ChevronLeftIcon /></Button>
            <Button
                isDisabled={page < 3 ? true : false} 
                variant='link'
                size='md'
                aria-label="close" 
                onClick={() => changePage(page - 2)}
            >{ page - 2 }</Button>
            <Button
                isDisabled={page < 2 ? true : false} 
                variant='link'
                size='md'
                aria-label="close" 
                onClick={() => changePage(page - 1)}
            >{ page - 1 }</Button>
            <Button
                variant='outline'
                size='md'
                aria-label="close" 
            >{ page }</Button>
            <Button
                variant='link'
                size='md'
                aria-label="close" 
                onClick={() => changePage(page + 1)}
            >{ page + 1 }</Button>
            <Button
                variant='link'
                size='md'
                aria-label="close" 
                onClick={() => changePage(page + 2)}
            >{ page + 2 }</Button>
            <Button 
                variant='outline'
                onClick={() => nextPage()}
            ><ChevronRightIcon /></Button>
        </Flex>
    )
}