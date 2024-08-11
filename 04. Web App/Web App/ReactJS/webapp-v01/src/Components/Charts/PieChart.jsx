import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const size = {
  width: 400,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',        // Centers text horizontally
  dominantBaseline: 'middle',  // Centers text vertically
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    
    // Split the children (label) by line break (\n)
    const lines = children.split('\n');
    
    return (
      <StyledText x={left + width / 2} y={top + height / 2 - 7}>
        {lines.map((line, index) => (
          <tspan key={index} x={left + width / 2} dy={index === 0 ? 0 : '1.2em'}>
            {line}
          </tspan>
        ))}
      </StyledText>
    );
  }

export function PieChartWithCenterLabel({label, data}) {
  return (
    <PieChart 
      series={[{ data:data, innerRadius: 75, outerRadius:100 }]} 
      {...size}
      slotProps={{
        legend:{hidden:true}
      }}
      margin={{right:5}}
      height={218}
      sx={{cursor:'pointer',}}
    >
      <PieCenterLabel>{label}</PieCenterLabel>
    </PieChart>
  );
}

export function GeneralPieChart({data}) {
  return (
      <PieChart
        series={[{
          data: data,
        }]}
        sx={{cursor:'pointer', p:0, m:2}}
        skipAnimation
      />
  )
}

