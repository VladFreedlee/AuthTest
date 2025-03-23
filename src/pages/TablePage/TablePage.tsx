import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./configs";
import { useTableStore } from "../../hooks/useTableStore";
import { useAuthStore } from "../../hooks/useAuthStore";

const TablePage: React.FC = () => {
  const { tableData, isLoading, isError, error, fetchTableData } =
    useTableStore();
  const { user } = useAuthStore();

  React.useEffect(() => {
    if (user) {
      fetchTableData(user);
    }
  }, [fetchTableData, user]);

  if (isError) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        loading={isLoading}
        rows={tableData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20]}
      />
    </Box>
  );
};

export default React.memo(TablePage);
