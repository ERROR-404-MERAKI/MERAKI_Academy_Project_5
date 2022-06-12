import "./style.css";
import Navbar from "../Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/reducers/auth";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

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
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};
const labels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wendneay",
  "Thursday",
  "Friday",
  "Saturday",
];
export const data = {
  labels,
  datasets: [
    {
      label: "Number Of Visitor",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const Admin = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return {
  
      user:state.auth.user
    };
  });
  const getAllUser = () => {
    axios
      .get(`http://localhost:5000/register`)
      .then((result) => {
        console.log(result.data.result);
        dispatch(setUser(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllUser()
    
  }, []);
  return (
    <div className="main_admin">
      <div className="nav-section">
        <Navbar />
      </div>

      <div className="admin_sec">
        <div className="admin_left"></div>
        <div className="admin_mid">
          <Line options={options} data={data} />
          <div  className="main_table">
            <div className="table">
            <table id="t1">
            <tr className="tr">
              <th>id</th>
              <th>firstName</th>
              <th>age</th> 
            </tr>
          </table>
            </div>
          
         
          {
            
        user.map((u ,i)=>{
          console.log(u);
          return(
            <div className="table" >
               <table id="t1">
            <tr className="tr">
              <th>{u.idUser}</th>
              <th>{u.firstName}</th>
              <th>{u.age}</th> 
            </tr>
          </table>
            
          
            </div>
          )
        })
      }
            </div>
         
        </div>
        
        <div className="admin_right"></div>
      </div>
    </div>
  );
};
export default Admin;
