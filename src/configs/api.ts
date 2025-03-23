export const API_URL = "https://test.v5.pryaniky.com";

const getRoute = (route: string) => `${API_URL}${route}`;

export const API_ROUTES = {
  auth: getRoute("/ru/data/v3/testmethods/docs/login"),
  table: {
    get: getRoute("/ru/data/v3/testmethods/docs/userdocs/get"),
    update: (id: number | string) =>
      getRoute(`/ru/data/v3/testmethods/docs/userdocs/set/${id}`),
    create: getRoute("/ru/data/v3/testmethods/docs/userdocs/create"),
    delete: (id: number | string) =>
      getRoute(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`),
  },
};
