import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
    Button,
  } from "@chakra-ui/react"

  import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
  import { Center, Flex } from "@chakra-ui/layout";

import React from "react";

import Link from 'next/link';

interface Line {
    link: string;
    content: string[][];
}

interface MyProps {
    heads: { name: string, action?: Function }[];
    matrix: Line[];
    page: number;
    setPage: Function;
}

export default function MyTable({ heads, matrix, page, setPage }: MyProps) {
    return (
        <>
        <Table variant="simple">
            <Thead>
                <Tr>{
                    React.Children.toArray(heads.map(column => <Th>
                        <Button onClick={
                            () => column.action ? column.action(): null
                        }>
                            { column.name }
                        </Button>
                    </Th>))
                }<Th />
                </Tr>
            </Thead>
            <Tbody>{
                React.Children.toArray(
                    matrix.map(line => {
                        return (
                        <Link href={line.link}>
                        <Tr _hover={{color: "teal.500"}}>
                                {React.Children.toArray(
                                    line.content.map(value => {
                                        const valueFormated = value.map((v, index) => {
                                            if (index === value.length -1) {
                                                return v + '.'
                                            }
                                            return v + ', '
                                        })
                                        return <Td>{ valueFormated }</Td>
                                    })
                                )}
                        </Tr>
                        </Link>
                        )
                    })
                )
            }</Tbody>
        </Table>
        <Center>
            <MyPagination
                page={page}
                setPage={setPage}
            />
        </Center>
        </>
    )
}

interface paginationProps {
    page: number;
    setPage: Function;
}

function MyPagination({ page, setPage }: paginationProps) {
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