import { Link } from "react-router-dom";
import logo from "../logo supermarket.png"; // <-- Import images in React

function Navbar() { 
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-success rounded-1 shadow-lg">
                <div className="container-fluid">

                    {/* BRAND */}
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="App Logo" width="50" height="50" />
                        Inventory App
                    </Link>

                    {/* TOGGLER */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* LINKS */}
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <Link className="nav-link active" to="/">
                                    <i className="bi bi-house-door-fill"></i> Home
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">
                                    <i className="bi bi-clipboard-data-fill"></i> Dashboard
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/products">
                                    <i className="bi bi-grid-3x3-gap"></i> Products
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/sales">
                                    <i className="bi bi-basket2-fill"></i> Sales
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/purchases">
                                    <i className="bi bi-bag-plus"></i> Purchases
                                </Link>
                            </li>
                        </ul>
                        
                        {/* Logout Button */}
                        <Link className="d-flex ms-auto btn btn-danger" to="/logout">
                            <i className="bi bi-arrow-return-left"></i> Logout
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
