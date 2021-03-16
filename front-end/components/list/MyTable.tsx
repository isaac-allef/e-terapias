import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
  } from "@chakra-ui/react"

import React from "react";
import DeleteAlertDialog from "./DeleteAlertDialog";

import Link from 'next/link';

interface Line {
    elementMain: {id: string, link: string, name: string};
    others: string[][];
}

interface MyProps {
    heads: string[];
    matrix: Line[];
    handleRemove: Function;
}

export default function MyTable({ heads, matrix, handleRemove }: MyProps) {
    return (
        <Table variant="simple">
            <Thead>
                <Tr>{
                    React.Children.toArray(
                        heads.map(value => {
                            return <Th>{ value }</Th>
                        })
                    )
                }<Th />
                </Tr>
            </Thead>
            <Tbody>{
                React.Children.toArray(
                    matrix.map(line => {
                        return <Tr>
                            <Td><Link href={line.elementMain.link}>{ line.elementMain.name }</Link></Td>
                            {React.Children.toArray(
                                line.others.map(value => {
                                    const valueFormated = value.map((v, index) => {
                                        if (index === value.length -1) {
                                            return v + '.'
                                        }
                                        return v + ', '
                                    })
                                    return <Td>{ valueFormated }</Td>
                                })
                            )}
                            <Td>
                                <DeleteAlertDialog 
                                    nameObjectWillDeleted={line.elementMain.name} 
                                    handleRemove={() => handleRemove(matrix, line.elementMain.id)}
                                />
                            </Td>
                        </Tr>
                    })
                )
            }</Tbody>
        </Table>
    )
}