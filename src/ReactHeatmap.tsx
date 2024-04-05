import { MonthLabel, WeekdayLabels } from './components';
import Weeks from './components/Weeks';
import {
  CSS_PSEDUO_NAMESPACE,
  DAYS_IN_WEEK,
  DAY_LABELS,
  MILLISECONDS_IN_ONE_DAY,
  MONTH_LABELS,
  MONTH_LABEL_GUTTER_SIZE,
  MONTH_LABEL_SIZE,
  SQUARE_SIZE,
  VERTICAL_OFFSET,
  WEEK_DAY_LABEL_SIZE,
} from './constants';
import { convertToDate, dateNDaysAgo, getBeginningTimeForDate, getRange, shiftDate } from './helpers';
import { IValue, ReactHeatmapProps, ValueCacheType } from './types';

import './styles.css';

function ReactHeatmap({
  layout = 'horizontal',
  values = [],
  startDate = dateNDaysAgo(200),
  endDate = new Date(),
  gutterSize = 1,
  showMonthLabels = true,
  showWeekdayLabels = true,
  showOutOfRangeDays = false,
  monthLabels = MONTH_LABELS,
  weekdayLabels = DAY_LABELS,
  tooltipDataAttrs,
  titleForValue,
  classForValue = (value) => (value ? 'color-filled' : 'color-empty'),
  onClick,
  onMouseOver,
  onMouseLeave,
  transformDayElement,
}: ReactHeatmapProps) {
  const _endDate = getBeginningTimeForDate(convertToDate(endDate));
  const timeDiff = _endDate.getTime() - convertToDate(startDate).getTime();
  const dateDifferenceInDays = Math.ceil(timeDiff / MILLISECONDS_IN_ONE_DAY);

  const _startDate = shiftDate(_endDate, -dateDifferenceInDays + 1); // +1 because endDate is inclusive
  const numEmptyDaysAtStart = _startDate.getDay();
  const numEmptyDaysAtEnd = DAYS_IN_WEEK - 1 - _endDate.getDay();

  const weekCount = Math.ceil((dateDifferenceInDays + numEmptyDaysAtStart + numEmptyDaysAtEnd) / DAYS_IN_WEEK);
  const squareSizeWithGutter = SQUARE_SIZE + gutterSize;
  const weekWidth = DAYS_IN_WEEK * squareSizeWithGutter;

  const weekDayLabelSize = showWeekdayLabels ? WEEK_DAY_LABEL_SIZE[layout] : 0;
  const monthLabelSize = showMonthLabels ? MONTH_LABEL_SIZE[layout] : 0;

  const width = weekCount * squareSizeWithGutter - (gutterSize - weekDayLabelSize);
  const height = weekWidth + (monthLabelSize - gutterSize);

  const dataLayout = {
    horizontal: {
      viewBox: `0 0 ${width} ${height}`,
      transformForMonthLabels: `translate(${weekDayLabelSize}, 0)`,
      transformForAllWeeks: `translate(${weekDayLabelSize}, ${monthLabelSize})`,
      transformForWeekdayLabels: `translate(${SQUARE_SIZE}, ${monthLabelSize})`,
      monthLabelCoordinates: [squareSizeWithGutter, monthLabelSize - MONTH_LABEL_GUTTER_SIZE],
    },
    vertical: {
      viewBox: `0 0 ${height} ${width}`,
      transformForMonthLabels: `translate(${weekWidth + MONTH_LABEL_GUTTER_SIZE}, ${weekDayLabelSize})`,
      transformForAllWeeks: `translate(0, ${weekDayLabelSize})`,
      transformForWeekdayLabels: undefined,
      monthLabelCoordinates: [0, squareSizeWithGutter + VERTICAL_OFFSET],
    },
  };

  const startDateWithEmptyDays = shiftDate(_startDate, -numEmptyDaysAtStart);

  const getTooltipDataAttrsForValue = (value?: IValue) => {
    if (typeof tooltipDataAttrs === 'function') {
      return tooltipDataAttrs(value);
    }
    return tooltipDataAttrs;
  };
  const valueCache = values.reduce((memo: Record<number, ValueCacheType>, value: IValue) => {
    const date = convertToDate(value.date).getTime();
    const index = Math.floor((date - startDateWithEmptyDays.getTime()) / MILLISECONDS_IN_ONE_DAY);

    memo[index] = {
      value,
      className: classForValue(value),
      title: titleForValue?.(value),
      tooltipDataAttrs: getTooltipDataAttrsForValue(value),
    };
    return memo;
  }, {});

  const handleClick = (value: IValue | null) => {
    if (onClick) {
      onClick(value);
    }
  };

  const handleMouseOver = (e: any, value: IValue | null) => {
    if (onMouseOver) {
      onMouseOver(e, value);
    }
  };

  const handleMouseLeave = (e: any, value: IValue | null) => {
    if (onMouseLeave) {
      onMouseLeave(e, value);
    }
  };
  const getTooltipDataAttrsForIndex = (index: number) => {
    if (valueCache[index]) {
      return valueCache[index].tooltipDataAttrs;
    }
    return getTooltipDataAttrsForValue();
  };
  const getTitleForIndex = (index: number) => {
    if (valueCache[index]) {
      return valueCache[index].title;
    }
    return titleForValue ? titleForValue() : null;
  };

  return (
    <svg className='react-heatmap' viewBox={dataLayout[layout].viewBox}>
      {showMonthLabels && (
        <g transform={dataLayout[layout].transformForMonthLabels} className={`${CSS_PSEDUO_NAMESPACE}month-labels`}>
          <MonthLabel
            startDateWithEmptyDays={startDateWithEmptyDays}
            weekCount={weekCount}
            monthLabels={monthLabels}
            layout={layout}
            monthLabelCoordinates={dataLayout[layout].monthLabelCoordinates}
          />
        </g>
      )}
      <g transform={dataLayout[layout].transformForAllWeeks} className={`${CSS_PSEDUO_NAMESPACE}all-weeks`}>
        <Weeks
          weeks={getRange(weekCount)}
          valueCache={valueCache}
          squareSizeWithGutter={squareSizeWithGutter}
          layout={layout}
          numEmptyDaysAtStart={numEmptyDaysAtStart}
          dateDifferenceInDays={dateDifferenceInDays}
          showOutOfRangeDays={showOutOfRangeDays}
          classForValue={classForValue}
          handleClick={handleClick}
          handleMouseLeave={handleMouseLeave}
          handleMouseOver={handleMouseOver}
          getTooltipDataAttrsForIndex={getTooltipDataAttrsForIndex}
          getTitleForIndex={getTitleForIndex}
          transformDayElement={transformDayElement}
        />
      </g>
      {showWeekdayLabels && (
        <g transform={dataLayout[layout].transformForWeekdayLabels} className={`${CSS_PSEDUO_NAMESPACE}weekday-labels`}>
          <WeekdayLabels weekdayLabels={weekdayLabels} layout={layout} gutterSize={gutterSize} />
        </g>
      )}
    </svg>
  );
}

export { ReactHeatmap };
