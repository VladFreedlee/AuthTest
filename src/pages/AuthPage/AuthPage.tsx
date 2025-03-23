import { Button, TextField, Box, Typography } from "@mui/material";
import * as React from "react";
import { useAuthStore } from "../../hooks/useAuthStore";

import styles from "./AuthPage.module.scss";

type FormData = {
  username: string;
  password: string;
};

type FormErrors = {
  username?: string;
  password?: string;
};

const initialFormData: FormData = {
  username: "",
  password: "",
};

const AuthPage: React.FC = () => {
  const { login, error: apiError, isLoading } = useAuthStore();
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [touched, setTouched] = React.useState<Record<keyof FormData, boolean>>(
    {
      username: false,
      password: false,
    }
  );

  const validateField = React.useCallback(
    (field: keyof FormData, value: string): string => {
      switch (field) {
        case "username": {
          if (!value.trim()) {
            return "Username is required";
          }
          return "";
        }
        case "password": {
          if (!value) {
            return "Password is required";
          }
          return "";
        }
        default:
          return "";
      }
    },
    []
  );

  const handleChange = React.useCallback(
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (touched[field]) {
        const error = validateField(field, value);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    },
    [touched, validateField]
  );

  const handleBlur = React.useCallback(
    (field: keyof FormData) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const error = validateField(field, formData[field]);
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [formData, validateField]
  );

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      login(formData.username, formData.password);
    },
    [formData, login]
  );

  const isFormValid = React.useMemo(() => {
    return formData.username.trim() !== "" && formData.password.length !== 0;
  }, [formData]);

  return (
    <Box component="form" onSubmit={handleSubmit} className={styles.auth}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="standard"
        value={formData.username}
        onChange={handleChange("username")}
        onBlur={handleBlur("username")}
        error={!!errors.username || !!apiError}
        helperText={errors.username || apiError}
        disabled={isLoading}
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="standard"
        value={formData.password}
        onChange={handleChange("password")}
        onBlur={handleBlur("password")}
        error={!!errors.password}
        helperText={errors.password}
        disabled={isLoading}
        required
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </Box>
  );
};

export default React.memo(AuthPage);
