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
        
        // Processing x-axis data
        const xData = xResponse.data.slice(0, 50).map(entry => ({
          id: parseInt(entry.id),
          x: parseFloat(entry.RandomNumber)
        }));
        
        // Processing y-axis data
        const yData = yResponse.data.slice(0, 50).map(entry => parseFloat(entry.RandomNumber));
        
        // Combine x and y data
        const data = xData.map((entry, index) => ({
          id: entry.id,
          x: entry.x,
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '80%' }}>
        <h1 style={{ textAlign: 'center' }}>Chart of X vs Y</h1>
        <div style={{ height: '400px' }}>
          <LineChart width={800} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="id" 
              type="number"
              tickFormatter={(id) => id === chartData[chartData.length - 1]?.id ? 'x1' : id} 
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="y" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default App;
