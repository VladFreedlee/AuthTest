import { Button, TextField } from "@mui/material";
import * as React from "react";

import styles from "./AuthPage.module.scss";
import { useAuthStore } from "../../hooks/useAuthStore";

const AuthPage: React.FC = () => {
  const { login, error } = useAuthStore();

  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChangeUserName = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserName(e.target.value);
    },
    []
  );

  const handleChangePassword = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const handleLogin = React.useCallback(() => {
    login(userName, password);
  }, [userName, login, password]);

  return (
    <div className={styles.auth}>
      <TextField
        label="Username"
        variant="standard"
        value={userName}
        onChange={handleChangeUserName}
        error={!!error}
        helperText={error}
      />
      <TextField
        label="Password"
        variant="standard"
        value={password}
        onChange={handleChangePassword}
        error={!!error}
        helperText={error}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default React.memo(AuthPage);
