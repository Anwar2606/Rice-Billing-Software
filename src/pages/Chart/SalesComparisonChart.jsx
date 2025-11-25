import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const SalesComparisonChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const invoiceRef = collection(db, "wholesalebilling");

      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      const formatDate = (date) => {
        return `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      };

      const todayStr = formatDate(today);
      const yesterdayStr = formatDate(yesterday);

      let todayTotal = 0;
      let yesterdayTotal = 0;

      const snapshot = await getDocs(invoiceRef);

      snapshot.forEach((doc) => {
        const data = doc.data();
        const docDate = formatDate(new Date(data.date)); // Adjust if using Firestore Timestamp

        if (docDate === todayStr) {
          todayTotal += parseFloat(data.totalAmount || 0);
        } else if (docDate === yesterdayStr) {
          yesterdayTotal += parseFloat(data.totalAmount || 0);
        }
      });

      setChartData([
        { day: "Yesterday", totalAmount: yesterdayTotal },
        { day: "Today", totalAmount: todayTotal }
      ]);
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: 300,
        backgroundColor: "#ffffff",
        padding: "30px",
        paddingBottom:"60px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
      }}
    >
      <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Yesterday vs Today Sales
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalAmount" fill="#8884d8" name="Total Amount (₹)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesComparisonChart;
