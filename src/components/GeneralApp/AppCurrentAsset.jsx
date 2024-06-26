import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, useTheme, styled } from '@mui/material';
// utils
import { fNumber } from '../../util/formatNumber';
//
import { BaseOptionChart } from '../Chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(5),
    '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible'
    },
    '& .apexcharts-legend': {
        height: LEGEND_HEIGHT,
        alignContent: 'center',
        position: 'relative !important',
        borderTop: `solid 1px ${theme.palette.divider}`,
        top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
    }
}));

// ----------------------------------------------------------------------

const CHART_DATA = [150, 53, 230, 79, 20];


export default function AppCurrentAsset() {
    const theme = useTheme();

    const chartOptions = merge(BaseOptionChart(), {
        colors: [
            theme.palette.primary.lighter,
            theme.palette.primary.light,
            theme.palette.primary.main,
            theme.palette.primary.dark
        ],
        labels: ['BĐS', 'TS CỐ ĐỊNH', 'TS TÀI CHÍNH', 'TS VÔ HÌNH', 'KHÁC'],
        stroke: { colors: [theme.palette.background.paper] },
        legend: { floating: true, horizontalAlign: 'center' },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName) => fNumber(seriesName),
                title: {
                    formatter: (seriesName) => `#${seriesName}`
                }
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '90%',
                    labels: {
                        value: {
                            formatter: (val) => fNumber(val)
                        },

                    }
                }
            }
        }
    });

    return (
        <Card>
            <CardHeader title="THỐNG KÊ TÀI SẢN" />
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart type="donut" series={CHART_DATA} options={chartOptions} height={280} />
            </ChartWrapperStyle>
        </Card>
    );
}
