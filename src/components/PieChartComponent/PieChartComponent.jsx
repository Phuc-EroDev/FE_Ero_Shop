import React from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { convertDataChart } from '../../utils';

const PieChartComponent = (props) => {
  const data01 = convertDataChart(props?.data, 'paymentMethod');

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data01}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
