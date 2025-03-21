import { Button, TextField } from "@mui/material";
import * as React from "react";

import styles from "./AuthPage.module.scss";

const AuthPage: React.FC = () => {
  return (
    <div className={styles.auth}>
      <TextField id="standard-basic" label="Email" variant="standard" />
      <TextField id="standard-basic" label="Password" variant="standard" />
      <Button variant="contained">Login</Button>
    </div>
  );
};

export default React.memo(AuthPage);
