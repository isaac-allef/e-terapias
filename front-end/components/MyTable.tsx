import { DeleteIcon } from "@chakra-ui/icons";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
  } from "@chakra-ui/react"

import React from "react";

interface Content {
    heads: string[];
    matrix: string[][];
}

export default function MyTable({ heads, matrix }: Content) {
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
                                vector.map(value => {
                                    return <Td>{ value }</Td>
                                })
                            )}
                            <Td><DeleteIcon /></Td>
                        </Tr>
                    })
                )
            }</Tbody>
        </Table>
    )
}