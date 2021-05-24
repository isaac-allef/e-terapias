import Icon from "@chakra-ui/icon";
import { Link as LinkChakra, Box, Stack, Flex } from "@chakra-ui/layout"
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillCopy } from "react-icons/ai";
import { IoIosJournal, IoIosPeople } from "react-icons/io";
import { RiPsychotherapyFill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";

function Item({ title, link, icon, ...props }) {
    return (
		<Link href={link}>
			<LinkChakra
				textColor='white'
				padding='1rem'
				{...props}
			>
				<Flex>
					<Box marginRight='0.5rem'>
						{ icon }
					</Box>
					<Box>
						{ title }
					</Box>
				</Flex>
			</LinkChakra>
      </Link>
    )
  }
  
  function MyMenu(props) {
	const [userType, setUserType] = useState('');
      
    useEffect(() => {
        const entity = localStorage.getItem('@eterapias:entity');

        if (entity === 'manager') {
            setUserType('manager');
        } else if (entity === 'moderator') {
            setUserType('moderator');
        }
    }, []);
    return (
		<>
		{
			userType !== 'manager' ? 
			<Stack background='#6930c3' spacing={0} {...props} height='100%' borderRight='1px solid' borderColor='gray.300'>
				<Item marginTop='3rem' title='Dashboard' link='/administrator/dashboard' icon={<Icon as={VscGraph} />} />
				<Item title='Field journals' link='/new/fieldJournalList' icon={<Icon as={IoIosJournal} />} />
				<Item title='Templates' link='/new/templateList' icon={<Icon as={AiFillCopy} />} />
				<Item title='Moderators' link='/new/moderatorList' icon={<Icon as={IoIosPeople} />} />
				<Item title='Etherapies' link='/new/etherapyList' icon={<Icon as={RiPsychotherapyFill} />} />
			</Stack>
			:
			<Stack background='#6930c3' spacing={0} {...props} height='100%' borderRight='1px solid' borderColor='gray.300'>
				<Item marginTop='3rem' title='Field journals' link='/new/myFieldJournalList' icon={<Icon as={IoIosJournal} />} />
				<Item title='Perfil' link='/new/perfil' icon={<Icon as={BsFillPersonFill} />} />
			</Stack>
		}
    </>)
  }
  
export default MyMenu;