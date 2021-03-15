import { Button } from "@chakra-ui/button"
import { DeleteIcon } from "@chakra-ui/icons"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from "@chakra-ui/modal"
import { useRef, useState } from "react"

interface MyProps {
    nameObjectWillDeleted: string;
    handleRemove: Function;
}

export default function DeleteAlertDialog({ nameObjectWillDeleted, handleRemove }: MyProps) {
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()
  
    return (
      <>
        <Button colorScheme="red" onClick={() => setIsOpen(true)}>
          <DeleteIcon />
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete { nameObjectWillDeleted }
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={() => {
                    handleRemove()
                    onClose()
                  }
                } ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }