import { Link as RouterLink } from 'react-router-dom';
// material
import { Typography, Button, Card, CardContent, CardProps, styled } from '@mui/material';
import { SeoIllustration } from "../../assets"


// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.lighter,
    [theme.breakpoints.up('md')]: {
        height: '100%',
        display: 'flex',
        textAlign: 'left',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}));

// ----------------------------------------------------------------------


export default function AppWelcome({ displayName }) {
    return (
        <RootStyle>
            <CardContent
                sx={{
                    p: { md: 0 },
                    pl: { md: 5 },
                    color: 'grey.800'
                }}
            >
                <Typography gutterBottom variant="h4">
                    Mừng trở lại, {!displayName ? '...' : displayName}!
                </Typography>

                <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
                    Hãy nhớ kiểm tra những hồ sơ mới cần được xét duyệt
                </Typography>

                <Button variant="contained" to="/briefs" component={RouterLink}>
                    Hồ sơ
                </Button>
            </CardContent>
            <SeoIllustration
                sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' }
                }}
            />
        </RootStyle>
    );
}
