import * as React from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import axios from "axios";
import { API_ROUTES } from "../configs/api";
import { userSlice } from "../store/reducers/UserSlice";
import { ownLocalStorage } from "../models/LocaleStorageModel";
import { StorageKeys } from "../configs/storagekeys";
import { useNavigate } from "react-router-dom";
import { routerUrls } from "../configs/routes";

export const useAuthStore = () => {
  const { user, isLoading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setIsLoading, setUser, setError } = userSlice.actions;

  const isAuth = React.useMemo(() => !!user, [user]);

  const isError = React.useMemo(() => !!error, [error]);

  const clearError = React.useCallback(() => {
    dispatch(setError(null));
  }, [dispatch, setError]);

  const setToken = React.useCallback(
    (token: string | null) => {
      if (token) {
        ownLocalStorage.setItem(StorageKeys.token, token);
        dispatch(setUser(token));
      } else {
        ownLocalStorage.removeItem(StorageKeys.token);
        dispatch(setUser(null));
      }
    },
    [dispatch, setUser]
  );

  const setIsLoadingState = React.useCallback(
    (isLoading: boolean) => {
      dispatch(setIsLoading(isLoading));
    },
    [dispatch, setIsLoading]
  );

  const login = React.useCallback(
    async (username: string, password: string) => {
      if (isLoading) {
        return;
      }

      dispatch(setIsLoading(true));

      await axios
        .post<{
          data: { token: string };
          error_text?: string;
          error_code: number;
        }>(API_ROUTES.auth, {
          username,
          password,
        })
        .then(({ data }) => {
          const errorText = data.error_text;

          if (data.error_code !== 0) {
            dispatch(setError(errorText));
          } else {
            setToken(data.data.token);

            clearError();

            navigate(routerUrls.table.create());
          }
        })
        .catch((error) => {
          dispatch(setError(error.message));
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    },
    [
      isLoading,
      dispatch,
      setIsLoading,
      setError,
      setToken,
      clearError,
      navigate,
    ]
  );

  const logout = React.useCallback(() => {
    setToken(null);
    navigate(routerUrls.auth.create());
  }, [setToken, navigate]);

  return {
    user,
    isAuth,
    isLoading,
    error,
    isError,
    login,
    logout,
    setToken,
    setIsLoadingState,
    clearError,
  };
};
