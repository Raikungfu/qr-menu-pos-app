import config from "@/configs";
import StatisticLayout from "@/layout/StatisticLayout";
import HeaderOnlyLayout from "@/layout/HeaderOnlyLayout";
import { Home, AtCounter, Order, Shop, Payment } from "@/pages";
import BestSeller from "@/pages/Statistic/BestSeller";
import Receipt from "@/pages/Receipt";
import Revenue from "@/pages/Revenue";
import Setting from "@/pages/Setting";
import ChartReport from "@/pages/Statistic/ChartReport";
import Overview from "@/pages/Statistic/Overview";
import Topping from "@/pages/Topping";
import Login from "@/pages/Login";
import ErrorPage from "@/pages/Error";

const routes = [
  {
    path: config.routes.home,
    component: Home,
    layout: HeaderOnlyLayout,
    isAuth: true,
  },
  { path: config.routes.atcounter, component: AtCounter, isAuth: true },
  { path: config.routes.order, component: Order, isAuth: true },
  { path: config.routes.revenue, component: Revenue, isAuth: true },
  { path: config.routes.shop, component: Shop, isAuth: true },
  { path: config.routes.login, component: Login, layout: null, isAuth: false },
  {
    path: config.routes.overview,
    component: Overview,
    layout: StatisticLayout,
    isAuth: true,
  },
  {
    path: config.routes.business,
    component: ChartReport,
    layout: StatisticLayout,
    isAuth: true,
  },
  { path: config.routes.overview, component: Overview, isAuth: true },
  {
    path: config.routes.payment,
    component: Payment,
    layout: null,
    isAuth: true,
  },
  { path: config.routes.setting, component: Setting, isAuth: true },
  {
    path: config.routes.bestseller,
    component: BestSeller,
    layout: StatisticLayout,
    isAuth: true,
  },
  {
    path: config.routes.receipt,
    component: Receipt,
    layout: StatisticLayout,
    isAuth: true,
  },
  {
    path: config.routes.topping,
    component: Topping,
    layout: StatisticLayout,
    isAuth: true,
  },
  {
    path: config.routes.other,
    component: ErrorPage,
    layout: StatisticLayout,
    isAuth: false,
  },
];

export { routes };
