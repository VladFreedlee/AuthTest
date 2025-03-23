import { createSlice } from "@reduxjs/toolkit";
import { TableDataRowResponse } from "../../types/Responses";

export interface TableDataState {
  tableData: TableDataRowResponse[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TableDataState = {
  tableData: [],
  isLoading: false,
  error: null,
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
  },
});

export default tableDataSlice.reducer;
