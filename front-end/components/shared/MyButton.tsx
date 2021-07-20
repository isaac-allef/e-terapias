import { DeleteIcon } from "@chakra-ui/icons"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { useRef, useState } from "react";

export default function MyButton({ 
    styleType='normal', 
    children=null, 
    deleteFunction=() => null, 
    ...props 
}) {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();
    return (
            styleType === 'delete' ?
            <>
            <Button 
                colorScheme="red"
                onClick={() => setIsOpen(true)}
                { ...props }
                >
                <DeleteIcon />
                { children }
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Are you sure?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="red" 
                        onClick={
                            () => {
                                onClose()
                                deleteFunction()
                            }
                        } 
                        ml={3}
                    >
                        Delete
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            </>
            :
            <Button 
                colorScheme='blue'
                { ...props } 
            >{ children }</Button>

    )
}