import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Products() {
  // Store all products
  const [products, setProducts] = useState([]);

  // Store filtered products for search
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Loading indicator for DataTable
  const [loading, setLoading] = useState(true);

  // Search term for filtering
  const [searchTerm, setSearchTerm] = useState("");

  // Modal for ADD PRODUCT
  const [showAddModal, setShowAddModal] = useState(false);

  // Store new product form data
  const [newProduct, setNewProduct] = useState({
    name: "",
    buying_price: "",
    selling_price: "",
  });

  // Modal for EDIT PRODUCT
  const [showEditModal, setShowEditModal] = useState(false);

  // Store product currently being edited
  const [editProduct, setEditProduct] = useState({
    id: "",
    name: "",
    buying_price: "",
    selling_price: "",
  });

  // -----------------------------------------
  // FETCH PRODUCTS FROM API
  // -----------------------------------------
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        // ------------------------------
        // SORT DATA DESCENDING BY ID
        // ------------------------------
        const sorted = data.sort((a, b) => b.id - a.id); // <-- Changed line

        setProducts(sorted); // Save full product list
        setFilteredProducts(sorted); // Initialize search list
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // -----------------------------------------
  // FILTER PRODUCTS WHEN SEARCH TERM CHANGES
  // -----------------------------------------
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  // -----------------------------------------
  // ADD PRODUCT - SUBMIT TO SERVER
  // -----------------------------------------
  const handleAddProduct = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Failed to add product");

      const savedProduct = await response.json();

      // ------------------------------
      // ADD PRODUCT AND RESORT DESCENDING
      // ------------------------------
      const updatedList = [savedProduct, ...products]; // <-- Changed line
      setProducts(updatedList);
      setFilteredProducts(updatedList);
      setShowAddModal(false);

      setNewProduct({
        name: "",
        buying_price: "",
        selling_price: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------------------
  // OPEN EDIT MODAL & LOAD PRODUCT DATA
  // -----------------------------------------
  const openEditModal = (product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  // -----------------------------------------
  // SUBMIT EDITED PRODUCT
  // -----------------------------------------
  const handleEditProduct = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/products/${editProduct.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editProduct),
        }
      );

      if (!response.ok) throw new Error("Failed to update product");

      const updatedProduct = await response.json();

      const updatedList = products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );

      // ------------------------------
      // SORT UPDATED LIST DESCENDING
      // ------------------------------
      setProducts(updatedList.sort((a, b) => b.id - a.id)); // <-- Changed line
      setFilteredProducts(updatedList.sort((a, b) => b.id - a.id)); // <-- Changed line

      setShowEditModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------------------
  // TABLE COLUMNS
  // -----------------------------------------
  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true, width: "70px" },
    { name: "Product Name", selector: (row) => row.name, sortable: true },
    { name: "Buying Price", selector: (row) => row.buying_price, sortable: true },
    { name: "Selling Price", selector: (row) => row.selling_price, sortable: true },
    {
      name: "Edit",
      cell: (row) => (
        <button className="btn btn-primary btn-sm" onClick={() => openEditModal(row)}>
          <i className="bi bi-pencil-square"></i> Edit
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        {/* PAGE HEADER + ADD BUTTON */}
        <div className="d-flex justify-content-between align-items-center">
          <h1>Products</h1>

          <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
            <i className="bi bi-plus-circle"></i> Add Product
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
       <div className="card">
        {/* DATA TABLE */}
        <DataTable
          columns={columns}
          data={filteredProducts}
          progressPending={loading}
          pagination
          highlightOnHover
          striped
          responsive
          dense
        />
        </div>
      </div>

      {/* ADD PRODUCT MODAL */}
      {showAddModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Product</h5>
                <button className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Buying Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newProduct.buying_price}
                    onChange={(e) => setNewProduct({ ...newProduct, buying_price: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Selling Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newProduct.selling_price}
                    onChange={(e) => setNewProduct({ ...newProduct, selling_price: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleAddProduct}>
                  Save Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {showEditModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editProduct.name}
                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Buying Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editProduct.buying_price}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, buying_price: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Selling Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editProduct.selling_price}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, selling_price: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleEditProduct}>
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Products;
