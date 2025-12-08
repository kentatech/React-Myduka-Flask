import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import logo from "../logo supermarket.png";

function Sales() {
    // Holds all sales fetched from backend
    const [sales, setSales] = useState([]);

    // Holds filtered results for search
    const [filteredSales, setFilteredSales] = useState([]);

    // Loading state
    const [loading, setLoading] = useState(true);

    // Search text value
    const [searchTerm, setSearchTerm] = useState("");

    // Store the sale currently opened in the modal
    const [selectedSale, setSelectedSale] = useState(null);

    // ---------------------------
    // SALE MODAL STATE
    // ---------------------------
    const [showSaleModal, setShowSaleModal] = useState(false);

    // Stock for product dropdown
    const [stock, setStock] = useState([]);

    // Temp new sale item
    const [newSale, setNewSale] = useState({ product_id: "", quantity: 1 });

    // List of queued sale items
    const [saleItems, setSaleItems] = useState([]);

    // -------------------------------
    // Fetch sales from backend
    // -------------------------------
    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/sales")
            .then((res) => res.json())
            .then((data) => {
                setSales(data);
                setFilteredSales(data);
                setLoading(false);
            })
            .catch((err) => console.error("Error fetching sales:", err));
    }, []);

    // -------------------------------
    // Fetch stock for sale modal
    // -------------------------------
    const fetchStock = async () => {
        const res = await fetch("http://127.0.0.1:5000/api/stock");
        const data = await res.json();
        setStock(data);
    };

    // -------------------------------
    // Filter sales whenever search changes
    // -------------------------------
    useEffect(() => {
        const term = searchTerm.toLowerCase();

        const filtered = sales.filter((sale) => {
            const safeId = sale.sale_id?.toString() || "";
            return safeId.includes(term);
        });

        setFilteredSales(filtered);
    }, [searchTerm, sales]);

    // ---------------------------
    // Add item to list
    // ---------------------------
    const addToList = () => {
        if (!newSale.product_id) return alert("Select a product");
        if (newSale.quantity <= 0) return alert("Quantity must be > 0");

        setSaleItems([...saleItems, newSale]);
        setNewSale({ product_id: "", quantity: 1 });
    };

    // ---------------------------
    // Remove item from list
    // ---------------------------
    const removeItem = (index) => {
        setSaleItems(saleItems.filter((_, i) => i !== index));
    };

    // ---------------------------
    // Submit all sale items
    // ---------------------------
    const submitAll = async () => {
        if (saleItems.length === 0) return alert("Add at least one item.");

        try {
            const res = await fetch("http://127.0.0.1:5000/api/sales", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: saleItems }),
            });

            const data = await res.json();
            alert(data.message || "Sale recorded!");

            setSaleItems([]);

            // Refresh sales data
            const refreshed = await fetch("http://127.0.0.1:5000/api/sales");
            const updatedSales = await refreshed.json();
            setSales(updatedSales);
            setFilteredSales(updatedSales);

            setShowSaleModal(false); // close modal
        } catch (err) {
            console.error(err);
            alert("Error submitting sale");
        }
    };

    // -------------------------------
    // DataTable column definitions
    // -------------------------------
    const columns = [
        {
            name: "ID",
            selector: (row) => row.sale_id,
            sortable: true,
            width: "80px",
        },
        {
            name: "Created At",
            selector: (row) => row.created_at,
            sortable: true,
        },
        {
            name: "Sale Details",
            cell: (row) => (
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedSale(row)}
                    data-bs-toggle="modal"
                    data-bs-target="#detailsModal"
                >
                    View Details
                </button>
            ),
            ignoreRowClick: true,
        },
    ];

    return (
        <>
            <Navbar />

            <div className="container d-flex justify-content-between align-items-center mt-4 mb-3">
                <h1 className="m-0">Sales</h1>

                <button
                    className="btn btn-success btn-large"
                    onClick={() => {
                        fetchStock();
                        setShowSaleModal(true);
                    }}
                >
                    <i className="bi bi-plus-circle"></i> Add Sale
                </button>
            </div>

            <div className="container mb-5">
                {/* Search bar */}
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by sale id..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Sales DataTable */}
                <DataTable
                    columns={columns}
                    data={filteredSales}
                    progressPending={loading}
                    pagination
                    striped
                    responsive
                    dense
                    highlightOnHover
                />
            </div>

            {/* ------------------------------------------------------------
                SALE INPUT MODAL (converted from Vue version)
            ------------------------------------------------------------- */}
            {showSaleModal && (
                <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Add Sale</h5>
                                <button className="btn-close" onClick={() => setShowSaleModal(false)}></button>
                            </div>

                            <div className="modal-body">
                                {/* Product Select */}
                                <div className="mb-3">
                                    <label className="form-label">Product</label>
                                    <select
                                        className="form-select"
                                        value={newSale.product_id}
                                        onChange={(e) =>
                                            setNewSale({ ...newSale, product_id: e.target.value })
                                        }
                                    >
                                        <option value="">-- Select Product --</option>
                                        {stock.map((item) => (
                                            <option
                                                key={item.product_id}
                                                value={item.product_id}
                                                disabled={item.available_quantity <= 0}
                                            >
                                                {item.name} (Available: {item.available_quantity})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Quantity */}
                                <div className="mb-3">
                                    <label className="form-label">Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        min="1"
                                        value={newSale.quantity}
                                        onChange={(e) =>
                                            setNewSale({ ...newSale, quantity: Number(e.target.value) })
                                        }
                                    />
                                </div>

                                <button className="btn btn-secondary w-100" onClick={addToList}>
                                    Add to List
                                </button>

                                {/* Sale Items List */}
                                {saleItems.length > 0 && (
                                    <div className="mt-4">
                                        <h6>Sale Items to Submit:</h6>

                                        <table className="table table-sm table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Product ID</th>
                                                    <th>Quantity</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {saleItems.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.product_id}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => removeItem(index)}
                                                            >
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <button className="btn btn-primary w-100 mt-2" onClick={submitAll}>
                                            Submit All
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ------------------------------------------------------------
                SALE DETAILS MODAL (already existed)
            ------------------------------------------------------------- */}
            <div className="modal fade" id="detailsModal" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Sale Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body text-center">
                            {selectedSale ? (
                                <>
                                    <img src={logo} alt="" style={{ width: 150 }} />

                                    <p><strong>Sale ID:</strong> {selectedSale.sale_id}</p>
                                    <p><strong>Created At:</strong> {selectedSale.created_at}</p>

                                    <h5>Items Sold:</h5>

                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Product ID</th>
                                                <th>Product Name</th>
                                                <th>Quantity</th>
                                                <th>Unit Price</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedSale.items?.map((item, i) => (
                                                <tr key={i}>
                                                    <td>{item.product_id}</td>
                                                    <td>{item.product_name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.unit_selling_price}</td>
                                                    <td>{item.subtotal}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <p><strong>Total Sale:</strong>KES: {selectedSale.total_sale}</p>
                                </>
                            ) : (
                                <p>No details available.</p>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Sales;
