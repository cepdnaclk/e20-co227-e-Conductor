import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveLineChart({ graphData }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    graphData ? (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          position: 'relative',
        }}
      >
        <LineChart
          series={[
            { data: [1, 2, 5, 38, 5], label: 'NA-1234' },
            { data: [1, 2, 5, 38, 5], label: 'NA-1354' },
            { data: [1, 2, 5, 38, 5], label: 'NC-5645' },
          ]}
          xAxis={[{ scaleType: 'point', data: [1, 2, 3, 4, 5] }]}
          height={400} // Set a fixed height for the chart
          width="100%" // Ensure the chart takes full width
          slotProps={{
            legend: {
              position: {
                horizontal: 'center', // Center the legend horizontally
                vertical: 'bottom',   // Position the legend below the chart
              },
              sx: {
                marginTop: isSmallScreen ? '16px' : '24px', // Adjust spacing based on screen size
              },
            },
          }}
          sx={{ marginBottom: '40px' }} // Add margin to ensure the legend is spaced properly
        />
      </Box>
    ) : (
      <Skeleton
        sx={{
          width: 'calc(100% - 40px)',
          height: '400px',
          mt: '20px',
          borderRadius: '0 0 12px 12px',
        }}
      />
    )
  );
}
