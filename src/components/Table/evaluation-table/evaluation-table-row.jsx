
import PropTypes from "prop-types";

import {
    Stack,
    TableRow,
    TableCell,
    Typography,
    IconButton,
    Popover,
    MenuItem,
    Modal,
    Box
} from "@mui/material";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { DefaultLayoutPlugin, defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Iconify from "../../Iconify/iconify";
import PDFViewer from "pdf-viewer-reactjs";
// ----------------------------------------------------------------------
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    mt: -5,
    transform: 'translate(-50%, -50%)',
    height: '85%',
    width: '80%',
    borderRadius: '15px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function BriefTableRow({
    selected,
    id,
    file_name,
    file_url,
    file_type,
    create_date,
    handleClick
}) {
    const newPlugin = defaultLayoutPlugin();

    const [open, setOpen] = useState(null);

    const navigate = useNavigate();

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };
    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell>{id}</TableCell>

                <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap>
                            {file_name}
                        </Typography>
                    </Stack>
                </TableCell>
                {/* <TableCell>{file_url ? file_url : "--"}</TableCell> */}
                <TableCell>{file_type ? file_type : "--"}</TableCell>
                <TableCell>
                    {moment(create_date).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="right">
                    <IconButton onClick={handleOpenMenu}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>


            <Modal
                open={open}
                onClose={handleCloseMenu}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Xem tài liệu
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {file_name}
                    </Typography>
                    {file_type == "pdf" ? (
                        <>
                            <iframe
                                src={
                                    (file_url)
                                }
                                style={{
                                    border: "none",
                                    width: "100%",
                                    height: "90%",
                                }}
                            ></iframe>
                        </>
                    ) : (
                        <iframe
                            src={
                                ("https://view.officeapps.live.com/op/embed.aspx?src=" + file_url)
                            }
                            style={{
                                border: "none",
                                width: "100%",
                                height: "90%",
                            }}
                        ></iframe>
                    )
                    }

                    {/* <iframe
                        src={
                            ("https://view.officeapps.live.com/op/embed.aspx?src=" + file_url)
                        }
                        style={{
                            border: "none",
                            width: "100%",
                            height: "90%",
                        }}
                    ></iframe> */}
                </Box>
            </Modal >
        </>
    );
}

BriefTableRow.propTypes = {
    selected: PropTypes.any,
    id: PropTypes.any,
    file_name: PropTypes.any,
    file_url: PropTypes.any,
    file_type: PropTypes.any,
    date_create: PropTypes.any,
    handleClick: PropTypes.func
}
