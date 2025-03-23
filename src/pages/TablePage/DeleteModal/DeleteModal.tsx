import * as React from "react";
import { useTableStore } from "../../../hooks/useTableStore";
import { Box, Modal, Typography, Button } from "@mui/material";
import { useAuthStore } from "../../../hooks/useAuthStore";

import styles from "./DeleteModal.module.scss";

const DeleteModal: React.FC = () => {
  const {
    isOpenDeleteModal,
    isDeleteLoading,
    handleCloseDeleteModal,
    deleteTableData,
  } = useTableStore();
  const { user } = useAuthStore();

  const handleDelete = React.useCallback(() => {
    if (user) {
      deleteTableData(user);

      handleCloseDeleteModal();
    }
  }, [deleteTableData, handleCloseDeleteModal, user]);

  return (
    <Modal open={isOpenDeleteModal} onClose={handleCloseDeleteModal}>
      <Box className={styles.modal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to delete this item?
        </Typography>
        <Box className={styles.modal__buttons}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            loading={isDeleteLoading}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseDeleteModal}
            loading={isDeleteLoading}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default React.memo(DeleteModal);
