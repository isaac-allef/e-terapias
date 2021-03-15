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

interface Content {
    heads: string[];
    matrix: any[][];
    handleRemove: Function;
}

export default function MyTable({ heads, matrix, handleRemove }: Content) {
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
                    matrix.map(vector => {
                        return <Tr>{
                            React.Children.toArray(
                                vector.map((value, index) => {
                                    if (index === 0) {
                                        return <Td><Link href={value.link}>{ value.name }</Link></Td>
                                    }
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
                                    nameObjectWillDeleted={vector[0].name} 
                                    handleRemove={() => handleRemove(matrix, vector[0].id)}
                                />
                            </Td>
                        </Tr>
                    })
                )
            }</Tbody>
        </Table>
    )
}