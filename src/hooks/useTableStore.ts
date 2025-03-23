import axios from "axios";
import * as React from "react";
import { API_ROUTES } from "../configs/api";
import { useAppSelector, useAppDispatch } from "./reduxHooks";
import { tableDataSlice } from "../store/reducers/TableDataSlice";
import { TableDataResponse } from "../types/Responses";

export const useTableStore = () => {
  const { tableData, isLoading, error } = useAppSelector(
    (state) => state.tableData
  );
  const { setTableData, setIsLoading, setError } = tableDataSlice.actions;

  const dispatch = useAppDispatch();

  const isError = React.useMemo(() => !!error, [error]);

  const fetchTableData = React.useCallback(async (token: string) => {
    if (isLoading) {
      return;
    }

    dispatch(setIsLoading(true));

    await axios
      .get<TableDataResponse>(API_ROUTES.table.get, {
        headers: {
          "x-auth": token,
        },
      })
      .then(({ data }) => {
        if (data.error_code !== 0) {
          dispatch(setError(data.error_text));
        } else {
          const normalizedData = data.data.map((item) => ({
            ...item,
            companySigDate: new Date(item.companySigDate).toLocaleDateString(),
            employeeSigDate: new Date(
              item.employeeSigDate
            ).toLocaleDateString(),
          }));

          dispatch(setTableData(normalizedData));
        }
      })
      .catch((error) => {
        dispatch(setError(error.message));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { tableData, isLoading, error, isError, fetchTableData };
};
