import { GridColDef } from "@mui/x-data-grid";
import { TableDataRowResponse } from "../../types/Responses";
import dayjs from "dayjs";

export const columns: GridColDef<TableDataRowResponse>[] = [
  {
    field: "companySigDate",
    headerName: "Company Sig Date",
    width: 150,
    renderCell: (params) => {
      return <div>{dayjs(params.row.companySigDate).format("DD.MM.YYYY")}</div>;
    },
  },
  {
    field: "companySignatureName",
    headerName: "Company Signature Name",
    width: 150,
  },
  { field: "documentName", headerName: "Document Name", width: 150 },
  { field: "documentStatus", headerName: "Document Status", width: 150 },
  { field: "documentType", headerName: "Document Type", width: 150 },
  { field: "employeeNumber", headerName: "Employee Number", width: 150 },
  {
    field: "employeeSigDate",
    headerName: "Employee Sig Date",
    width: 150,
    renderCell: (params) => {
      return <div>{dayjs(params.row.companySigDate).format("DD.MM.YYYY")}</div>;
    },
  },
  {
    field: "employeeSignatureName",
    headerName: "Employee Signature Name",
    width: 150,
  },
];
