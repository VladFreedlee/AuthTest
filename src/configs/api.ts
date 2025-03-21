export const API_URL = "https://test.v5.pryaniky.com";

export const API_ROUTES = {
  auth: "/ru/data/v3/testmethods/docs/login",
  table: {
    get: "/ru/data/v3/testmethods/docs/userdocs/get",
    update: (id: number | string) =>
      `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
    create: "/ru/data/v3/testmethods/docs/userdocs/create",
    delete: (id: number | string) =>
      `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
  },
};
