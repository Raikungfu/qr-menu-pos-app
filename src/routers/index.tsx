import config from "@/configs";
import StatisticLayout from "@/layout/StatisticLayout";
import { Home, AtCounter, Order, Shop, Payment } from "@/pages";
import BestSeller from "@/pages/Statistic/BestSeller";
import Receipt from "@/pages/Receipt";
import Revenue from "@/pages/Revenue";
import Setting from "@/pages/Setting";
import ChartReport from "@/pages/Statistic/ChartReport";
import Overview from "@/pages/Statistic/Overview";
import Topping from "@/pages/Topping";
const routes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.atcounter, component: AtCounter },
  { path: config.routes.order, component: Order },
  { path: config.routes.revenue, component: Revenue },
  { path: config.routes.shop, component: Shop },
  {
    path: config.routes.overview,
    component: Overview,
    layout: StatisticLayout,
  },
  {
    path: config.routes.business,
    component: ChartReport,
    layout: StatisticLayout,
  },
  { path: config.routes.overview, component: Overview },
  { path: config.routes.payment, component: Payment },
  { path: config.routes.setting, component: Setting },
  {
    path: config.routes.bestseller,
    component: BestSeller,
    layout: StatisticLayout,
  },
  { path: config.routes.receipt, component: Receipt, layout: StatisticLayout },
  { path: config.routes.topping, component: Topping, layout: StatisticLayout },
];

export { routes };
