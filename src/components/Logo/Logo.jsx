// material

import { Box, BoxProps, Typography, useTheme } from '@mui/material';
import logo from "../../assets/logo/logo-web-2.png"

// ----------------------------------------------------------------------

export default function Logo({ sx, name }) {

    return (
        <div className='d-flex'>
            <Box sx={{ width: 40, height: 40, ...sx }}>
                <img src={logo} alt="Logo" />


            </Box>
            {name && <Typography variant='h6' sx={{ pt: 1, mt: 3, ml: 1 }}>ĐÔNG SÀI GÒN</Typography>}
        </div>
    );
}
