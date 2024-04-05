import { CSS_PSEDUO_NAMESPACE, SQUARE_SIZE } from '../constants';
import { LayoutType } from '../types';

interface WeekdayLabelsProps {
  weekdayLabels: string[];
  layout: LayoutType;
  gutterSize: number;
}

const WeekdayLabels = ({ weekdayLabels, layout, gutterSize }: WeekdayLabelsProps) => {
  const className = {
    horizontal: `${CSS_PSEDUO_NAMESPACE}weekday-label`,
    vertical: `${CSS_PSEDUO_NAMESPACE}small-text} ${CSS_PSEDUO_NAMESPACE}weekday-label`,
  };

  const getWeekdayLabelCoordinates = (dayIndex: number) => {
    if (layout === 'horizontal') {
      return [0, (dayIndex + 1) * SQUARE_SIZE + dayIndex * gutterSize - SQUARE_SIZE / 4];
    }
    return [dayIndex * SQUARE_SIZE + dayIndex * gutterSize, SQUARE_SIZE];
  };

  return weekdayLabels.map((weekdayLabel, dayIndex: number) => {
    const [x, y] = getWeekdayLabelCoordinates(dayIndex);
    return (
      <text key={`${x}${y}`} x={x} y={y} className={className[layout]}>
        {weekdayLabel}
      </text>
    );
  });
};

export { WeekdayLabels };
