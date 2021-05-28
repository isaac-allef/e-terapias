import Icon from "@chakra-ui/icon";
import { Link as LinkChakra, Box, Stack, Flex } from "@chakra-ui/layout"
import Link from "next/link";
import { AiFillCopy } from "react-icons/ai";
import { IoIosJournal, IoIosPeople } from "react-icons/io";
import { RiPsychotherapyFill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { IoSettingsSharp } from "react-icons/io5";

function Item({ title, link, icon, ...props }) {
    return (
		<Link href={link}>
			<LinkChakra
				textColor='#696969'
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
  
  function MyMenu({ manager }) {
    return (
		<>
		{
			manager ? 
			<Stack boxShadow='xl' spacing={0} height='100%'>
				<Item marginTop='3rem' title='Dashboard' link='/new/dashboard' icon={<Icon as={VscGraph} />} />
				<Item title='Field journals' link='/new/fieldJournalList' icon={<Icon as={IoIosJournal} />} />
				<Item title='Templates' link='/new/templateList' icon={<Icon as={AiFillCopy} />} />
				<Item title='Moderators' link='/new/moderatorList' icon={<Icon as={IoIosPeople} />} />
				<Item title='Etherapies' link='/new/etherapyList' icon={<Icon as={RiPsychotherapyFill} />} />
				<Item title='Settings' link='/new/settings' icon={<Icon as={IoSettingsSharp} />} />
			</Stack>
			:
			<Stack boxShadow='xl' spacing={0} height='100%'>
				<Item marginTop='3rem' title='Field journals' link='/new/myFieldJournalList' icon={<Icon as={IoIosJournal} />} />
				<Item title='Perfil' link='/new/perfil' icon={<Icon as={BsFillPersonFill} />} />
			</Stack>
		}
    </>)
  }
  
export default MyMenu;