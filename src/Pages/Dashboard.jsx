// Dashboard.jsx
import { useEffect, useState } from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  const [remainingStockData, setRemainingStockData] = useState([]);
  const [remainingStockLabels, setRemainingStockLabels] = useState([]);
  
  const [salesData, setSalesData] = useState([]);
  const [salesLabels, setSalesLabels] = useState([]);
  
  const [profitData, setProfitData] = useState([]);
  const [profitLabels, setProfitLabels] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const headers = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
        const response = await fetch("http://127.0.0.1:5000/api/dashboard", headers);
        const data = await response.json();

        // Remaining Stock
        setRemainingStockData(data.data);
        setRemainingStockLabels(data.labels);

        // Sales per Product
        setSalesData(data.sales_data);
        setSalesLabels(data.sales_labels);

        // Profit per Product
        setProfitData(data.donut_data);
        setProfitLabels(data.donut_label);
      } catch (error) {
        alert("Cannot access Dashboard without logging in.");
        window.location.href = "/login";
      }
    };

    fetchDashboardData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    alert("Successfully logged out!");
    window.location.href = "/login";
  };

  return (
    <>
      <Navbar logout={logout} />

      <div className="container my-4">
        <div className="row">
          {/* Remaining Stock Bar Chart */}
          <div className="col-md-4 col-sm-12 mb-4">
            <Bar
              data={{
                labels: remainingStockLabels,
                datasets: [
                  {
                    label: "Remaining Stock",
                    data: remainingStockData,
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: true, text: "Remaining Stock per Product" },
                },
              }}
            />
          </div>

          {/* Sales Pie Chart */}
          <div className="col-md-4 col-sm-12 mb-4">
            <Pie
              data={{
                labels: salesLabels,
                datasets: [
                  {
                    label: "Quantity",
                    data: salesData,
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "bottom" },
                  title: { display: true, text: "Sales per Product (Quantity)" },
                },
              }}
            />
          </div>

          {/* Profit Doughnut Chart */}
          <div className="col-md-4 col-sm-12 mb-4">
            <Doughnut
              data={{
                labels: profitLabels,
                datasets: [
                  {
                    label: "Profit per Product",
                    data: profitData,
                    backgroundColor: [
                      "#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850",
                      "#ff9800", "#4caf50", "#f44336", "#00bcd4", "#9c27b0"
                    ],
                    borderColor: "#ffffff",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "right" },
                  title: { display: true, text: "Profit Distribution per Product (KES)" },
                },
              }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
