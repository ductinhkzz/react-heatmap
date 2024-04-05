import { LayoutType } from './types';

export const MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;

export const DAYS_IN_WEEK = 7;

export const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const SQUARE_SIZE = 10;
export const MONTH_LABEL_GUTTER_SIZE = 4;
export const CSS_PSEDUO_NAMESPACE = 'react-heatmap-';

export const VERTICAL_OFFSET = -2;

export const WEEK_DAY_LABEL_SIZE: Record<LayoutType, number> = {
  horizontal: 30,
  vertical: SQUARE_SIZE * 1.5,
};

export const MONTH_LABEL_SIZE: Record<LayoutType, number> = {
  horizontal: SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE,
  vertical: 2 * (SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE),
};
