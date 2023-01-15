import { TopLevelCategory } from "../top-page/top-page.model";

type RouteMapType = Record<TopLevelCategory, string>;

export const CATEGORY_URL: RouteMapType = {
  0: '/courses',
  1: '/services',
  2: '/books',
  3: '/products',
}
