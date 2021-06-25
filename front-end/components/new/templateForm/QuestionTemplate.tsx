import { Button, IconButton } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import { ChevronDownIcon, Icon, SmallAddIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Text, Box, Flex, Stack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Radio } from "@chakra-ui/radio";
import { FormControl, FormLabel, Select, Switch } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/textarea";
import { useState } from "react";
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";
import { typesOfQuestions } from "../../../utils/typesOfQuestions";
import MyDivider from "../../../components/shared/MyDivider";

const ListOfOptions = ({addOptions, defaultOption=[], id, direction, input}) => {
    const [options, setOptions] = useState(defaultOption);

    const change = (newValue, key) => {
        const o = [...options];
        const newOptions = o.map(option => {
            if (option.key === key) {
                return {
                    key,
                    value: newValue,
                }
            }
            return option;
        })
        setOptions(newOptions);
        addOptions(newOptions, id);
    }

    const remove = (key) => {
        const newOptions = options.filter(option => option.key !== key);
        setOptions(newOptions);
        addOptions(newOptions, id);
    }

    const add = () => {
        const newOptions = [...options];
        const key = Math.random().toString();
        newOptions.push(
            {
                key,
                value: 'Option'
            }
        )
        setOptions(newOptions);
        addOptions(newOptions, id);
    }

    return (
        <>
        <Stack spacing={3} direction={direction} marginTop={4} marginBottom={4}>
            {
                options?.map(option => {
                    return <Flex key={option.key}>
                        { input }
                        <Input 
                            value={option.value} 
                            onChange={(e) => change(e.target.value, option.key)} 
                            variant='flushed' 
                            height='30px' 
                        />
                        <IconButton
                            variant='unstyled'
                            isRound={true}
                            size='lg'
                            boxSize='30px'
                            aria-label='close' 
                            icon={<Icon as={IoMdClose} boxSize='30px'  />} 
                            onClick={() => remove(option.key)} 
                        />
                    </Flex>
                })
            }
        </Stack>
        <Button 
            variant='outline'
            onClick={() => add()}
        ><SmallAddIcon /></Button>
        </>
    )
}

const Linear = ({ defaultOption=['1', '5'], addOptions, id }) => {
    const [options, setOptions] = useState(defaultOption);

    const handleChange = (newValue, index) => {
        const newOptions = [...options];
        newOptions[index] = newValue;
        setOptions(newOptions);
        addOptions(newOptions, id);
    }

    return (<Flex alignItems='center'>
    <Select 
        value={options[0]} 
        onChange={e => handleChange(e.target.value, 0)} 
        maxWidth='max-content'>
            <option value="0">0</option>
            <option value="1">1</option>
    </Select>
    <Text margin={4}>to</Text>
    <Select 
        value={options[1]} 
        onChange={e => handleChange(e.target.value, 1)} 
        maxWidth='max-content'>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
    </Select>
    </Flex>)
}

interface MyProps {
    id: any;
    type: typesOfQuestions;
    label: string;
    handleChangeValue: Function;
    handleChangeType: Function;
    handleRemove: Function;
    handleIsRequired: Function;
    defaultIsRequired: boolean;
    addOptions?: Function;
    defaultOption?: string[];
}

export default function QuestionTemplate({ 
        id, 
        type, 
        label, 
        handleChangeValue, 
        handleChangeType, 
        handleRemove, 
        handleIsRequired,
        defaultIsRequired,
        addOptions,
        defaultOption,
    }: MyProps) {
    let skeletonType = null;

    const RequiredButton = () => (
        <FormControl width='max-content' display="flex" alignItems="center">
            <FormLabel htmlFor="switch-required" mb="0">
                Required
            </FormLabel>
            <Switch id="switch-required" defaultChecked={defaultIsRequired} onChange={() => handleIsRequired(id)} />
        </FormControl>
    )

    if (type === 'short') {
        skeletonType = <Input value=''  border='2px' isDisabled height='30px' />
    }

    else if (type === 'long') {
        skeletonType = <Textarea value='' margin={0}  border='2px' isDisabled height='30px' />
    }

    else if (type === 'date') {
        skeletonType = <Input value='dia / mês / ano' border='2px' isDisabled height='30px' />
    }

    else if (type === 'check') {
        skeletonType = 
                        <Box>
                        <ListOfOptions 
                            addOptions={addOptions}
                            id={id}
                            direction='column'
                            input={<Checkbox isDisabled marginRight={2}/>}
                            defaultOption={defaultOption}
                        />
                        </Box>
    }

    else if (type === 'choice') {
        skeletonType = 
                        <Box>
                        <ListOfOptions 
                            addOptions={addOptions}
                            id={id}
                            direction='column'
                            input={<Radio isDisabled marginRight={2}/>}
                            defaultOption={defaultOption}
                        />
                        </Box>
    }

    else if (type === 'linear') {
        skeletonType = 
                        <Box>
                        <Linear defaultOption={defaultOption} addOptions={addOptions} id={id} />
                        </Box>
    }

    const MenuType = () => (
        <Box
            top='-20px'
            right='40px'
            position='absolute'
        >
            <Menu>
                {({ isOpen }) => (
                    <>
                    <MenuButton variant='outline' isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                        {type}
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => handleChangeType('short', id)}>Short</MenuItem>
                        <MenuItem onClick={() => handleChangeType('long', id)}>Long</MenuItem>
                        <MenuItem onClick={() => handleChangeType('date', id)}>Date</MenuItem>
                        <MenuItem onClick={() => handleChangeType('check', id)}>Check</MenuItem>
                        <MenuItem onClick={() => handleChangeType('choice', id)}>Choice</MenuItem>
                        <MenuItem onClick={() => handleChangeType('linear', id)}>Linear</MenuItem>
                    </MenuList>
                    </>
                )}
            </Menu>
        </Box>
    )

    return (
        <Box marginTop={10} marginBottom='1.5vh'
            borderWidth="1px" 
            rounded='md'
            paddingTop='0.5rem'
            paddingBottom='0.5rem'
            paddingLeft='1rem'
            paddingRight='1rem'
        >
            <Editable defaultValue={ label } 
                    marginBottom='-5px'
                    bgSize='100%'
                    onChange={(newValue) => handleChangeValue(newValue, id)}>
                <EditablePreview />
                <EditableInput />
                { skeletonType }
                <MyDivider />
                <Flex justifyContent='right'>
                    <RequiredButton />
                </Flex>
                <MenuType />
                <IconButton
                    top='-13px'
                    right='-24px'
                    position='absolute'
                    variant='unstyled'
                    isRound={true}
                    size='lg'
                    boxSize='30px'
                    aria-label='close' 
                    icon={<Icon as={IoMdCloseCircle} boxSize='30px' color='#ec4646' />} 
                    onClick={() => handleRemove(id)}
                />
            </Editable>
        </Box>
    )
}
