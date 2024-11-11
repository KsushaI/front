export const ROUTES = {
    HOME: "/",
    VISAS: "/visas",
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    VISAS: "Визы",
  };