import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Report";
import Iconify from "../components/Iconify";

import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CampaignIcon from "@mui/icons-material/Campaign";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DescriptionIcon from "@mui/icons-material/Description";
import DifferenceIcon from "@mui/icons-material/Difference";
import SaveAsIcon from "@mui/icons-material/SaveAs";

export const DISPLAY_LOADING = "DISPLAY_LOADING";
export const HIDE_LOADING = "HIDE_LOADING";
export const DOMAIN = "https://dummyjson.com";
export const TOKEN = "access_token";
export const STATUS_CODE = {
  SUCCESS: 200,
};

export const navData = [
  {
    label: "Thống kê",
    icon: <GridViewRoundedIcon />,
    path: "/",
  },
  {
    label: "Quản lý",
    icon: <GridViewRoundedIcon />,
    subItems: [
      {
        label: "Nhân viên",
        icon: (
          <Iconify
            icon="clarity:employee-solid"
            sx={{ width: 25, height: 25 }}
          />
        ),
        path: "/employees",
      },
      {
        label: "Khách hàng",
        icon: <Iconify icon="carbon:customer" sx={{ width: 25, height: 25 }} />,
        path: "/customers",
      },
      // {
      //   label: "Tình trạng hồ sơ vay",
      //   icon: (
      //     <AssessmentIcon
      //       icon="clarity:employee-solid"
      //       sx={{ width: 25, height: 25 }}
      //     />
      //   ),
      //   path: "/employees",
      // },
      // {
      //   label: "Báo cáo hồ sơ đến hạn",
      //   icon: (
      //     <ReportProblemOutlinedIcon
      //       icon="carbon:customer"
      //       sx={{ width: 25, height: 25 }}
      //     />
      //   ),
      //   path: "/customers",
      // },
      // {
      //   label: "Thông báo nhắc nợ",
      //   icon: (
      //     <CampaignIcon icon="carbon:customer" sx={{ width: 25, height: 25 }} />
      //   ),
      //   path: "/customers",
      // },
      // {
      //   label: "Người môi giới",
      //   icon: (
      //     <Iconify
      //       icon="tabler:layout-align-middle-filled"
      //       sx={{ width: 25, height: 25 }}
      //     />
      //   ),
      //   path: "/brokers",
      // },
      // {
      //   label: "Biểu phí",
      //   icon: <ReportIcon />,
      //   path: "/appraisal-criteria",
      // },
    ],
  },
  {
    label: "Tín dụng",
    icon: <GridViewRoundedIcon />,
    subItems: [
      {
        label: "Hồ sơ vay",
        icon: (
          <Iconify
            icon="clarity:clipboard-solid"
            sx={{ width: 25, height: 25 }}
          />
        ),
        path: "/loan-request",
      },
      {
        label: "Kế hoạch thẩm định",
        icon: (
          <DescriptionIcon
            icon="clarity:clipboard-solid"
            sx={{ width: 25, height: 25 }}
          />
        ),
        path: "/loan-request",
      },
      {
        label: "Hồ sơ thẩm định",
        icon: (
          <Iconify
            icon="fluent:clipboard-text-edit-20-filled"
            sx={{ width: 25, height: 25 }}
          />
        ),
        path: "/briefs",
      },
      {
        label: "Định giá tài sản bảo đảm",
        icon: (
          <Iconify icon="mdi:clipboard-person" sx={{ width: 25, height: 25 }} />
        ),
        path: "/personal-appraisal",
      },
      {
        label: "Xếp hạng tín dụng",
        icon: (
          <Iconify
            icon="mdi:clipboard-text-search"
            sx={{ width: 25, height: 25 }}
          />
        ),
        path: "/appraisal-criteria",
      },
      {
        label: "Phê duyệt tín dụng",
        icon: (
          <SaveAsIcon
            icon="clarity:clipboard-solid"
            sx={{ width: 25, height: 25 }}
          />
        ),
        path: "/loan-request",
      },
      {
        label: "Hợp đồng giải ngân",
        icon: (
          <DifferenceIcon
            icon="clarity:clipboard-solid"
            sx={{ width: 25, height: 25 }}
          />
        ),
        path: "/loan-request",
      },
    ],
  },
  {
    label: "Quản lý sau vay",
    icon: <GridViewRoundedIcon />,
    subItems: [
      {
        label: "Thông báo nhắc nợ",
        icon: <CampaignIcon />,
        path: "/appraisal-criteria",
      },
      {
        label: "Báo cáo hồ sơ đến hạn",
        icon: <ReportGmailerrorredIcon />,
        path: "/appraisal-criteria",
      },
    ],
  },
  {
    label: "Báo cáo quản lý",
    subItems: [
      {
        label: "Danh sách tài sản",
        icon: <MapsHomeWorkIcon />,
        path: "assets",
      },
      {
        label: "Danh sách hồ sơ đã duyệt",
        icon: <DocumentScannerIcon />,
        path: "briefs",
      },
      {
        label: "Danh sách hồ sơ chưa duyệt",
        icon: <ContentPasteSearchIcon />,
        path: "briefs",
      },
      {
        label: "Báo cáo về người môi giới",
        icon: <RecentActorsIcon />,
        path: "report_on_broker",
      },
      {
        label: "Báo cáo về nhân viên",
        icon: <ReportIcon />,
        path: "report_on_employee",
      },
    ],
  },
  {
    label: "Khác",
    subItems: [
      {
        label: "Mẫu tiêu chí đánh giá",
        icon: <SettingsIcon />,
        path: "/evaluation-form",
      },
      {
        label: "Quản lý độ ưu tiên",
        icon: <SettingsIcon />,
        path: "priority",
      },
    ],
  },

  // Add more manager-specific items
];
