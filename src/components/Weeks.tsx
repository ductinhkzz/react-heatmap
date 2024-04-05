import { CSS_PSEDUO_NAMESPACE, DAYS_IN_WEEK } from '../constants';
import { getRange } from '../helpers';
import { IValue, LayoutType, ValueCacheType } from '../types';
import Square, { SquareProps } from './Square';

interface WeeksProps extends Omit<SquareProps, 'squareCoordinates' | 'index' | 'value' | 'getClassNameForIndex'> {
  weeks: number[];
  valueCache: Record<number, ValueCacheType>;
  squareSizeWithGutter: number;
  layout: LayoutType;
  classForValue: (value?: IValue) => string;
}

const Weeks = ({ weeks, valueCache, squareSizeWithGutter, layout, classForValue, ...rest }: WeeksProps) => {
  const daysInWeek = getRange(DAYS_IN_WEEK);

  const getTransformForWeek = (weekIndex: number) => {
    if (layout === 'horizontal') {
      return `translate(${weekIndex * squareSizeWithGutter}, 0)`;
    }
    return `translate(0, ${weekIndex * squareSizeWithGutter})`;
  };

  const getSquareCoordinates = (dayIndex: number) => {
    if (layout === 'horizontal') {
      return [0, dayIndex * squareSizeWithGutter];
    }
    return [dayIndex * squareSizeWithGutter, 0];
  };

  const getValueForIndex = (index: number) => {
    if (valueCache[index]) {
      return valueCache[index].value;
    }
    return null;
  };
  const getClassNameForIndex = (index: number) => {
    if (valueCache[index]) {
      return valueCache[index].className;
    }
    return classForValue();
  };

  return weeks.map((weekIndex) => (
    <g key={weekIndex} transform={getTransformForWeek(weekIndex)} className={`${CSS_PSEDUO_NAMESPACE}week`}>
      {daysInWeek.map((dayIndex) => {
        const squareCoordinates = getSquareCoordinates(dayIndex);
        return (
          <Square
            key={dayIndex}
            index={weekIndex * DAYS_IN_WEEK + dayIndex}
            value={getValueForIndex(dayIndex)}
            squareCoordinates={squareCoordinates}
            getClassNameForIndex={getClassNameForIndex}
            {...rest}
          />
        );
      })}
    </g>
  ));
};

export default Weeks;
