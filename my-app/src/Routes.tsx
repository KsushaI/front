export const ROUTES = {
    HOME: "/",
    VISAS: "/visas",
    REGISTRATION: "/registration",
    TROLLY: "/trolly",
    AUTH: "/auth",
    ACC: '/account',
    APPS: '/apps',
    SERVICES: "/services",
    PAGE404: "/404",
    PAGE403: "/403"
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    VISAS: "Визы",
    REGISTRATION: "Регистрация",
    AUTH: "Вход",
    TROLLY: "Корзина",
    ACC: 'Личный кабинет',
    APPS: 'Мои заявки',
    SERVICES: "Услуги",
    PAGE404: "404",
    PAGE403: "403"
  };