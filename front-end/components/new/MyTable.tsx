import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
    Button,
  } from "@chakra-ui/react"

  import { ArrowDownIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
  import { Center, Flex } from "@chakra-ui/layout";

import React, { useState } from "react";

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

const ColumnComponent = ({ name, action, verifyColumnIsActive, setColumnActiveName }) => {
    const [icon, setIcon] = useState(null);
    const [up, setUp] = useState(false);
    return (
        <Button 
            variant='unstyled' 
            rightIcon={verifyColumnIsActive(name) ? icon : null} 
            onClick={
            () => { 
                if (action) {
                    action();
                    if (up) {
                        setColumnActiveName(name)
                        setUp(!up);
                        setIcon(<ArrowUpIcon />);
                    } else {
                        setColumnActiveName(name)
                        setUp(!up);
                        setIcon(<ArrowDownIcon />);
                    }
                }
            }
        }>
            { name }
        </Button>
    )
};

export default function MyTable({ heads, matrix, page, setPage }: MyProps) {
    const [columnActiveName, setColumnActiveName] = useState(null);

    const verifyColumnIsActive = (name) => {
        if (columnActiveName === name) {
            return true;
        }
        return false;
    }
    
    return (
        <>
        <Table variant='simple' colorScheme='blackAlpha'>
            <Thead>
                <Tr>{
                    React.Children.toArray(heads.map(column => <Th>
                        <ColumnComponent 
                            name={column.name} 
                            action={column.action}
                            setColumnActiveName={setColumnActiveName}
                            verifyColumnIsActive={verifyColumnIsActive}
                        />
                    </Th>))
                }<Th />
                </Tr>
            </Thead>
            <Tbody>{
                React.Children.toArray(
                    matrix.map(line => {
                        return (
                        <Link href={line.link}>
                        <Tr textColor='#696969' _hover={{color: 'blue.500'}} cursor='pointer'>
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
        <Flex marginTop='1rem' marginBottom='1rem'>
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
                boxShadow='xl'
                size='md'
                aria-label="close" 
                colorScheme='blue'
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