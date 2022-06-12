import "./style.css";
import Navbar from "../Navbar";
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import { faker } from '@faker-js/faker';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  const labels = ['Sunday', 'Monday', 'Tuesday', 'Wendneay', 'Thursday', 'Friday', 'Saturday'];
  export const data = {
    labels,
    datasets: [
      {
        label: 'Number Of Visitor',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
   
    ],
  };
  

const Admin = () => {
   
    
  return (
    <div className="main_admin">
      <div className="nav-section">
        <Navbar />
      </div>
     
      <div className="admin_sec">
        <div className="admin_left"></div>
        <div className="admin_mid">
        <Line options={options} data={data} />;
        </div>
        <div className="admin_right"></div>
      </div>
    </div>
  );
};
export default Admin;
