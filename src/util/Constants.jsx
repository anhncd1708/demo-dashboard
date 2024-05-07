import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Report";

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
        icon: <PeopleAltIcon />,
        path: "/employees",
      },
      {
        label: "Khách hàng",
        icon: <ReportIcon />,
        path: "/profile-details",
      },
      {
        label: "Người môi giới",
        icon: <ReportIcon />,
        path: "/appraisal",
      },
      {
        label: "Biểu phí",
        icon: <ReportIcon />,
        path: "/appraisal-criteria",
      },
    ],
  },
  {
    label: "Hợp đồng thẩm định",
    icon: <GridViewRoundedIcon />,
    subItems: [
      {
        label: "Tiêu chí đánh giá",
        icon: <PeopleAltIcon />,
        path: "/evaluation",
      },
      {
        label: "Chi tiết hồ sơ",
        icon: <ReportIcon />,
        path: "/profile-details",
      },
      {
        label: "Thẩm định cá nhân",
        icon: <ReportIcon />,
        path: "/appraisal",
      },
      {
        label: "Tiêu chí thẩm định cá nhân",
        icon: <ReportIcon />,
        path: "/appraisal-criteria",
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
        label: "Khác",
        icon: <Person2OutlinedIcon />,
        path: "/other",
      },
    ],
  },

  // Add more manager-specific items
];
