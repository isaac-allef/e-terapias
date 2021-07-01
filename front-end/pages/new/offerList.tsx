import { Flex, Heading, LinkBox, LinkOverlay, Text, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MyMenu from "../../components/new/MyMenu";
import Layout from "../../components/shared/Layout";
import MyTitle from "../../components/shared/MyTitle";
import api, { cancelRequest } from "../../services/api";
import MyButton from "../../components/shared/MyButton";
import { MdLocalOffer } from "react-icons/md";
import Icon from "@chakra-ui/icon";
import { timestampToDateShort } from "../../utils/timestampFormat";
import { useRouter } from 'next/router';
import Link from "next/link";

export default function OfferList() {
  const router = useRouter();
  const [offers, setOffers] = useState([]);
  const [page , setPage] = useState(1);
  const per_page = 5;
  const [sort , setSort] = useState('updated_at');
  const [direction , setDirection] = useState('desc');
  const [search, setSearch] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        setToken(localStorage.getItem('@etherapies:token'));
    }, []);

    useEffect(() => {
		if (token) {
			setLoading(true);
			getOffers({ 
				token, 
				page, 
				per_page, 
				sort: sort as 'name' | 'created_at' | 'updated_at', 
				direction: direction as 'asc' | 'desc',
			}).then(offers => {
				if (offers.toString() === '') {
					// router.push('/new/offerForm')
				} else {
					if (!localStorage.getItem('@etherapies:offerId')) {
						localStorage.setItem('@etherapies:offerId', offers[0].id)
					}
				}
				setOffers(offers);
			})
			setLoading(false);
			return () => cancelRequest();
		}
    }, [token, page, direction, sort, search]);

    return (
        <Layout menu={null} >
		
		<Flex justifyContent='space-between'>
			<MyTitle>Offers</MyTitle>
			
			<Link href={'/new/offerForm'}>
				<div><MyButton>New</MyButton></div>
			</Link>
		</Flex>
		<Wrap>
		{
			offers.map(offer => {
				return <LinkBox
					borderColor={localStorage.getItem('@etherapies:offerId') === offer.id ? 'blue.500' : 'gray.300'}
					textColor={localStorage.getItem('@etherapies:offerId') === offer.id ? 'blue.500' : 'black'}
					key={offer.id}
					as="article" 
					maxW="sm" p="5" 
					borderWidth="1px" 
					rounded="md" 
					margin='5px'
					_hover={{
						textColor: 'blue.500',
						boxShadow: 'lg',
					}}
					width='30vw'
					height='20vh'
				>
					<Heading size="md" my="2">
						{ <Icon as={MdLocalOffer} /> }
						<LinkOverlay 
							href={'/new/dashboard'} 
							onClick={() => {
								localStorage.setItem('@etherapies:offerId', offer.id)
							} } 
							marginLeft={'10px'}>
							{ offer.name }
						</LinkOverlay>
					</Heading>
					<Text>
						{ `dateStart: ${timestampToDateShort(offer.dateStart)}` }
					</Text>
					<Text>
						{ `dateEnd: ${timestampToDateShort(offer.dateEnd)}` }
					</Text>
				</LinkBox>
			})
		}
		</Wrap>
        </Layout>
    )
}

type loadParams ={
	token: string;
	page: number;
	per_page: number;
	sort?: 'name' | 'created_at' | 'updated_at';
    direction?: 'asc' | 'desc';
}
const getOffers = async ({ token, page, per_page, sort, direction }: loadParams): Promise<any> => {
	const response = await api.get('/offers', {
		params: {
			page,
			per_page,
			sort,
			direction,
		},
		headers: {
			'Authorization': `token ${token}`
		}
	});
	const offers = response.data;
	
	if (!offers) {
		return [];
	}

	return offers;
}