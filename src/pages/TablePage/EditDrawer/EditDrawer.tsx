import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as React from "react";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { TableDataRowResponse } from "../../../types/Responses";
import { useTableStore } from "../../../hooks/useTableStore";

import styles from "./EditDrawer.module.scss";

const EditDrawer: React.FC = () => {
  const {
    isOpenEditDrawer,
    selectedRow,
    handleCloseEditDrawer,
    editTableData,
    createTableData,
  } = useTableStore();
  const { user } = useAuthStore();

  const [companySigDate, setCompanySigDate] = React.useState<string | null>(
    null
  );
  const [companySignatureName, setCompanySignatureName] =
    React.useState<string>("");
  const [documentName, setDocumentName] = React.useState<string>("");
  const [documentStatus, setDocumentStatus] = React.useState<string>("");
  const [documentType, setDocumentType] = React.useState<string>("");
  const [employeeSigDate, setEmployeeSigDate] = React.useState<string | null>(
    null
  );
  const [employeeSignatureName, setEmployeeSignatureName] =
    React.useState<string>("");
  const [employeeNumber, setEmployeeNumber] = React.useState<string>("");

  React.useEffect(() => {
    if (selectedRow) {
      setCompanySigDate(selectedRow.companySigDate);
      setCompanySignatureName(selectedRow.companySignatureName);
      setDocumentName(selectedRow.documentName);
      setDocumentStatus(selectedRow.documentStatus);
      setDocumentType(selectedRow.documentType);
      setEmployeeSigDate(selectedRow.employeeSigDate);
      setEmployeeSignatureName(selectedRow.employeeSignatureName);
      setEmployeeNumber(selectedRow.employeeNumber);
    } else {
      setCompanySigDate(null);
      setCompanySignatureName("");
      setDocumentName("");
      setDocumentStatus("");
      setDocumentType("");
      setEmployeeSigDate(null);
      setEmployeeSignatureName("");
      setEmployeeNumber("");
    }
  }, [selectedRow]);

  const handleCompanySigDate = React.useCallback((e: Dayjs | null) => {
    setCompanySigDate(e?.format("YYYY-MM-DDTHH:mm:ss.SSSZ") ?? "");
  }, []);

  const handleEmploySigDate = React.useCallback((e: Dayjs | null) => {
    setEmployeeSigDate(e?.format("YYYY-MM-DDTHH:mm:ss.SSSZ") ?? "");
  }, []);

  const formattedData = React.useMemo<TableDataRowResponse>(() => {
    return {
      id: selectedRow?.id ?? "",
      companySigDate: companySigDate ?? "",
      companySignatureName,
      documentName,
      documentStatus,
      documentType,
      employeeNumber,
      employeeSigDate: employeeSigDate ?? "",
      employeeSignatureName,
    };
  }, [
    companySigDate,
    companySignatureName,
    documentName,
    documentStatus,
    documentType,
    employeeNumber,
    employeeSigDate,
    employeeSignatureName,
    selectedRow?.id,
  ]);

  const isEdit = React.useMemo(() => !!selectedRow, [selectedRow]);

  if (!user) {
    return null;
  }

  const drawerTitle = isEdit ? "Edit" : "Create";
  const drawerHandler = isEdit ? editTableData : createTableData;

  return (
    <Drawer
      anchor="right"
      open={isOpenEditDrawer}
      onClose={handleCloseEditDrawer}
    >
      <Box className={styles.drawer}>
        <Typography variant="h6">{drawerTitle}</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Company Signature Date"
            onChange={handleCompanySigDate}
            format="DD.MM.YYYY"
            slotProps={{ textField: { fullWidth: true } }}
            defaultValue={
              selectedRow?.companySigDate
                ? dayjs(selectedRow.companySigDate)
                : undefined
            }
          />
          <DatePicker
            label="Employee Signature Date"
            onChange={handleEmploySigDate}
            format="DD.MM.YYYY"
            defaultValue={
              selectedRow?.employeeSigDate
                ? dayjs(selectedRow.employeeSigDate)
                : undefined
            }
            slotProps={{ textField: { fullWidth: true } }}
          />
        </LocalizationProvider>
        <TextField
          label="Company Signature Name"
          value={companySignatureName}
          onChange={(e) => setCompanySignatureName(e.target.value)}
          required
        />
        <TextField
          label="Document Name"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          required
        />
        <TextField
          label="Document Status"
          value={documentStatus}
          onChange={(e) => setDocumentStatus(e.target.value)}
          required
        />
        <TextField
          label="Document Type"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          required
        />
        <TextField
          label="Employee Number"
          value={employeeNumber}
          onChange={(e) => setEmployeeNumber(e.target.value)}
          required
        />
        <TextField
          label="Employee Signature Name"
          value={employeeSignatureName}
          onChange={(e) => setEmployeeSignatureName(e.target.value)}
          required
        />
        <Box className={styles.drawer__footer}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => drawerHandler(user, formattedData)}
          >
            {selectedRow ? "Edit" : "Create"}
          </Button>
          <Button variant="outlined" onClick={handleCloseEditDrawer}>
            Close
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default React.memo(EditDrawer);
