export type TableDataRowResponse = {
  id: string;
  //строка содержащая дату и время в ISO формате
  companySigDate: string;
  //произвольная строка
  companySignatureName: string;
  //произвольная строка
  documentName: string;
  //произвольная строка
  documentStatus: string;
  //произвольная строка
  documentType: string;
  //произвольная строка
  employeeNumber: string;
  //строка содержащая дату и время в ISO формате
  employeeSigDate: string;
  //произвольная строка
  employeeSignatureName: string;
};

export type TableDataResponse = {
  data: TableDataRowResponse[];
  error_code: number;
  error_text: string;
};

export type AuthPayload = {
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};
