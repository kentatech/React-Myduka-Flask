import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './Pages/Index';
import Dashboard from './Pages/Dashboard';
import Products from './Pages/Products';
import Sales from './Pages/Sales';
import Purchases from './Pages/Purchases';
import Register from './Pages/Register';
import Login from './Pages/Login';


function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
