import * as React from "react";
import { Button } from "@mui/material";
import { useAuthStore } from "../../hooks/useAuthStore";
import LogoutIcon from "@mui/icons-material/Logout";

import styles from "./PageHeader.module.scss";

const PageHeader: React.FC = () => {
  const { logout, isAuth } = useAuthStore();

  if (!isAuth) {
    return null;
  }

  return (
    <div className={styles.header}>
      <Button onClick={logout} variant="outlined" endIcon={<LogoutIcon />}>
        Logout
      </Button>
    </div>
  );
};

export default React.memo(PageHeader);
