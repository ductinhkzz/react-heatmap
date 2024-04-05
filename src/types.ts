export interface IValue {
  date: Date;
  count?: number;
}

export type LayoutType = 'horizontal' | 'vertical';

type TooltipDataAttrsFuncType = (val?: IValue) => Record<string, string>;

export interface ReactHeatmapProps {
  layout?: LayoutType;
  values?: IValue[];
  startDate?: Date;
  endDate?: Date;
  gutterSize?: number;
  showMonthLabels?: boolean;
  showWeekdayLabels?: boolean;
  showOutOfRangeDays?: boolean;
  tooltipDataAttrs?: Record<string, string> | TooltipDataAttrsFuncType;
  monthLabels?: string[];
  weekdayLabels?: string[];
  titleForValue?: (value?: IValue) => string;
  classForValue?: (value?: IValue) => string;
  onClick?: (value?: IValue | null) => void;
  onMouseOver?: (e: any, value?: IValue | null) => void;
  onMouseLeave?: (e: any, value?: IValue | null) => void;
  transformDayElement?: (el: JSX.Element, value: IValue | null, index: number) => React.ReactNode;
}

export type ValueCacheType = {
  value: IValue;
  className: string;
  title?: string;
  tooltipDataAttrs?: Record<string, string>;
};

export interface MonthLabelProps {
  showMonthLabels: boolean;
  startDateWithEmptyDays: Date;
  weekCount: number;
  monthLabels: string[];
  getMonthLabelCoordinates: (weekIndex: number) => number[];
}
