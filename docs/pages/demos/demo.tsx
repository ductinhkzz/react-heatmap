import React from 'react';
import { ReactHeatmap } from 'react-heatmap';
import { Tooltip as ReactTooltip } from 'react-tooltip';

function shiftDate(date: Date, numDays: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count: number) {
  const arr: number[] = [];
  for (let idx = 0; idx < count; idx += 1) {
    arr.push(idx);
  }
  return arr;
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomValues(count: number, date = new Date()) {
  return getRange(count).map((index) => {
    return {
      date: shiftDate(date, -index),
      count: getRandomInt(1, 3),
    };
  });
}

const Demo = () => {
  const values = generateRandomValues(400);
  const getTooltipDataAttrs = (value: any) => {
    if (!value || !value.date) {
      return null;
    }

    return {
      'data-tooltip-content': `${value.date.toISOString().slice(0, 10)} has count: ${value.count}`,
      'data-tooltip-id': 'tooltip',
    };
  };

  const handleClick = (value: any) => {
    alert(`You clicked on ${value.date.toISOString().slice(0, 10)} with count: ${value.count}`);
  };

  return (
    <div>
      <ReactHeatmap
        values={values}
        classForValue={(value: any) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={getTooltipDataAttrs}
        onClick={handleClick}
        showWeekdayLabels
        startDate={new Date(2024, 0, 1)}
        endDate={new Date(2024, 11, 31)}
      />
      <ReactHeatmap
        values={values}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-gitlab-${value.count}`;
        }}
        tooltipDataAttrs={getTooltipDataAttrs}
        onClick={handleClick}
        showWeekdayLabels
      />
      <ReactTooltip id='tooltip' />
    </div>
  );
};

export default Demo;
