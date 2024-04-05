import { getRange, shiftDate } from '../helpers';
import { CSS_PSEDUO_NAMESPACE, DAYS_IN_WEEK } from '../constants';
import { LayoutType } from '../types';

export interface MonthLabelProps {
  startDateWithEmptyDays: Date;
  weekCount: number;
  monthLabels: string[];
  layout: LayoutType;
  monthLabelCoordinates: number[];
}

const MonthLabel = ({
  startDateWithEmptyDays,
  weekCount,
  monthLabels,
  monthLabelCoordinates,
  layout,
}: MonthLabelProps) => {
  const weekRange = getRange(weekCount - 1); // don't render for last week, because label will be cut off
  return weekRange.map((weekIndex) => {
    const endOfWeek = shiftDate(startDateWithEmptyDays, (weekIndex + 1) * DAYS_IN_WEEK);
    const [x, y] = monthLabelCoordinates;
    const coordinates = {
      horizontal: {
        x: x * weekIndex,
        y,
      },
      vertical: {
        x,
        y: y * (weekIndex + 1),
      },
    };
    return endOfWeek.getDate() >= 1 && endOfWeek.getDate() <= DAYS_IN_WEEK ? (
      <text
        key={weekIndex}
        x={coordinates[layout].x}
        y={coordinates[layout].y}
        className={`${CSS_PSEDUO_NAMESPACE}month-label`}
      >
        {monthLabels[endOfWeek.getMonth()]}
      </text>
    ) : null;
  });
};

export { MonthLabel };
