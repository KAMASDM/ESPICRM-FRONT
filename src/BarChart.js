// BarChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {name: 'Jan', Enquiries: 400},
  {name: 'Feb', Enquiries: 300},
  {name: 'Mar', Enquiries: 200},
  {name: 'Apr', Enquiries: 278},
  {name: 'May', Enquiries: 189},
];

const SimpleBarChart = () => (
  <BarChart width={600} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="Enquiries" fill="#8884d8" />
  </BarChart>
);

export default SimpleBarChart;
