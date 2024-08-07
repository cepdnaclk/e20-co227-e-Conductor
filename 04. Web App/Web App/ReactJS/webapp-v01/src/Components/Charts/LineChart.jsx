import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export function SimpleLineChart({pData, uData, xLabels}) {
  return (
    <LineChart
      series={[
        { data: pData, label: 'pv' },
        { data: uData, label: 'uv' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}
