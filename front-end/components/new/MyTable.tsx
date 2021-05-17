import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
    Button,
  } from "@chakra-ui/react"

import React from "react";

import Link from 'next/link';

interface Line {
    link: string;
    content: string[][];
}

interface MyProps {
    heads: { name: string, action?: Function }[];
    matrix: Line[];
}

export default function MyTable({ heads, matrix }: MyProps) {
    return (
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
    )
}