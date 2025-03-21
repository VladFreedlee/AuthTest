import { RouteSegment } from "./constants";

export const routerUrls = {
  root: "/",
  auth: {
    mask: `/${RouteSegment.auth}`,
    create: () => `/${RouteSegment.auth}`,
  },
  table: {
    mask: `/${RouteSegment.table}`,
    create: () => `/${RouteSegment.table}`,
  },
};
