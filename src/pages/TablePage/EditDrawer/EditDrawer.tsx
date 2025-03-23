import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as React from "react";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { TableDataRowResponse } from "../../../types/Responses";
import { useTableStore } from "../../../hooks/useTableStore";
import { initialFormData, FormData } from "./configs";

import styles from "./EditDrawer.module.scss";

const EditDrawer: React.FC = () => {
  const {
    isOpenEditDrawer,
    selectedRow,
    handleCloseEditDrawer,
    editTableData,
    createTableData,
    isEditLoading,
  } = useTableStore();
  const { user } = useAuthStore();

  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof FormData, string>>
  >({});

  const isEdit = React.useMemo(() => !!selectedRow, [selectedRow]);

  React.useEffect(() => {
    if (selectedRow) {
      setFormData({
        companySigDate: selectedRow.companySigDate,
        companySignatureName: selectedRow.companySignatureName,
        documentName: selectedRow.documentName,
        documentStatus: selectedRow.documentStatus,
        documentType: selectedRow.documentType,
        employeeSigDate: selectedRow.employeeSigDate,
        employeeSignatureName: selectedRow.employeeSignatureName,
        employeeNumber: selectedRow.employeeNumber,
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [selectedRow]);

  const validateForm = React.useCallback((): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.companySigDate) newErrors.companySigDate = "Required";
    if (!formData.companySignatureName)
      newErrors.companySignatureName = "Required";
    if (!formData.documentName) newErrors.documentName = "Required";
    if (!formData.documentStatus) newErrors.documentStatus = "Required";
    if (!formData.documentType) newErrors.documentType = "Required";
    if (!formData.employeeSigDate) newErrors.employeeSigDate = "Required";
    if (!formData.employeeSignatureName)
      newErrors.employeeSignatureName = "Required";
    if (!formData.employeeNumber) newErrors.employeeNumber = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = React.useCallback(
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const handleDateChange = React.useCallback(
    (field: "companySigDate" | "employeeSigDate") => (date: Dayjs | null) => {
      setFormData((prev) => ({
        ...prev,
        [field]: date?.format("YYYY-MM-DDTHH:mm:ss.SSSZ") ?? null,
      }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const formattedData = React.useMemo<TableDataRowResponse>(
    () => ({
      id: selectedRow?.id ?? "",
      companySigDate: formData.companySigDate ?? "",
      companySignatureName: formData.companySignatureName,
      documentName: formData.documentName,
      documentStatus: formData.documentStatus,
      documentType: formData.documentType,
      employeeNumber: formData.employeeNumber,
      employeeSigDate: formData.employeeSigDate ?? "",
      employeeSignatureName: formData.employeeSignatureName,
    }),
    [formData, selectedRow?.id]
  );

  const handleSubmit = React.useCallback(() => {
    if (!validateForm() || !user) {
      return;
    }

    const drawerHandler = isEdit ? editTableData : createTableData;
    drawerHandler(user, formattedData);
  }, [
    validateForm,
    user,
    isEdit,
    editTableData,
    createTableData,
    formattedData,
  ]);

  if (!user) return null;

  return (
    <Drawer
      anchor="right"
      open={isOpenEditDrawer}
      onClose={handleCloseEditDrawer}
    >
      <Box className={styles.drawer}>
        <Typography variant="h6">{isEdit ? "Edit" : "Create"}</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Company Signature Date"
            onChange={handleDateChange("companySigDate")}
            format="DD.MM.YYYY"
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!errors.companySigDate,
                helperText: errors.companySigDate,
              },
            }}
            defaultValue={
              selectedRow?.companySigDate
                ? dayjs(selectedRow.companySigDate)
                : undefined
            }
          />
          <DatePicker
            label="Employee Signature Date"
            onChange={handleDateChange("employeeSigDate")}
            format="DD.MM.YYYY"
            defaultValue={
              selectedRow?.employeeSigDate
                ? dayjs(selectedRow.employeeSigDate)
                : undefined
            }
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!errors.employeeSigDate,
                helperText: errors.employeeSigDate,
              },
            }}
          />
        </LocalizationProvider>
        <TextField
          label="Company Signature Name"
          value={formData.companySignatureName}
          onChange={handleInputChange("companySignatureName")}
          error={!!errors.companySignatureName}
          helperText={errors.companySignatureName}
          required
          fullWidth
        />
        <TextField
          label="Document Name"
          value={formData.documentName}
          onChange={handleInputChange("documentName")}
          error={!!errors.documentName}
          helperText={errors.documentName}
          required
          fullWidth
        />
        <TextField
          label="Document Status"
          value={formData.documentStatus}
          onChange={handleInputChange("documentStatus")}
          error={!!errors.documentStatus}
          helperText={errors.documentStatus}
          required
          fullWidth
        />
        <TextField
          label="Document Type"
          value={formData.documentType}
          onChange={handleInputChange("documentType")}
          error={!!errors.documentType}
          helperText={errors.documentType}
          required
          fullWidth
        />
        <TextField
          label="Employee Number"
          value={formData.employeeNumber}
          onChange={handleInputChange("employeeNumber")}
          error={!!errors.employeeNumber}
          helperText={errors.employeeNumber}
          required
          fullWidth
        />
        <TextField
          label="Employee Signature Name"
          value={formData.employeeSignatureName}
          onChange={handleInputChange("employeeSignatureName")}
          error={!!errors.employeeSignatureName}
          helperText={errors.employeeSignatureName}
          required
          fullWidth
        />
        <Box className={styles.drawer__footer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isEditLoading}
          >
            {isEditLoading ? "Loading..." : isEdit ? "Edit" : "Create"}
          </Button>
          <Button
            variant="outlined"
            onClick={handleCloseEditDrawer}
            disabled={isEditLoading}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default React.memo(EditDrawer);
