import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]); // <-- For search results
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // <-- Search input
  const [newPurchase, setNewPurchase] = useState({ product_id: "", quantity: 1 });

  // Fetch purchases
  const fetchPurchases = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:5000/api/purchases", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      // SORT IN DESCENDING ORDER BY ID
      const sorted = [...data].sort((a, b) => b.id - a.id);

      setPurchases(sorted);
      setFilteredPurchases(sorted); // <-- Initially table shows sorted list
      setLoading(false);
    } catch (err) {
      console.error("Error fetching purchases:", err);
      alert("You must be logged in to access purchases.");
      window.location.href = "/login";
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data.products || data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchPurchases();
    fetchProducts();
  }, []);

  // SEARCH FILTER — runs whenever searchTerm or purchases list changes
  useEffect(() => {
    const term = searchTerm.toLowerCase();

    const filtered = purchases.filter((p) => {
      return (
        p.id.toString().includes(term) ||
        p.product_id.toString().includes(term)
      );
    });

    setFilteredPurchases(filtered);
  }, [searchTerm, purchases]);

  // Handle adding new purchase
  const handleAddPurchase = async (e) => {
    e.preventDefault();

    if (!newPurchase.quantity || newPurchase.quantity <= 0) {
      alert("Quantity must be a positive number.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await fetch("http://127.0.0.1:5000/api/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: parseInt(newPurchase.product_id),
          quantity: parseInt(newPurchase.quantity),
        }),
      });

      setNewPurchase({ product_id: "", quantity: 1 });
      fetchPurchases(); // reload table
    } catch (err) {
      console.error("Error adding purchase:", err);
    }
  };

  // Table columns
  const columns = [
    { name: "Purchase ID", selector: (row) => row.id, sortable: true, width: "120px" },
    { name: "Product ID", selector: (row) => row.product_id, sortable: true },
    { name: "Quantity", selector: (row) => row.quantity, sortable: true },
    { name: "Created At", selector: (row) => row.created_at, sortable: true },
  ];

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        {/* Header Row */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="m-0">Purchases</h1>

          <button
            type="button"
            className="btn btn-success btn-large"
            data-bs-toggle="modal"
            data-bs-target="#purchaseModal"
          >
            <i className="bi bi-plus-circle"></i> Add Purchase
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Purchase ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Add Purchase Modal */}
        <div className="modal fade" id="purchaseModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Add Purchase</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleAddPurchase}>
                  <div className="mb-3">
                    <label htmlFor="product" className="form-label">Product</label>
                    <select
                      id="product"
                      className="form-select"
                      value={newPurchase.product_id}
                      onChange={(e) =>
                        setNewPurchase({ ...newPurchase, product_id: e.target.value })
                      }
                      required
                    >
                      <option value="">-- Select Product --</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input
                      type="number"
                      id="quantity"
                      className="form-control"
                      min={1}
                      value={newPurchase.quantity}
                      onChange={(e) =>
                        setNewPurchase({ ...newPurchase, quantity: e.target.value })
                      }
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>

            </div>
          </div>
        </div>
        <div className="card">
        {/* Purchases Table */}
        <DataTable
          columns={columns}
          data={filteredPurchases}   // <-- SHOW FILTERED RESULTS
          progressPending={loading}
          pagination
          responsive
          striped
          highlightOnHover
          dense
          defaultSortFieldId="id"
          defaultSortAsc={false}    // <-- DESCENDING ORDER
        />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Purchases;
