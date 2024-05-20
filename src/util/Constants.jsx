import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Report";
import Iconify from "../components/Iconify";

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
      {
        label: "Người môi giới",
        icon: (
          <Iconify
            icon="tabler:layout-align-middle-filled"
            sx={{ width: 25, height: 25 }}
          />
        ),
        path: "/brokers",
      },
      // {
      //   label: "Biểu phí",
      //   icon: <ReportIcon />,
      //   path: "/appraisal-criteria",
      // },
    ],
  },
  {
    label: "Hợp đồng thẩm định",
    icon: <GridViewRoundedIcon />,
    subItems: [
      {
        label: "Danh sách kế hoạch",
        icon: (
          <Iconify
            icon="clarity:clipboard-solid"
            sx={{ width: 25, height: 25 }}
          />
        ),
        path: "/appraisal-plans",
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
        label: "Thẩm định cá nhân",
        icon: (
          <Iconify icon="mdi:clipboard-person" sx={{ width: 25, height: 25 }} />
        ),
        path: "/personal-appraisal",
      },
      {
        label: "Tiêu chí thẩm định cá nhân",
        icon: (
          <Iconify
            icon="mdi:clipboard-text-search"
            sx={{ width: 25, height: 25 }}
          />
        ),
        path: "/appraisal-criteria",
      },
    ],
  },
  {
    label: "Báo cáo quản lý",
    subItems: [
      {
        label: "Danh sách tài sản",
        icon: <SettingsIcon />,
        path: "assets",
      },
      {
        label: "Danh sách hồ sơ",
        icon: <Person2OutlinedIcon />,
        path: "briefs",
      },
      {
        label: "Báo cáo về người môi giới",
        icon: <Person2OutlinedIcon />,
        path: "report_on_broker",
      },
      {
        label: "Báo cáo về nhân viên",
        icon: <Person2OutlinedIcon />,
        path: "report_on_employee",
      },
    ],
  },
  {
    label: "Ủy thác cho vay",
    subItems: [
      {
        label: "Ủy thác cho vay",
        icon: <SettingsIcon />,
        path: "loan-entrustment",
      },
      {
        label: "Hợp đồng ủy thác",
        icon: <Person2OutlinedIcon />,
        path: "trust-contract",
      },
      {
        label: "Hợp đồng cho vay",
        icon: <Person2OutlinedIcon />,
        path: "loan-contract",
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
      {
        label: "Khác",
        icon: <Person2OutlinedIcon />,
        path: "/other",
      },
    ],
  },

  // Add more manager-specific items
];
