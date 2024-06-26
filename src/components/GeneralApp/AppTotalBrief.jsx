import { Icon } from '@iconify/react';
import { ApexOptions } from 'apexcharts';
import Iconify from '../Iconify';
import ReactApexChart from 'react-apexcharts';
// import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
// import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { Box, Card, Typography, Stack, alpha, useTheme, styled } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../util/formatNumber';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
    width: 24,
    height: 24,
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.success.main,
    backgroundColor: alpha(theme.palette.success.main, 0.16)
}));

// ----------------------------------------------------------------------

const PERCENT = 0.15;
const TOTAL_BRIEF = 3876;
const CHART_DATA = [{ data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54] }];

export default function AppTotalBrief() {
    const theme = useTheme();

    const chartOptions = {
        colors: [theme.palette.info.main],
        chart: { sparkline: { enabled: true } },
        plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
        labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
        tooltip: {
            x: { show: false },
            y: {
                formatter: (seriesName) => fNumber(seriesName),

                title: {
                    formatter: (seriesName) => `#${seriesName}`
                }
            },
            marker: { show: false }
        }
    };

    return (
        <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2">Tổng số hồ sơ</Typography>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
                    <IconWrapperStyle
                        sx={{
                            ...(PERCENT < 0 && {
                                color: 'error.main',
                                bgcolor: alpha(theme.palette.error.main, 0.16)
                            })
                        }}
                    >
                        {/* <Icon width={16} height={16} icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill} /> */}
                        <Iconify icon={PERCENT >= 0 ? `mingcute:trending-up-fill` : `mingcute:trending-down-fill`}></Iconify>
                    </IconWrapperStyle>
                    <Typography component="span" variant="subtitle2">
                        {PERCENT > 0 && '+'}
                        {fPercent(PERCENT)}
                    </Typography>
                </Stack>

                <Typography variant="h3">{fNumber(TOTAL_BRIEF)}</Typography>
            </Box>

            <ReactApexChart
                type="bar"
                series={CHART_DATA}
                options={chartOptions}
                width={60}
                height={36}
            />
        </Card>
    );
}
