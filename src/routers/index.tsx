import config from "@/configs";
import { Home, AtCounter, Order, Shop } from "@/pages";
const routes = [
{path: config.routes.home, component: Home},
{path: config.routes.atcounter, component: AtCounter},
{path: config.routes.order, component: Order},
{path: config.routes.shop, component: Shop},
]

export { routes };