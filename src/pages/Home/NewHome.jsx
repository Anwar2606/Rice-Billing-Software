import React, { useEffect, useState } from "react";
import "./NewHome.css";
import { 
    FaHome, FaInfoCircle, FaServicestack, FaEnvelope, 
    FaArrowAltCircleRight, FaArrowCircleLeft, FaEye, 
    FaEdit, FaFileInvoice, FaTruck
} from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { Bar } from "react-chartjs-2";
import { 
    Chart as ChartJS, CategoryScale, LinearScale, 
    BarElement, Title, Tooltip, Legend 
} from "chart.js";
import { IoIosPerson } from "react-icons/io";
import { TbListNumbers } from "react-icons/tb";
import Logo from "../assets/PCW.png";
import Card1 from "../assets/card1.png";
import Card2 from "../assets/cardnew22.png";
import Card3 from "../assets/cardnew3.png";
import Card22 from "../assets/card22.png";
import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { db } from "../firebase";
import SalesComparisonChart from "../Chart/SalesComparisonChart";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NewHome = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [totalBills, setTotalBills] = useState(0);
    const [uniqueCustomers, setUniqueCustomers] = useState(0);
    const [todaySales, setTodaySales] = useState(0);
    const [monthSales, setMonthSales] = useState(0);
    const [monthlySales, setMonthlySales] = useState(Array(12).fill(0));

    useEffect(() => {
        const fetchCustomerCount = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "customer"));
                setUniqueCustomers(querySnapshot.size);
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        };
        fetchCustomerCount();
    }, []);

    useEffect(() => {
    const fetchTodaySales = async () => {
      const now = new Date();
      const startOfDay = new Date(now.setHours(0, 0, 0, 0));
      const endOfDay = new Date(now.setHours(23, 59, 59, 999));

      try {
        const q = query(
          collection(db, "invoicebilling"),
          where("date", ">=", Timestamp.fromDate(startOfDay)),
          where("date", "<=", Timestamp.fromDate(endOfDay))
        );

        const snapshot = await getDocs(q);
        let total = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const amount = parseFloat(data.totalAmount ?? 0);
          if (!isNaN(amount)) total += amount;
        });

        setTodaySales(total);
      } catch (error) {
        console.error("Error fetching today's sales:", error);
      }
    };

    fetchTodaySales();
  }, []);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const billsCollection = collection(db, "invoicebilling");
                const billsSnapshot = await getDocs(billsCollection);

                let totalSalesForMonth = 0;
                const monthlySalesTemp = Array(12).fill(0);
                const now = new Date();

                billsSnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (!data.date || !data.totalAmount) return;

                    const billDate = data.date.toDate ? data.date.toDate() : new Date(data.date);
                    const month = billDate.getMonth();
                    const amount = parseFloat(data.totalAmount ?? 0);

                    if (!isNaN(amount)) {
                        monthlySalesTemp[month] += amount;

                        if (
                            billDate.getFullYear() === now.getFullYear() &&
                            billDate.getMonth() === now.getMonth()
                        ) {
                            totalSalesForMonth += amount;
                        }
                    }
                });

                setTotalBills(billsSnapshot.size);
                setMonthSales(totalSalesForMonth);
                setMonthlySales(monthlySalesTemp);
            } catch (error) {
                console.error("Error fetching bills:", error);
            }
        };

        fetchBills();
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    

    return (
        <div className="main-container">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className="content-container">
                <div className="mobile-navbar">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="mobile-nav-btn"
                  >
                    ☰ Menu
                  </button>
                
                
                </div>
                
                {/* 📱 MOBILE MENU (Show when isOpen = true) */}
                {isOpen && (
                  <div className="mobile-menu">
                    <ul>
                      <li><Link to="/newhome">Dashboard</Link></li>
                      <li><Link to="/invoicecopy">All Bill</Link></li>
                      <li><Link to="/billing">Edit  Bill</Link></li>
                      <li><Link to="/customers">Generate Bill</Link></li>
                      <li><Link to="/customers">Add Cutsomer Details</Link></li>
                    </ul>
                  </div>
                )}
                <div className="card-container">
                    <div className="card">
                        <div className="text-container">
                            <h3>Total Bills</h3>
                            <p>{totalBills}</p>
                        </div>
                        <div className="image-container">
                            <img src={Card1} alt="Card 1" />
                        </div>
                    </div>
                    <div className="card">
                        <div className="text-container">
                            <h3>Customers</h3>
                            <p>{uniqueCustomers}</p>
                        </div>
                        <div className="image-container">
                            <img src={Card2} alt="Card 2" />
                        </div>
                    </div>
                    <div className="card">
                        <div className="text-container">
                            <h3>Today Sales</h3>
                            <p>₹{todaySales.toFixed(2)}</p>
                        </div>
                        <div className="image-container">
                            <img src={Card3} alt="Card 3" />
                        </div>
                    </div>
                    <div className="card">
                        <div className="text-container">
                            <h3>This Month</h3>
                            <p>₹{monthSales.toFixed(2)}</p>
                        </div>
                        <div className="image-container">
                            <img src={Card22} alt="Card 4" />
                        </div>
                    </div>
                </div>

                <div className="chart-container">
    <SalesComparisonChart />
</div>

            </div>
        </div>
    );
};

export default NewHome;
