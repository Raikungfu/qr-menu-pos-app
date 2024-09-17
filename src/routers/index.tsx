import config from "@/configs";
import StatisticLayout from "@/layout/StatisticLayout";
import { Home, AtCounter, Order, Shop, Payment } from "@/pages";
import ChartReport from "@/pages/Statistic/ChartReport";
import Overview from "@/pages/Statistic/Overview";
const routes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.atcounter, component: AtCounter },
  { path: config.routes.order, component: Order },
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
  { path: config.routes.payment, component: Payment, layout: null },
];

export { routes };
