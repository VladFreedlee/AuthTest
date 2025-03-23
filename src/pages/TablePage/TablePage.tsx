import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { columns } from "./configs";
import { useTableStore } from "../../hooks/useTableStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import { Button } from "@mui/material";
import { TableDataRowResponse } from "../../types/Responses";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { DeleteModal } from "./DeleteModal";
import { EditDrawer } from "./EditDrawer";

import styles from "./TablePage.module.scss";

const TablePage: React.FC = () => {
  const {
    tableData,
    isLoading,
    isError,
    error,
    fetchTableData,
    handleOpenDeleteModal,
    handleOpenEditDrawer,
  } = useTableStore();
  const { user } = useAuthStore();

  React.useEffect(() => {
    if (user) {
      fetchTableData(user);
    }
  }, [fetchTableData, user]);

  const columnsWithActions = React.useMemo<
    GridColDef<TableDataRowResponse>[]
  >(() => {
    return [
      ...columns,
      {
        field: "actions",
        headerName: "Actions",
        width: 250,
        editable: false,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <Box className={styles.table__actions}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<EditIcon />}
                onClick={() => handleOpenEditDrawer(params.row)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                endIcon={<DeleteIcon />}
                onClick={() => handleOpenDeleteModal(params.row)}
              >
                Delete
              </Button>
            </Box>
          );
        },
      },
    ];
  }, [handleOpenDeleteModal, handleOpenEditDrawer]);

  if (isError) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box className={styles.table}>
      <Box className={styles.table__header}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenEditDrawer(null)}
          endIcon={<AddIcon />}
        >
          Create
        </Button>
      </Box>
      <DataGrid
        loading={isLoading}
        rows={tableData}
        columns={columnsWithActions}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20]}
      />
      <DeleteModal />
      <EditDrawer />
    </Box>
  );
};

export default React.memo(TablePage);
