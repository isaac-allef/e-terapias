import { Text, Center, Flex, Stack } from "@chakra-ui/layout";
import MyTitle from "../../components/shared/MyTitle";
import Layout from "../../components/shared/Layout";
import MyDivider from "../../components/shared/MyDivider";
import MyMenu from "../../components/new/MyMenu";
import Chart from "react-google-charts";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { timestampToDateShort } from "../../utils/timestampFormat";
import { Skeleton } from "@chakra-ui/skeleton";

export default function Dashboard() {
    const [token, setToken] = useState('');
    const [metricsDataChart, setMetricsDataChart] = useState(null);
    const [numberOfEtherapies, setNumberOfEtherapies] = useState();
    const [numberOfModerators, setNumberOfModerators] = useState();
    const [numberOfFieldJournals, setNumberOfFieldJournals] = useState();
    const [numberOfTemplates, setNumberOfTemplates] = useState();

    useEffect(() => {
        setToken(localStorage.getItem('@etherapies:token'));
    }, []);

    const parseMetricsToDataChart = (metrics) => {
        const { lastWeek, 
            beforeLastWeek, 
            threeWeeksAgo, 
            fourWeeksAgo 
        } = metrics.numberOfFieldJournalsLastFourWeeks;

        return [
            ['', 'Number of field journals'],
            [`${timestampToDateShort(fourWeeksAgo.begin)} - ${timestampToDateShort(fourWeeksAgo.end)}`, fourWeeksAgo.count],
            [`${timestampToDateShort(threeWeeksAgo.begin)} - ${timestampToDateShort(threeWeeksAgo.end)}`, threeWeeksAgo.count],
            [`${timestampToDateShort(beforeLastWeek.begin)} - ${timestampToDateShort(beforeLastWeek.end)}`, beforeLastWeek.count],
            [`${timestampToDateShort(lastWeek.begin)} - ${timestampToDateShort(lastWeek.end)}`, lastWeek.count],
        ]
    };

    useEffect(() => {
        if (token) {
            getMetrics(token).then(metrics => {
                setMetricsDataChart(parseMetricsToDataChart(metrics));
                const {
                    numberOfEtherapies,
                    numberOfModerators,
                    numberOfFieldJournals,
                    templatesNumber,
                } = metrics;

                setNumberOfEtherapies(numberOfEtherapies);
                setNumberOfModerators(numberOfModerators);
                setNumberOfFieldJournals(numberOfFieldJournals);
                setNumberOfTemplates(templatesNumber);
            });
        }
    }, [token]);

    return (
        <Layout menu={<MyMenu manager={true} itemSelected='dashboard' />}>
            <Center><MyTitle>DASHBOARD</MyTitle></Center>
            
            <Flex direction={'column'} alignItems='center'>
            {
                metricsDataChart ? 
                    <Chart
                        width={'60vw'}
                        height={'60vh'}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={metricsDataChart}
                        options={{
                        title: 'Number of field journals submited last four weeks',
                        chartArea: { width: '60%' },
                        colors: ['#0076FF'],
                        hAxis: {
                            title: 'Weeks',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Number of fields journals submited',
                        },
                        }}
                        legendToggle
                    />
                : 
                <Stack spacing={2} marginTop={4} marginBottom={4} width='70%' >
                    <Skeleton height={'8vh'} />
                    <Skeleton height={'8vh'} />
                    <Skeleton height={'8vh'} />
                    <Skeleton height={'8vh'} />
                    <Skeleton height={'8vh'} />
                </Stack>
            }
            <Flex marginTop='4vh' justifyContent='space-around' width='100%'>
                <Text>{`Number of etherapies: ${numberOfEtherapies}`}</Text>
                <Text>{`Number of moderators: ${numberOfModerators}`}</Text>
                <Text>{`Number of field journals: ${numberOfFieldJournals}`}</Text>
                <Text>{`Number of templates: ${numberOfTemplates}`}</Text>
            </Flex>
            </Flex>

            <MyDivider />
        </Layout>
    )
}

const getMetrics = async (token: string): Promise<any> => {
	const response = await api.get('/metrics', {
		params: {
			numberOfFieldJournalsLastFourWeeks: new Date(),
            offerId: localStorage.getItem('@etherapies:offerId'),
		},
		headers: {
			'Authorization': `token ${token}`
		}
	});
	const metrics = response.data;

	return metrics;
}