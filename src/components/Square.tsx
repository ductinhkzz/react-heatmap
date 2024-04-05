import { SQUARE_SIZE } from '../constants';
import { IValue } from '../types';

export interface SquareProps {
  index: number;
  numEmptyDaysAtStart: number;
  dateDifferenceInDays: number;
  showOutOfRangeDays: boolean;
  squareCoordinates: number[];
  value: IValue | null;
  handleClick: (value: IValue | null) => void;
  handleMouseOver: (e: any, value: IValue | null) => void;
  handleMouseLeave: (e: any, value: IValue | null) => void;
  getTooltipDataAttrsForIndex: (index: number) => any;
  getTitleForIndex: (index: number) => string | null | undefined;
  getClassNameForIndex: (index: number) => string;
  transformDayElement?: (el: JSX.Element, value: IValue | null, index: number) => React.ReactNode;
}

const Square = ({
  index,
  numEmptyDaysAtStart,
  dateDifferenceInDays,
  showOutOfRangeDays,
  value,
  squareCoordinates,
  handleClick,
  handleMouseOver,
  handleMouseLeave,
  getTooltipDataAttrsForIndex,
  getTitleForIndex,
  getClassNameForIndex,
  transformDayElement,
}: SquareProps) => {
  const indexOutOfRange = index < numEmptyDaysAtStart || index >= numEmptyDaysAtStart + dateDifferenceInDays;
  if (indexOutOfRange && !showOutOfRangeDays) {
    return null;
  }
  const [x, y] = squareCoordinates;
  const rect = (
    <rect
      width={SQUARE_SIZE}
      height={SQUARE_SIZE}
      x={x}
      y={y}
      className={getClassNameForIndex(index)}
      onClick={() => handleClick(value)}
      onMouseOver={(e) => handleMouseOver(e, value)}
      onMouseLeave={(e) => handleMouseLeave(e, value)}
      {...getTooltipDataAttrsForIndex(index)}
    >
      <title>{getTitleForIndex(index)}</title>
    </rect>
  );
  return transformDayElement ? transformDayElement(rect, value, index) : rect;
};

export default Square;
