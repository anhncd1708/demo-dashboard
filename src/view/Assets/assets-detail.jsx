import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Button,
  Tabs,
  Tab,
  ImageList,
  ImageListItem,
  useTheme,
} from "@mui/material";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import { createPortal } from "react-dom";

// Assume you have a function to fetch asset data
import { fetchAsset } from "../../mock/fakeAPI/assetAPI";

function LabeledInfo({ label, value }) {
  return (
    <Box mb={2}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value || "N/A"}</Typography>
    </Box>
  );
}

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`asset-tabpanel-${index}`}
      aria-labelledby={`asset-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ViewAssetDetail() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadAsset = async () => {
      const data = await fetchAsset(id);
      setAsset(data);
    };
    loadAsset();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/assets/edit/${id}`);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Render the Lightbox in a portal
  const renderLightbox = () => {
    if (!isOpen) return null;

    return createPortal(
      <Lightbox
        mainSrc={asset.images[photoIndex].img}
        nextSrc={asset.images[(photoIndex + 1) % asset.images.length].img}
        prevSrc={
          asset.images[
            (photoIndex + asset.images.length - 1) % asset.images.length
          ].img
        }
        onCloseRequest={() => setIsOpen(false)}
        onMovePrevRequest={() =>
          setPhotoIndex(
            (photoIndex + asset.images.length - 1) % asset.images.length
          )
        }
        onMoveNextRequest={() =>
          setPhotoIndex((photoIndex + 1) % asset.images.length)
        }
        imageTitle={asset.images[photoIndex].title}
        imageCaption={asset.images[photoIndex].title}
        reactModalStyle={{ overlay: { zIndex: theme.zIndex.appBar + 2 } }}
      />,
      document.body
    );
  };

  if (!asset) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Chi tiết tài sản
        </Typography>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Cập nhật
        </Button>
      </Box>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="asset detail tabs"
        >
          <Tab label="Thông tin sở hữu và sử dụng" />
          <Tab label="Thông tin tài sản" />
          <Tab label="Hình ảnh" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Thông tin chủ sở hữu
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Họ và tên chủ sở hữu"
                value={asset.ownerName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Năm sinh chủ sở hữu"
                value={asset.ownerBirthYear}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="CMND/CCCD chủ sở hữu"
                value={asset.ownerIdNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Địa chỉ thường trú chủ sở hữu"
                value={asset.ownerAddress}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Thông tin chuyển nhượng người sử dụng
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Họ và tên người được chuyển nhượng"
                value={asset.transfereeName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Năm sinh người được chuyển nhượng"
                value={asset.transfereeBirthYear}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="CMND/CCCD người được chuyển nhượng"
                value={asset.transfereeIdNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Địa chỉ thường trú người được chuyển nhượng"
                value={asset.transfereeAddress}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Ngày chuyển nhượng"
                value={asset.transferDate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Số hồ sơ chuyển nhượng"
                value={asset.transferFileNumber}
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Thông tin thửa đất
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo label="Thửa đất số" value={asset.landLotNumber} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo label="Tờ bản đồ số" value={asset.mapSheetNumber} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo label="Địa chỉ thửa đất" value={asset.landAddress} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo label="Diện tích đất" value={asset.landArea} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Hình thức sử dụng"
                value={asset.landUseForm}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Mục đích sử dụng đất"
                value={asset.landPurpose}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Thời hạn sử dụng đất"
                value={asset.landUseTerm}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Nguồn gốc sử dụng đất"
                value={asset.landOrigin}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Thông tin nhà ở
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo label="Loại nhà ở" value={asset.houseType} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo label="Địa chỉ nhà ở" value={asset.houseAddress} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Diện tích sàn xây dựng"
                value={asset.floorArea}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Diện tích xây dựng"
                value={asset.constructionArea}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo label="Kết cấu nhà" value={asset.houseStructure} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo label="Cấp (hạng) nhà ở" value={asset.houseGrade} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo label="Số tầng" value={asset.numberOfFloors} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Năm xây dựng"
                value={asset.constructionYear}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Diện tích nhà phụ (nếu có)"
                value={asset.auxiliaryArea}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Thời hạn sở hữu"
                value={asset.ownershipTerm}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Thông tin giấy chứng nhận
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Số giấy chứng nhận"
                value={asset.certificateNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Số vào sổ cấp GCN"
                value={asset.certificateBookNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Nơi cấp"
                value={asset.certificateIssuePlace}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabeledInfo
                label="Ngày cấp"
                value={asset.certificateIssueDate}
              />
            </Grid>
            <Grid item xs={12}>
              <LabeledInfo label="Ghi chú" value={asset.notes} />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Hình ảnh tài sản
          </Typography>
          {asset.images && asset.images.length > 0 ? (
            <>
              <ImageList
                sx={{
                  width: "100%",
                  height: 450,
                  overflowY: "hidden",
                }}
                cols={3}
                rowHeight={164}
              >
                {asset.images.map((item, index) => (
                  <ImageListItem
                    key={index}
                    onClick={() => {
                      setPhotoIndex(index);
                      setIsOpen(true);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={`${item.img}`}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        aspectRatio: "16/9",
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
              {renderLightbox()}
            </>
          ) : (
            <Typography>Không có hình ảnh nào cho tài sản này.</Typography>
          )}
        </TabPanel>
      </Paper>
    </Box>
  );
}
