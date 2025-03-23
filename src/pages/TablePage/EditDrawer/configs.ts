export type FormData = {
  companySigDate: string | null;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeSigDate: string | null;
  employeeSignatureName: string;
  employeeNumber: string;
};

export const initialFormData: FormData = {
  companySigDate: null,
  companySignatureName: "",
  documentName: "",
  documentStatus: "",
  documentType: "",
  employeeSigDate: null,
  employeeSignatureName: "",
  employeeNumber: "",
};
