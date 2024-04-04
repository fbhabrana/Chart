import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const App = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const xResponse = await axios.get('https://retoolapi.dev/o5zMs5/data');
        const yResponse = await axios.get('https://retoolapi.dev/gDa8uC/data');
        const xData = xResponse.data.slice(0, 50).map(entry => parseFloat(entry.RandomNumber));
        const yData = yResponse.data.slice(0, 50).map(entry => parseFloat(entry.RandomNumber));

        const data = xData.map((value, index) => ({
          x: value,
          y: yData[index]
        }));

        setChartData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Chart of X vs Y</h1>
      <div style={{height: '400px', width: '600px'}}>
        <LineChart width={600} height={400} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default App;
