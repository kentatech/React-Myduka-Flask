import '../Home.css';
import dashimg from '../dash.png';
import prodimg from '../goods.png';
import salesimg from '../sales.png';
import { Link } from 'react-router-dom';

function IndexHerosection() {
  return (
    <div className="container mt-1">
      <section className="hero d-flex align-items-center justify-content-center text-center text-light">
        <div className="overlay"></div>
        <div className="container position-relative">
          <h1 className="display-4 fw-bold">
            Welcome to Our Free Inventory Goods System
          </h1>
          <p className="lead mt-3">
            Manage your products, sales, and purchases effortlessly — all in one place.
          </p>
          <Link className="btn btn-primary btn-lg mt-4" to="/dashboard">
            Get Started!
          </Link>
        </div>
      </section>

      <section className="hero-section">
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{ marginTop: 5 /* px is not needed */ }}>
          <div className="col">
            <div className="card h-100">
              <img src={dashimg} className="card-img-top" alt="Dashboard" />
              <div className="card-body">
                <h5 className="card-title">Dashboard</h5>
                <p className="card-text">
                  Access a stunning dashboard that contains metrics for your
                  business/shop/inventory. Includes: Profits, Quantity sold and
                  much more analytics.
                </p>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary"></small>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100">
              <img src={prodimg} className="card-img-top" alt="Products" />
              <div className="card-body">
                <h5 className="card-title">Products</h5>
                <p className="card-text">
                  Record goods owned by your business, including buying price
                  and selling price.
                </p>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary"></small>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100">
              <img src={salesimg} className="card-img-top" alt="Sales" />
              <div className="card-body">
                <h5 className="card-title">Sales</h5>
                <p className="card-text">
                  Manage multiple sales business makes with ease. Features include:
                  fetching of past records, print receipt for each Sale and many more.
                </p>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary"></small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default IndexHerosection;
