import { Checkbox, CheckboxGroup } from "@chakra-ui/checkbox";
import { Input } from "@chakra-ui/input";
import { Box, Text, Wrap } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Textarea } from "@chakra-ui/textarea";
import React, { useState } from "react";
import { typesOfQuestions } from "../../../utils/typesOfQuestions";
import MyDatePicker from "../DatePicker/MyDatePicker";

interface MyProps {
    label: string;
    type: typesOfQuestions;
    index: number;
    handleChange: Function;
    defaultValue?: string | string[];
    defaultOptions?: string[];
}

export default function Question({ label, type, index, handleChange, defaultValue, defaultOptions }: MyProps) {
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
        const [myDate, setDate] = useState(defaultValue ? new Date(defaultValue as string) : null);
        inputType = <MyDatePicker 
                        placeholderText='dia, mês, ano'
                        selectedDate={myDate}
                        onChange={date => {
                            handleChange(date as Date, index); 
                            setDate(date as Date) 
                        }
                    } />
    }

    else if (type === 'check') {
        const options = defaultOptions;
        inputType = <CheckboxGroup colorScheme="green" defaultValue={defaultValue ? [...defaultValue as string[]] : null}>
                    {
                        React.Children.toArray(
                            options?.map(option => {
                                return <Checkbox 
                                        value={option}
                                        onChange={(e) => handleChange(e.target.value, index)} 
                                    >
                                        { option }
                                    </Checkbox>
                            })
                        )
                    }
                    </CheckboxGroup>
    }

    else if (type === 'choice') {
        const options = defaultOptions;
        const [value, setValue] = useState(defaultValue);
        inputType = <RadioGroup 
                        colorScheme="green" 
                        onChange={(selected) => {
                            handleChange(selected, index)
                            setValue(selected as string)
                        }} 
                        value={value as string}>
                        {
                            React.Children.toArray(
                                options?.map(option => {
                                    return <Radio value={option}>
                                            { option }
                                        </Radio>
                                })
                            )
                        }
                    </RadioGroup>
    }

    else if (type === 'linear') {
        const options = defaultOptions;
        const [value, setValue] = useState(defaultValue);
        const [arrayOptions, _setArrayOptions] = useState(
            Array.from(
                { length: parseInt(options[1]) + 1 }, 
                (_, i) => (i + parseInt(options[0]) + '')
            )
        );
        inputType = <RadioGroup 
                        colorScheme="green" 
                        onChange={(selected) => {
                            handleChange(selected, index)
                            setValue(selected as string)
                        }} 
                        value={value as string}>
                        {
                            React.Children.toArray(
                                arrayOptions?.map(option => {
                                    return <Radio value={option}>
                                            { option }
                                        </Radio>
                                })
                            )
                        }
                    </RadioGroup>
    }

    return (
        <Box key={Math.random()} marginTop='1.5vh' marginBottom='1.5vh'>
            <Text>{ label }</Text>
            { inputType }
        </Box>
    )
}