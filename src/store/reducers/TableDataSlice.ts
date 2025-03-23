import { createSlice } from "@reduxjs/toolkit";
import { TableDataRowResponse } from "../../types/Responses";

export interface TableDataState {
  tableData: TableDataRowResponse[];
  isLoading: boolean;
  error: string | null;
  isOpenDeleteModal: boolean;
  isOpenEditDrawer: boolean;
  selectedRow: TableDataRowResponse | null;
}

const initialState: TableDataState = {
  tableData: [],
  isLoading: false,
  error: null,
  isOpenDeleteModal: false,
  isOpenEditDrawer: false,
  selectedRow: null,
};

export const tableDataSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsOpenDeleteModal: (state, action) => {
      state.isOpenDeleteModal = action.payload;
    },
    setIsOpenEditDrawer: (state, action) => {
      state.isOpenEditDrawer = action.payload;
    },
    setSelectedRow: (state, action) => {
      state.selectedRow = action.payload;
    },
  },
});

export default tableDataSlice.reducer;
