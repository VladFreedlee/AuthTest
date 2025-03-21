import * as React from "react";
import { useNavigate } from "react-router-dom";
import { routerUrls } from "../../configs/routes";
import { ownLocalStorage } from "../../models/LocaleStorageModel";
import { StorageKeys } from "../../configs/storagekeys";

type Params<P> = {
  Component: React.ComponentType<P>;
  forAuthorizedUser?: boolean;
};

/* HOC для страниц доступных только авторизованным пользователям */
export const withAuth =
  <P extends Record<string, unknown>>({
    Component,
    forAuthorizedUser = true,
  }: Params<P>) =>
  (props: P) => {
    const navigate = useNavigate();

    // React.useEffect(() => {
    //   let redirectLink = forAuthorizedUser ? "/" : routerUrls.table.create;

    //   // Если не получилось авторизоваться, то сохраняем урл
    //   if (forAuthorizedUser) {
    //     localStorage.setItem(
    //       StorageKeys.savedUrl,
    //       window.location.pathname + window.location.search
    //     );
    //   }

    //   // Редиректим на сохраненный урл или на список лотов со страницы логина
    //   if (!forAuthorizedUser) {
    //     const savedUrl = ownLocalStorage.getItem(StorageKeys.savedUrl);
    //     redirectLink = savedUrl || routerUrls.table.create();

    //     if (savedUrl) {
    //       ownLocalStorage.removeItem(StorageKeys.savedUrl);
    //     }
    //   }

    //   navigate(redirectLink as string);
    // }, [navigate]);

    return <Component {...props} />;
  };
