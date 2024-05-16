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
        path: "/appraisal",
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
