import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { StorageKeys } from "../configs/storagekeys";
import { ownLocalStorage } from "../models/LocaleStorageModel";

type Params<P> = {
  Component: React.ComponentType<P>;
};

/* HOC для страниц доступных только авторизованным пользователям */
export const withAuth =
  <P extends Record<string, unknown>>({ Component }: Params<P>) =>
  (props: P) => {
    const { isAuth, setToken } = useAuthStore();

    const content = React.useMemo(() => {
      const token = ownLocalStorage.getItem(StorageKeys.token);

      setToken(token);

      if (!isAuth && !token) {
        return <Navigate to="/" replace />;
      }

      return <Component {...props} />;
    }, [isAuth, props, setToken]);

    return content;
  };
