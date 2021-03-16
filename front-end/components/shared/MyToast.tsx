import { useToast } from "@chakra-ui/toast"

interface MyProps {
    title: string;
    status: "success" | "error" | "warning" | "info";
    description?: string;
}

export default class MyToast{
    private toast;

    constructor() {
        this.toast = useToast();
    }

    public execute({ title, status, description }: MyProps) {
        this.toast({
            title: title,
            description: description,
            status: status,
            duration: 2000,
            isClosable: true,
        })
    }
}