import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useState } from "react";
import MyDatePicker from "../DatePicker/MyDatePicker";

interface MyProps {
    label: string;
    type: 'short' | 'long' | 'date';
    index: number;
    handleChange: Function;
    defaultValue?: string;
}

export default function Question({ label, type, index, handleChange, defaultValue }: MyProps) {
    let inputType = null;

    if (type === 'short') {
        inputType = <Input 
                        defaultValue={defaultValue ? defaultValue : ''} 
                        onChange={(e) => handleChange(e.target.value, index)} 
                    />
    }

    else if (type === 'long') {
        inputType = <Textarea 
                        defaultValue={defaultValue ? defaultValue : ''} 
                        onChange={(e) => handleChange(e.target.value, index)} 
                    />
    }

    else if (type === 'date') {
        const [myDate, setDate] = useState(defaultValue ? new Date(defaultValue) : new Date);
        inputType = <MyDatePicker 
                        selectedDate={myDate} 
                        onChange={date => {
                            handleChange(date as Date, index); 
                            setDate(date as Date) 
                        }
                    } />
    }

    return (
        <Box key={Math.random()} marginTop='1.5vh' marginBottom='1.5vh'>
            <Text>{ label }</Text>
            { inputType }
        </Box>
    )
}