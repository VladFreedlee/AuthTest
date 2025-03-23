import axios from "axios";
import * as React from "react";
import { API_ROUTES } from "../configs/api";
import { useAppSelector, useAppDispatch } from "./reduxHooks";
import { tableDataSlice } from "../store/reducers/TableDataSlice";
import { TableDataResponse, TableDataRowResponse } from "../types/Responses";

export const useTableStore = () => {
  const {
    tableData,
    isLoading,
    isEditLoading,
    isDeleteLoading,
    error,
    isOpenDeleteModal,
    isOpenEditDrawer,
    selectedRow,
  } = useAppSelector((state) => state.tableData);

  const {
    setTableData,
    setIsLoading,
    setIsEditLoading,
    setIsDeleteLoading,
    setError,
    setIsOpenDeleteModal,
    setIsOpenEditDrawer,
    setSelectedRow,
  } = tableDataSlice.actions;

  const dispatch = useAppDispatch();

  const isError = React.useMemo(() => !!error, [error]);

  const handleOpenDeleteModal = React.useCallback(
    (row: TableDataRowResponse) => {
      dispatch(setIsOpenDeleteModal(true));
      dispatch(setSelectedRow(row));
    },
    [dispatch, setIsOpenDeleteModal, setSelectedRow]
  );

  const handleCloseDeleteModal = React.useCallback(() => {
    dispatch(setIsOpenDeleteModal(false));
    dispatch(setSelectedRow(null));
  }, [dispatch, setIsOpenDeleteModal, setSelectedRow]);

  const handleOpenEditDrawer = React.useCallback(
    (row: TableDataRowResponse | null) => {
      if (row) {
        dispatch(setSelectedRow(row));
      }

      dispatch(setIsOpenEditDrawer(true));
    },
    [dispatch, setIsOpenEditDrawer, setSelectedRow]
  );

  const handleCloseEditDrawer = React.useCallback(() => {
    dispatch(setIsOpenEditDrawer(false));
    dispatch(setSelectedRow(null));
  }, [dispatch, setIsOpenEditDrawer, setSelectedRow]);

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
          dispatch(setTableData(data.data));
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

  const deleteTableData = React.useCallback(
    async (token: string) => {
      if (isDeleteLoading || !selectedRow) {
        return;
      }

      dispatch(setIsDeleteLoading(true));

      await axios
        .delete(API_ROUTES.table.delete(selectedRow.id), {
          headers: {
            "x-auth": token,
          },
        })
        .then(({ data }) => {
          if (data.error_code !== 0) {
            dispatch(setError(data.error_text));
          }
        })
        .catch((error) => {
          dispatch(setError(error.message));
        })
        .finally(() => {
          dispatch(setIsDeleteLoading(false));
          handleCloseDeleteModal();
          fetchTableData(token);
        });
    },
    [
      dispatch,
      fetchTableData,
      handleCloseDeleteModal,
      isDeleteLoading,
      selectedRow,
      setError,
      setIsDeleteLoading,
    ]
  );

  const createTableData = React.useCallback(
    async (token: string, data: Partial<TableDataRowResponse>) => {
      if (isEditLoading) {
        return;
      }

      dispatch(setIsEditLoading(true));

      await axios
        .post(API_ROUTES.table.create, data, {
          headers: {
            "x-auth": token,
          },
        })
        .then(({ data }) => {
          if (data.error_code !== 0) {
            dispatch(setError(data.error_text));
          }
        })
        .catch((error) => {
          dispatch(setError(error.message));
        })
        .finally(() => {
          dispatch(setIsEditLoading(false));
          handleCloseEditDrawer();
          fetchTableData(token);
        });
    },
    [
      dispatch,
      fetchTableData,
      handleCloseEditDrawer,
      isEditLoading,
      setError,
      setIsEditLoading,
    ]
  );

  const editTableData = React.useCallback(
    async (token: string, data: TableDataRowResponse) => {
      if (isEditLoading) {
        return;
      }

      dispatch(setIsEditLoading(true));

      await axios
        .post(API_ROUTES.table.update(data.id), data, {
          headers: {
            "x-auth": token,
          },
        })
        .then(({ data }) => {
          if (data.error_code !== 0) {
            dispatch(setError(data.error_text));
          }
        })
        .catch((error) => {
          dispatch(setError(error.message));
        })
        .finally(() => {
          dispatch(setIsEditLoading(false));
          handleCloseEditDrawer();
          fetchTableData(token);
        });
    },
    [
      dispatch,
      fetchTableData,
      handleCloseEditDrawer,
      isEditLoading,
      setError,
      setIsEditLoading,
    ]
  );

  return {
    tableData,
    isLoading,
    isEditLoading,
    isDeleteLoading,
    error,
    isError,
    selectedRow,
    isOpenDeleteModal,
    isOpenEditDrawer,
    fetchTableData,
    deleteTableData,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleOpenEditDrawer,
    handleCloseEditDrawer,
    createTableData,
    editTableData,
  };
};
