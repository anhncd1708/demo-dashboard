import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Box,
  Link,
  Card,
  Stack,
  Button,
  Divider,
  TextField,
  Typography,
  IconButton,
  alpha,
  useTheme,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { useRouter } from "../../routes/hooks";

import { bgGradient } from "../../theme/css";

// import Logo from "src/components/logo";
import Iconify from "../../components/Iconify";
import { LoginAuthen } from "../../context/redux/action/action";

// ----------------------------------------------------------------------

export default function LoginView() {
  const token =
    "IEIpLceGWQw6gJ3991U29PDUXVQSULuVAaYO8v4000UouZKJXAFt0u7CaPfwSRDq";

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // let data = await LoginAuthen(formData.username, formData.password);
      let data = {
        id: 1,
        username: "admin",
        password: "admin",
        fullname: "Admin",
        created_at: "2024-05-01T00:00:00",
        updated_at: "2024-05-01T00:00:00",
        deleted_at: "2024-05-01T00:00:00",
        role: "ADMIN",
        email: "admin@gmail.com",
        active: true,
        photoURL: "../../assets/avatar/avatar_9.jpg",
      };
    
      if (data.username === formData.username) {
        Cookies.set("user", JSON.stringify(data));
        Cookies.set("token", token, { expires: 1 });
        router.push("/");
        setLoading(false);
      } else {
        setError("Sai tên đăng nhập hoặc tài khoản.");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setError("Đăng nhập thất bại.");
      setLoading(false);
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="username"
          value={formData.username}
          onChange={handleChange}
          label="Tài Khoản"
        />

        <TextField
          name="password"
          value={formData.password}
          onChange={handleChange}
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {error == "" ? (
        <></>
      ) : (
        <Stack sx={{ my: 3 }}>
          <Alert className="mb-3" severity="error">
            {error}
          </Alert>
        </Stack>
      )}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 3 }}
      >
        <Link variant="subtitle2" underline="hover">
          Quên mật khẩu?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        startIcon={loading && <CircularProgress />}
      >
        Đăng nhập
      </LoadingButton>
    </form>
  );

  return (
    <Box className="vh-100">
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography className="mb-3" variant="h4">
            Đăng nhập
          </Typography>

          {/* <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Bạn chưa có tài khoản?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Bắt đầu
            </Link>
          </Typography> */}

          {/* <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              HOẶC
            </Typography>
          </Divider> */}

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
